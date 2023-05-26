import { useCallback, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { CollectionPath } from "@/libs/dtl/types";

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
  toType: CollectionPath
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
  toType: CollectionPath,
  type_: ReactionType
}

export function useReactions(to?: string, toType: CollectionPath = CollectionPath.POSTS) {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);

  const [iLikeIt, setILikeIt] = useState(false)

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
    setLoading(true)
    const ref = doc(db, "reactions", `${user?.uid}_${to}`)
    getDoc(ref).then((doc) => {
      setILikeIt(doc.exists())
      setLoading(false)
    })
    return onSnapshot(ref, (snapshot) => {
      setILikeIt(snapshot.exists())
    });
  }, [to, user?.uid]);

  const remove = useCallback(async (to: string) => {
    if (!to || !user?.uid) return
    try {
      await deleteDoc(doc(db, "reactions", `${user?.uid}_${to}`))
    } catch (error) {
      console.log(error)
    } finally {

    }
  }, [user?.uid])

  const toggle = useCallback(async ()=> {
    if (!to) return
    if (iLikeIt){
      await remove(to);
    }else{
      await create({
        to,
        toType,
        type_: "LIKE",
      });
    }
  }, [iLikeIt, to, toType])


  return { create, remove, toggle, loading, iLikeIt }
}
