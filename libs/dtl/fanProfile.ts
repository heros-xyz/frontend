import { useCallback, useEffect, useMemo, useState } from "react";
import { doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { FanProfile } from "@/libs/dtl/types";

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: any) => {
    const data = snap.data() as FanProfile;
    const date = data.dateOfBirth as unknown as Timestamp
    data.dateOfBirth = date?.toDate?.() 
    return data;
  }
}

export const useFanProfile = (uid?: string) => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FanProfile>();
  const docRef = useMemo(() => (!user?.uid && !uid) ? null : doc(db, `fanProfile/${uid || user?.uid}`).withConverter(converter), [uid, user])

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
  }, [docRef, uid, user]);

  const update = useCallback(async (data: FanProfile) => {
    if (!docRef) return
    await updateDoc(docRef, data)
  }, [docRef])

  return { loading, data, update }
}
