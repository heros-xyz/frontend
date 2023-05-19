import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, onSnapshot, query, QueryDocumentSnapshot, setDoc, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
export type ReactionType = "LIKE"
export type ToType = "POST" | "COMMENT"

/**
 * /
 * createdAt: Timestamp
deletedAt: Timestamp
type: String
toType: Post|Comment
to: oid
uid: uid
 *
 *
 */

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

interface AddReactionParams {
  to: string,
  toType: ToType,
  type_: ReactionType
}

export function useReactions(to?: string, params: { initialize: boolean } = {initialize: true}) {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(params.initialize);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Reaction[]>([]);

  const create = useCallback(async ({ to, toType, type_ }: AddReactionParams) => {
    if (!toType || !to || !type_ || !user?.uid) return
    try {
      const params: Reaction = {
        to,
        toType,
        type_,
        uid: user?.uid
      }
      await setDoc(doc(db, "reactions", `${user?.uid}_${to}`), params)
    } catch (error) {
      console.log(error)
    } finally {

    }
  }, [to, user?.uid])

  useEffect(() => {
    if (!to || !params.initialize) return
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
  }, [to, params.initialize]);

  return { create, loading, count, data }
}
