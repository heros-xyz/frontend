import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
import { PublicProfile } from "@/libs/dtl/publicProfile";
export interface Comment {
  id?: string
  createdAt: Date
  deletedAt: Date
  content: String
  post: string
  uid: string
  parent?: string
  //calcular
  isLiked?: boolean
  likeCount?: number
  commentsCount?: number
  isAuthorComment?: boolean
  author: PublicProfile
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Comment
    data.id = snap.id;
    return data
  }
}

export const useComment = (to: string) => {
  const { user } = useAuthContext()
  const create = useCallback(async (comment: Partial<Comment>) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de withdrawal
  }, [user?.uid, to])
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Comment[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return
    const q = query(collection(db, "comments"), where("content", "==", to)).withConverter(converter)
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
