import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getDoc, onSnapshot, query, QueryDocumentSnapshot, where, addDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useAuthContext } from "@/context/AuthContext";
import { db, storage } from "@/libs/firebase";
import { MutationState } from "./careerJourney";

export interface PostMedia {
  type: string
  url: string
}
export interface Post {
  id?: string
  content: string
  publicDate: Date
  schedule?: boolean
  publicType: string
  tags: string[]
  media: PostMedia[]
  reactionCount?: number
  commentCount?: number
  liked?: boolean
  uid?: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
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
  type: "video" | "image";
  file: File;
}

export const usePostsAsMaker = (loadData = true) => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Post[]>([]);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const { } = useState<MutationState>()

  const create = useCallback(async (params: PostParams) => {
    if (!user || !user.uid) return
    try {
      // subir images y videos
      const { listMedia, ...rest } = params
      const collectionRef = collection(db, "post");

      const post: Partial<Post> = {
        ...rest,
        uid: user?.uid
      }
      const newPost = await addDoc(collectionRef, post)

      const media = await Promise.all(listMedia.map(async (media) => {
        // media/{uid}/{post-id}
        const storageRef = ref(storage, `media/${user.uid}/${newPost.id}/${media.file.name}`)
        const result: PostMedia = {
          type: media.type,
          url: ""
        };

        const uploadTask = await uploadFile(storageRef, media.file)
        if (uploadTask) {
          result.url = await getDownloadURL(uploadTask?.ref)
        }

        return result
      }))

      await updateDoc(doc(db, "post", newPost.id), {
        media
      })
    } catch (error) {
      console.log(error)
    } finally {

    }
  }, [user?.uid])

  useEffect(() => {
    if (!user || !user.uid || !loadData) return
    const q = query(collection(db, "post"), where("uid", "==", user?.uid)).withConverter(converter)
    getDocs(q)
      .then((snapshot) => {
        serData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      serData(snapshot.docs.map(d => d.data()))
    });
  }, [user?.uid, loadData]);

  return { create, loading, data }
}

export const usePostAsMaker = (postId?: string) => {
  const [loading, setLoading] = useState(true);
  const dataRef = useMemo(() =>{
    if (postId) {
      return doc(db, `post/${postId}`).withConverter(converter)
    }
  }, [postId])
  const [data, setData] = useState<Post|undefined>();

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

export const usePostsAsTaker = (params: {maker?: string, tag?: string}) => {
  const [loading, setLoading] = useState(true);
  const dataRef = useMemo(() =>{
    if (params.maker){
      return query(
        collection(db, `suscriptions`),
        where("maker", "==", params.maker)
      ).withConverter(converter)
    }
    if (params.tag){
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
  const dataRef = useMemo(() =>{
    if (post){
      return doc(db, `post/${post}`).withConverter(converter)
    }
  }, [post])
  const [data, setData] = useState<Post|undefined>();

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
