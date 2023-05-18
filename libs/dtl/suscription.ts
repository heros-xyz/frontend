import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getCountFromServer, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { MembershipTier } from "@/libs/dtl/membershipTiers";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
import { AthleteProfile } from "@/libs/dtl/athleteProfile";
import { PublicProfile } from "@/libs/dtl/publicProfile";

const SUBSCRIPTION_COLLECTION_NAME = "subscriptions"

export interface Suscription {
  id?: string
  startDate: Date
  expiredDate: Date
  status: SubscriptionStatus
  currentJobId: string
  stripeSubscription: string
  paymentInformation: string
  autoRenew: boolean
  lastVisitedInteraction: Date
  taker: PublicProfile
  maker: AthleteProfile
  membershipTier: MembershipTier
}

export enum SubscriptionStatus {
  DRAFT = 0,
  ACTIVE = 1,
  EXPIRED = 2,
  CANCEL = 3,
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
      query(collection(db, SUBSCRIPTION_COLLECTION_NAME), where("maker", "==", user.uid)).withConverter(converter)
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
      query(collection(db, SUBSCRIPTION_COLLECTION_NAME), where("taker", "==", user.uid)).withConverter(converter)
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

export function useGetTotalSubscriptionsFromAthlete(athleteId: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!athleteId) return
    const q = query(collection(db, SUBSCRIPTION_COLLECTION_NAME),
      where("maker", "==", athleteId),
      where("status", "==", SubscriptionStatus.ACTIVE)
    );

    getCountFromServer(q)
      .then((snapshot) => setCount(snapshot?.data().count))
      .catch(console.error);

  }, [athleteId]);

  return count
}

export function useValidateIsFan(athleteId: string) {
  const { user: taker } = useAuthContext()
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!athleteId || taker?.uid) return
    const q = query(collection(db, SUBSCRIPTION_COLLECTION_NAME),
      where("maker", "==", athleteId),
      where("taker", "==", taker?.uid),
      where("status", "==", SubscriptionStatus.ACTIVE)
    );

    getCountFromServer(q)
      .then((snapshot) => setCount(snapshot?.data().count))
      .catch(console.error);

  }, [athleteId, taker?.uid]);


  return Boolean(count);
}