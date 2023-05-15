import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { MembershipTier } from "@/libs/dtl/membershipTiers";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
import { PublicProfile } from "@/libs/dtl/publicProfile";
import { AthleteProfile } from "@/libs/dtl/athleteProfile";

export interface Suscription {
  id?: string
  startDate: Date
  expiredDate: Date
  status: string
  currentJobId: string
  stripeSubscription: string
  paymentInformation: string
  autoRenew: boolean
  lastVisitedInteraction: Date
  taker: PublicProfile
  maker: AthleteProfile
  membershipTier: MembershipTier
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: any) => {
    const data = snap.data() as Suscription;
    return data;
  }
}

export const useSuscriptionAsMaker = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const create = useCallback(async (subscription: Suscription) => {
    if (!user || !user.uid) return
    console.log('useSuscriptionAsMaker.create', subscription)
    setLoading(false)
  }, [user]);
  const update = useCallback(async (suscription: Suscription) => {
    if (!user || !user.uid) return
    console.log('useSuscriptionAsMaker.update', suscription)
    setLoading(false)
  }, [user]);

  const [data, setData] = useState<Suscription[]>([]);
  const dataRef = useMemo(() =>
      user?.uid ?
        query(collection(db, `suscriptions`), where("maker", "==", user.uid)).withConverter(converter)
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

  return { data, create, loading, update };
};

export const useSuscriptionAsTaker = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Suscription[]>();
  const dataRef = useMemo(() =>
    user?.uid ?
      query(collection(db, `suscriptions`), where("taker", "==", user.uid)).withConverter(converter)
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

  const update = useCallback(async (data: Suscription) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.update', data)
  }, [dataRef])

  const create = useCallback(async (data: Partial<Suscription>) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.create', data)
  }, [dataRef])

  const remove = useCallback(async (suscription: string) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.delete', suscription)
  }, [dataRef])

  return { loading, data, update, create, remove }
}
