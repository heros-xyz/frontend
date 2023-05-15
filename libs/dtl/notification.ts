import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs
} from "firebase/firestore";
import { useState, useEffect, useMemo, useCallback } from "react";
import { PublicProfile } from "@/libs/dtl/publicProfile";
import { useAuthContext } from "@/context/AuthContext";

import { db } from "../firebase";

export interface Notification {
  createdAt: Date
  deletedAt: Date
  readAt: Date
  type: "comment" | "like" | "suscription" | "post"
  message: string
  params: { }
  uid: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: any) => {
    const data = snap.data() as Notification;
    return data;
  }
}

export function useNotifications(uid?: string) {
  const {user} = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Notification[]>([]);
  const dataRef = useMemo(() =>
      user?.uid ?
        query(collection(db, `notifications`), where("uid", "==", user.uid)).withConverter(converter)
        : undefined
    , [user?.uid])

  useEffect(() => {
    if (!dataRef) return
    getDocs(dataRef)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    });
  }, [dataRef]);

  const update = useCallback(async (data: PublicProfile) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.update', data)
  }, [dataRef])

  return { loading, data, update }
}
