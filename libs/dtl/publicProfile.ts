import { useState, useEffect, useMemo, useCallback } from "react";
import { getDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";

export interface PublicProfile {
  avatar?: string
  nickName?: string
  uid?: string
  sports?: string[]
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: any) => {
    const data = snap.data() as PublicProfile;
    return data;
  }
}

export const usePublicProfile = (uid?: string) => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicProfile>();
  const docRef = useMemo(() => doc(db, `fanProfile/${uid || user?.uid}`).withConverter(converter), [uid,user?.uid])

  useEffect(() => {
    if (!docRef) return
    getDoc(docRef)
      .then((snapshot) => {
        setData(snapshot.data())
    })
    .finally(() => setLoading(false))
    return onSnapshot(docRef, (snapshot) => {
       setData(snapshot.data())
    });
  }, [docRef]);

  const update = useCallback(async (data: PublicProfile) => {
    if (!docRef) return
    await updateDoc(docRef,data)
  }, [docRef])

  return { loading, data, update }
}
