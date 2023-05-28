import { useCallback, useEffect, useState } from "react";
import * as zustand from 'zustand'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Unsubscribe,
  where
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useAuthContext } from "@/context/AuthContext";
import { db, functions } from "@/libs/firebase";
import { Comment } from "@/libs/dtl/types";
import { collectionPath } from "./constant";

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Comment
    data.id = snap.id;
    return data
  }
}

interface CommentReplyState {
  comment: Comment | null
  set: (comment: Comment) => void
  clear: () => void
}
export const useCommentReply = zustand.create<CommentReplyState>()((set) => ({
  comment: null,
  set: (comment: Comment) => set((state) => ({ comment })),
  clear: () => set({ comment: null }),
}))


export const useComments = (to?: string) => {
  const { user } = useAuthContext()
  const create = useCallback(async (comment: Partial<Comment>) => {
    if (!user || !user.uid) return
    const addSubscription = httpsCallable(
      functions,
      "comments-create"
    )
    await addSubscription(comment)
  }, [user?.uid, to])
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Comment[]>([]);

  useEffect(() => {
    if (!user || !user.uid || !to) return
    const q = query(collection(db, "comments"), where("post", "==", to), orderBy("createdAt", "asc")).withConverter(converter)
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
