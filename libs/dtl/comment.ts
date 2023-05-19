import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, QueryDocumentSnapshot, where, getDoc, doc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
import { FanProfile } from "@/libs/dtl/fanProfile";
export interface Comment {
  id?: string
  createdAt: Date | string
  deletedAt: Date
  content: string
  post: string
  uid: string
  parent?: string
  //calcular
  isLiked?: boolean
  likeCount?: number
  commentsCount?: number
  isAuthorComment?: boolean
  author: FanProfile
  name: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Comment
    data.id = snap.id;
    return data
  }
}

export const useComments = (to?: string) => {
  const { user } = useAuthContext()
  const create = useCallback(async (comment: Partial<Comment>) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de withdrawal
  }, [user?.uid, to])
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Comment[]>([]);

  useEffect(() => {
    if (!user || !user.uid || !to) return
    const q = query(collection(db, "comments"), where("content", "==", to)).withConverter(converter)
    getDocs(q)
      .then((snapshot) => {
        serData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      serData(snapshot.docs.map(d => d.data()))
    });
  }, [user?.uid, to]);

  return { create, loading, data }
}

export const useComment = (id?: string) => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Comment|undefined>();

  useEffect(() => {
    if (!user || !user.uid) return
    const q = doc(db,`comments/${id}`).withConverter(converter)
    getDoc(q)
      .then((snapshot) => {
        setData(snapshot.data())
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      setData(snapshot.data())
    });
  }, [user?.uid]);

  if (!id)
    return {
      loading: false,
      data: null
    }

  return { loading, data }
}
