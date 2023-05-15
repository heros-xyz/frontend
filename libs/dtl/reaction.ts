import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
export type ReactionType = "LIKE"
export type ToType = "POST"|"COMMENT"
export interface Reaction {
  id?: string
  type_: ReactionType
  toType: ToType
  to: string
  uid: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Reaction
    data.id = snap.id;
    return data
  }
}

export function useReactions(to?: string) {
  const create = useCallback(async (to: string, toType: ToType, type_: ReactionType) => {
    if (!toType || !to || !type_) return
    //Llama a la fucnion de withdrawal
  }, [to])
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Reaction[]>([]);

  useEffect(() => {
    if (!to) return
    const q = query(collection(db, "reactions"), where("to", "==", to)).withConverter(converter)
    getDocs(q)
      .then((snapshot) => {
        setCount(snapshot.size)
        setData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      setCount(snapshot.size)
      setData(snapshot.docs.map(d => d.data()))
    });
  }, [to]);

  return { create, loading, count, data }
}
