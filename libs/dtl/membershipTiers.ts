import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";

export interface MembershipTier {
  id?: string
  name: string
  type: "GOLD"|"BRONCE" //Gold, Bronce...
  tierDescription: string
  monthlyPrice: number
  stripePrice: string
  stripeProduct: string
  benefits: string[]
  totalFan?: number
  uid: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as MembershipTier
    data.id = snap.id;
    return data
  }
}
export function useMembershipTiersAsMaker() {
  const {user} = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MembershipTier[]|undefined>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null)
    if (!user || !user.uid) return
    const q = query(collection(db, "membershipTiers"), where("uid", "==", user.uid)).withConverter(converter)
    onSnapshot(q, (snapshot) =>{
      setData(
          snapshot.docs.map(d => d.data())
        )
    })
    getDocs(q).then((doc) =>
      setData(doc.docs.map(d => d.data()))
    ).catch((error) =>
      setError(error)
    ).finally(() =>
      setLoading(false)
    )
  }, [user?.uid]);

  const update = useCallback(async (membershipTier: Partial<MembershipTier>) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de update
    console.log('update', membershipTier)
  },[user?.uid])

  const create = useCallback(async (membershipTier: Partial<MembershipTier>) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de create
    console.log('create', membershipTier)
  },[user?.uid])

  return {
    loading,
    error,
    data,
    update,
    create
  }
}

export function useMembershipTiersAsTaker(uid: string) {
  const {user} = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MembershipTier[]|undefined>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null)
    if (!user || !user.uid) return
    const q = query(collection(db, "membershipTiers"), where("uid", "==", uid)).withConverter(converter)
    onSnapshot(q, (snapshot) =>{
      setData(
        snapshot.docs.map(d => d.data())
      )
    })
    getDocs(q).then((doc) =>
      setData(doc.docs.map(d => d.data()))
    ).catch((error) =>
      setError(error)
    ).finally(() =>
      setLoading(false)
    )
  }, [user?.uid]);

  return {
    loading,
    error,
    data
  }
}
