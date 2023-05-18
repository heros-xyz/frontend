import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getDoc, onSnapshot, query, QueryDocumentSnapshot, where, addDoc, updateDoc, getCountFromServer } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { current } from "@reduxjs/toolkit";
import { useAuthContext } from "@/context/AuthContext";
import { db, storage } from "@/libs/firebase";
import { IMediaExisted } from "@/types/athlete/types";
import { MutationState } from "./careerJourney";

export interface PostMedia {
  type: string
  url: string
  extension?: string
  sortOrder?: number
}
export interface Post {
  id?: string
  content: string
  publicDate: Date | string
  schedule?: boolean
  publicType: string
  tags: string[]
  media: PostMedia[]
  reactionCount?: number
  commentCount?: number
  totalCommentCount: number
  totalReactionsCount: number
  liked?: boolean
  uid?: string
  createdAt: Date
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Post
    data.id = snap.id;
    return data
  }
}

export interface PostParams {
  content: string;
  tags: string[];
  listMedia: ListMedia[];
  schedule: boolean;
  publicDate: Date;
}

export interface ListMedia {
  type: string 
  file: File;
}

interface UploadBulkMedia {
  listMedia: ListMedia[],
  postId: string,
  userId: string,
  uploadFile: (...args: any[]) => any
}

async function uploadBulkMedia({
  listMedia, postId, userId, uploadFile
}: UploadBulkMedia) {
  return await Promise.all(listMedia.map(async (media, index) => {
    // media/{uid}/{post-id}
    const storageRef = ref(storage, `media/${userId}/${postId}/${media.file.name}`)
    const result: PostMedia = {
      type: media.type,
      sortOrder: index ?? 0,
      extension: media.file.name.split(".").pop() || "",
      url: ""
    };
    const uploadTask = await uploadFile(storageRef, media.file)
    if (uploadTask) {
      result.url = await getDownloadURL(uploadTask?.ref)
    }

    return result
  }))
}

export const usePostsAsMaker = (loadData = true) => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Post[]>([]);
  const [uploadFile] = useUploadFile();
  const [mutationStates, setMutationStates] = useState<MutationState>({
    error: null,
    success: false,
    loading: false
  })

  const create = useCallback(async (params: PostParams) => {
    if (!user || !user.uid) return
    try {
      setMutationStates(current => ({ ...current, loading: true }))
      const { listMedia, ...rest } = params
      const collectionRef = collection(db, "post");
      const post: Partial<Post> = {
        ...rest,
        uid: user?.uid
      }
      const newPost = await addDoc(collectionRef, post)

      const media = await uploadBulkMedia({
        listMedia,
        postId: newPost.id,
        uploadFile,
        userId: user?.uid
      })

      await updateDoc(doc(db, "post", newPost.id), {
        media
      })
      setMutationStates(current => ({ ...current, success: true }))
    } catch (error) {
      console.log(error)
      setMutationStates(current => ({ ...current, error: { data: error } }))
    } finally {
      setMutationStates(current => ({ ...current, loading: false }))
    }
  }, [user?.uid])

  useEffect(() => {
    if (!user || !user.uid || !loadData) return
    const q = query(collection(db, "post"), where("uid", "==", user?.uid)).withConverter(converter)
    getDocs(q)
      .then(async (snapshot) => {
        // contar likes y reactions para cada post
        const posts = snapshot.docs.map(d => d.data())

        for (const post of posts) {
          const queryComments = query(collection(db, "comments"), where("post", "==", post.id)).withConverter(converter)
          const queryReactions = query(collection(db, "reactions"), where("to", "==", post.id)).withConverter(converter)

          const totalCommentsCount = (await getCountFromServer(queryComments)).data().count
          const totalReactionsCount = (await getCountFromServer(queryReactions)).data().count

          post.reactionCount = totalReactionsCount
          post.commentCount = totalCommentsCount
        }

        serData(posts)
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      serData(snapshot.docs.map(d => d.data()))
    });
  }, [user?.uid, loadData]);

  return {
    create: {
      ...mutationStates,
      create,
    }, loading, data
  }
}

export const usePostAsMaker = (postId?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Post | undefined>();
  const dataRef = useMemo(() => {
    if (postId) {
      return doc(db, `post/${postId}`).withConverter(converter)
    }
  }, [postId])

  useEffect(() => {
    if (!dataRef) return
    getDoc(dataRef)
      .then((snapshot) => {
        setData(snapshot.data())
      })
      .finally(() => setLoading(false))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.data())
    });
  }, [dataRef]);

  return { loading, data }
}

export const useEditPost = () => {
  const { user } = useAuthContext()
  const [uploadFile] = useUploadFile();
  const [mutationStates, setMutationStates] = useState<MutationState>({
    success: false,
    loading: false,
    error: null
  })

  const edit = useCallback(async (postId: string, params: Partial<Post & { newMedia: ListMedia[], listMediaExisted: IMediaExisted[] }>) => {
    if (!user?.uid) return
    try {
      const { newMedia, listMediaExisted, ...rest } = params
      setMutationStates(current => ({ ...current, loading: true }))
      let mediaUploaded: PostMedia[] = []

      if (!!newMedia?.length) {
        mediaUploaded = await uploadBulkMedia({
          listMedia: newMedia,
          postId: postId,
          uploadFile,
          userId: user?.uid
        })
      }

      const media = [...listMediaExisted?.map?.(items => ({
        url: items.file,
        type: items.type,
        extension: items.extension
      })) ?? [],
      ...mediaUploaded]?.map((item, index) => ({ ...item, sortOrder: index }))

      await updateDoc(doc(db, "post", postId), { ...rest, media, uid: user?.uid })
      setMutationStates(current => ({ ...current, success: true }))
    } catch (error) {
      console.info('ERROR useEditPost#edit', error)
      setMutationStates(current => ({ ...current, error: { data: error } }))
    } finally {
      setMutationStates(current => ({ ...current, loading: false }))
    }
  }, [user?.uid])

  return {
    ...mutationStates,
    edit
  }
}


export const usePostsAsTaker = (params: { maker?: string, tag?: string }) => {
  const [loading, setLoading] = useState(true);
  const dataRef = useMemo(() => {
    if (params.maker) {
      return query(
        collection(db, `suscriptions`),
        where("maker", "==", params.maker)
      ).withConverter(converter)
    }
    if (params.tag) {
      return query(
        collection(db, `suscriptions`),
        where("tags", "array-contains", params.tag)
      ).withConverter(converter)
    }
  }, [params])
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    if (!dataRef) return
    getDocs(dataRef)
      .then((snapshot) => {
        setData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.docs.map(d => d.data()))
    });
  }, [dataRef]);

  return { loading, data }
}

export const usePostAsTaker = (post?: string) => {
  const [loading, setLoading] = useState(true);
  const dataRef = useMemo(() => {
    if (post) {
      return doc(db, `post/${post}`).withConverter(converter)
    }
  }, [post])
  const [data, setData] = useState<Post | undefined>();

  useEffect(() => {
    if (!dataRef) return
    getDoc(dataRef)
      .then((snapshot) => {
        if (!snapshot.exists()) return
        setData(snapshot.data())
      })
      .finally(() => setLoading(false))
    return onSnapshot(dataRef, (snapshot) => {
      if (!snapshot.exists()) return
      setData(snapshot.data())
    });
  }, [dataRef]);

  return { loading, data }
}
