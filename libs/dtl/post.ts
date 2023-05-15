import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getDoc, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";

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

export const usePostsAsMaker = () => {
  const { user } = useAuthContext()
  const create = useCallback(async (post: Post) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de withdrawal
  }, [user?.uid])
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Post[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return
    const q = query(collection(db, "post"), where("uid", "==", user?.uid)).withConverter(converter)
    getDocs(q)
      .then((snapshot) => {
        serData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      serData(snapshot.docs.map(d => d.data()))
    });
  }, [user?.uid]);

  return { create, loading, data }
}

export const usePostAsMaker = (post?: string) => {
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
