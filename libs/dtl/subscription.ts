import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getCountFromServer, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { MembershipTier } from "@/libs/dtl/membershipTiers";
import { useAuthContext } from "@/context/AuthContext";
import { db, functions } from "@/libs/firebase";
import { MutationState } from "./careerJourney";

const SUBSCRIPTION_COLLECTION_NAME = "subscriptions"

export interface Subscription {
  id?: string
  startDate: Date
  status: SubscriptionStatus
  currentJobId: string
  stripeSubscription: any
  paymentInformation: string
  autoRenew: boolean
  lastVisitedInteraction: Date
  taker: string
  maker: string
  membershipTier: MembershipTier
  monthlyPrice: number
  expiredDate: number // timestamp
  makerData: { // ATHLETE
    avatar: string
    nickName: string,
    email: string
    name: string
    fullName: string,
  }
  takerData: { // FAN
    avatar: string
    email: string
    nickName: string,
    name: string
    fullName: string,
  }
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
    const data = {
      id: snap.id,
      ...snap.data()
    } as Subscription;
    return data;
  }
}

export const useSuscriptionAsMaker = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const create = useCallback(async (subscription: Subscription) => {
    if (!user || !user.uid) return
    console.log('useSuscriptionAsMaker.create', subscription)
    setLoading(false)
  }, [user]);
  const update = useCallback(async (suscription: Subscription) => {
    if (!user || !user.uid) return
    console.log('useSuscriptionAsMaker.update', suscription)
    setLoading(false)
  }, [user]);

  const [data, setData] = useState<Subscription[]>([]);
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
  const [data, setData] = useState<Subscription[]>();
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

  const update = useCallback(async (data: Subscription) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.update', data)
  }, [dataRef])

  const create = useCallback(async (data: Partial<Subscription>) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.create', data)
  }, [dataRef])

  const remove = useCallback(async (suscription: string) => {
    if (!dataRef) return
    console.log('useSuscriptionAsTaker.delete', suscription)
  }, [dataRef])

  return { loading, data, update, create, remove }
}

export function useValidateIsFan(athleteId: string) {
  const { user: taker } = useAuthContext()
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!athleteId || !taker?.uid) return
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

interface SubscriptionCreateParams {
  paymentMethod: string
  membershipTier: string
}

export function useSubscribeToAthlete() {
  const [status, setStatus] = useState<MutationState>({
    success: false,
    loading: false,
    error: null
  })

  const create = useCallback(async (params: SubscriptionCreateParams) => {
    try {
      if (!params?.membershipTier || !params?.paymentMethod) return
      setStatus(current => ({ ...current, loading: true }))
      const addSubscription = httpsCallable(
        functions,
        "subscriptions-create"
      )
      await addSubscription(params)
      setStatus(current => ({ ...current, success: true }))
    } catch (error) {
      console.info(error)
      setStatus(current => ({ ...current, error: error?.message }))
    } finally {
      setStatus(current => ({ ...current, loading: false }))
    }

  }, [])

  return {
    ...status,
    create,
  }
}

export function useGetMySubscriptions() {
  const { user: fan } = useAuthContext()
  const [data, setData] = useState<Subscription[]>();
  const [status, setStatus] = useState<MutationState & { fetching: boolean }>({
    error: null,
    loading: true,
    success: false,
    fetching: false
  })
  const dataRef = useMemo(() =>
    !!fan?.uid ? query(collection(db, SUBSCRIPTION_COLLECTION_NAME),
      where("taker", "==", fan?.uid))
      .withConverter(converter) : null
    , [fan?.uid, db])


  useEffect(() => {
    if (!dataRef || !fan?.uid) return
    getDocs(dataRef)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()))
      })
      .finally(() => setStatus(current => ({ ...current, loading: false })))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    });
  }, [dataRef, fan]);


  return {
    ...status,
    data
  }
}

export function useGetMyFans() {
  const { user: athlete } = useAuthContext()
  const [data, setData] = useState<Subscription[]>();
  const [status, setStatus] = useState<MutationState & { fetching: boolean }>({
    error: null,
    loading: true,
    success: false,
    fetching: false
  })

  const dataRef = useMemo(() =>
    !!athlete?.uid ? query(
      collection(db, SUBSCRIPTION_COLLECTION_NAME),
      where("maker", "==", athlete?.uid),
      where("status", "==", SubscriptionStatus.ACTIVE)
    ).withConverter(converter) : null
    , [athlete, db])

  useEffect(() => {
    if (!dataRef || !athlete?.uid) return
    getDocs(dataRef)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()))
      })
      .finally(() => setStatus(current => ({ ...current, loading: false })))
    return onSnapshot(dataRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    });
  }, [dataRef, athlete?.uid]);


  return {
    ...status,
    data
  }
}

export function useDeleteSubscription() {
  const [status, setStatus] = useState<MutationState>({
    success: false,
    loading: false,
    error: null
  })

  const deleteSub = useCallback(async (subscriptionId: string) => {
    try {
      if (!subscriptionId) return
      setStatus(current => ({ ...current, loading: true }))
      const deleteSubscription = httpsCallable(
        functions,
        "subscriptions-delete"
      )
      await deleteSubscription(subscriptionId)
      setStatus(current => ({ ...current, success: true }))
    } catch (error) {
      console.info(error)
      console.log({ error })
      setStatus(current => ({ ...current, error: error?.message }))
    } finally {
      setStatus(current => ({ ...current, loading: false }))
    }
  }, [])

  return {
    ...status,
    deleteSub
  }
}

export function useGetGrossMoney  ()  {
  const [total,setTotal] = useState(0)
  const {data,loading} = useGetMyFans()

  useEffect(()=>{
    if(data?.length){
      setTotal(data.reduce((acc,subs)=>acc+subs?.monthlyPrice ?? 0,0))
    }
  },[data])

  return {
    data:{
      total
    }
  }
}