import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { MutationState, Suscription } from "@/libs/dtl/common";

const MembershipTierCollectionName = "membershipTiers"

export type MembershipTierType = "GOLD" | "BRONZE"

export interface MembershipTier {
  id?: string
  name: string
  type: MembershipTierType
  tierDescription: string
  monthlyPrice: number
  stripePrice: string
  stripeProduct: string
  benefits: {
    label: string
    key: string
  }[]
  totalFan?: number
  uid: string
}

export interface MembershipTierParams {
  name: string
  type: MembershipTierType
  tierDescription: string
  monthlyPrice: number
  benefits: {
    label: string
    key: string
  }[]
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
  const [mutationStates, setMutationStates] = useState<MutationState>({
    loading: false,
    success: false,
    error: null
  })

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

  const updateMembership = useCallback(async (id: string, membershipTierParams: Partial<MembershipTier>) => {
    if (!user || !user.uid) return
    try {
      setMutationStates(c => ({ ...c, loading: true }))
      const docRef = doc(db, MembershipTierCollectionName, id);
      await updateDoc(docRef, membershipTierParams);
      setMutationStates(c => ({ ...c, success: true }))
    } catch (error) {
      setMutationStates(c => ({ ...c, error: { data: error } }))
      console.info(`ERROR [@/hooks/membershipTiers.ts#update]`, error)
    } finally {
      setMutationStates(c => ({ ...c, loading: false }))
    }
  },[user?.uid])

  const addMembership = useCallback(async (membershipTierParams: Partial<MembershipTier>) => {
    if (!user || !user.uid) return
    // Path => membershipTiers/{_id}
    try {
      setMutationStates(c => ({ ...c, loading: true }))
      const collectionRef = collection(db, MembershipTierCollectionName);
      await addDoc(collectionRef, { ...membershipTierParams, uid: user?.uid });
      setMutationStates(c => ({ ...c, success: true }))
    } catch (error) {
      setMutationStates(c => ({ ...c, error: { data: error } }))
      console.info(`ERROR [@/hooks/membershipTiers.ts#create]`, error)
    } finally {
      setMutationStates(c => ({ ...c, loading: false }))
    }
  },[user?.uid])

  return {
    loading,
    error,
    data,
    update: {
      ...mutationStates,
      updateMembership,
    },
    create: {
      ...mutationStates,
      addMembership,
    }
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
    const q = query(collection(db, MembershipTierCollectionName), where("uid", "==", uid)).withConverter(converter)
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

export function useMembershipsFromAthlete(athleteId: string) {
  const [data, setData] = useState<MembershipTier[] | null>(null);
  const [status, setStatus] = useState<Suscription>({
    initiated: false,
    loading: false
  })
  useEffect(() => {
    if (!athleteId) return
    setStatus({
      initiated: true,
      loading: true
    })
    const q = query(collection(db, MembershipTierCollectionName), where("uid", "==", athleteId)).withConverter(converter);
    getDocs(q).then(
      (docs) => setData(docs.docs.map(d => d.data()))
    ).catch((e: Error) => setStatus({
      ...status,
      error: e.message
    }))
      .finally(() => setStatus({
        ...status,
        loading: false,
        lastUpdate: new Date()
      }))
    return onSnapshot(q, (docs) => {
      setData(docs.docs.map(d => d.data()))
    })
  }, [athleteId])

  console.log("data", data)
  return {
    data,
    status
  }
}

