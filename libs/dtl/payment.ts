import { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
  QuerySnapshot,
  addDoc
} from "firebase/firestore";
import Stripe from '@stripe/stripe-js';
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";

import { SuscriptionState } from "@/libs/dtl/common";

export interface Payment {
  id?: string
  cardName: string
  cardNumber: string
  cardExpMonth: number
  cardExpYear: number
  cardCvc: string
  stripePayment?: Stripe.PaymentMethodResult
  error?: string
  uid?: string
}

const converter = {
   toFirestore: (data: Payment) => {
     delete data.id
     return data
   },
   fromFirestore: (snap: QueryDocumentSnapshot) => {
     const data = snap.data() as Payment
     data.id = snap.id;
     return data
   }
}

export const usePaymentMethods = () => {
  const { user } = useAuthContext()

  const [data, setData] = useState<QuerySnapshot<Payment>|null>();
  const [dataStatus, setDataStatus] = useState<SuscriptionState>({
    initiated: false,
    loading: false
  })
  useEffect(() => {
    if (!user || !user.uid) return
    setDataStatus({
      initiated: true,
      loading: true
    })
    const q = query(collection(db, "paymentMethods"), where("uid", "==", user.uid)).withConverter(converter);
    getDocs(q).then(
      (docs) => setData(docs as QuerySnapshot<Payment>)
    ).catch((e: Error) => setDataStatus({
      ...dataStatus,
      error: e.message
    }))
    .finally(()=>setDataStatus({
      ...dataStatus,
      loading: false,
      lastUpdate: new Date()
    }))
    return onSnapshot(q,(docs) => {
      setData(docs as QuerySnapshot<Payment>)
    })
  }, [user])

  const create = useCallback(async (paymentData: Payment) => {
    if (!user || !user.uid || !paymentData) return
    return addDoc(collection(db,"paymentMethods"), {
      ...paymentData,
      uid: user.uid
    });
  }, [user])

  return {
    create,
    data,
    dataStatus,
  }
}

export const usePaymentMethods = () => {
  const { user } = useAuthContext()
  const [data, setData] = useState<QuerySnapshot<Payment> | null>();
  const [dataStatus, setDataStatus] = useState<any>({
    initiated: false,
    loading: false
  })
  useEffect(() => {
    if (!user || !user.uid) return
    setDataStatus({
      initiated: true,
      loading: true
    })
    const q = query(collection(db, "paymentMethods"), where("uid", "==", user.uid)).withConverter(converter);
    getDocs(q).then(
      (docs) => setData(docs.docs.map(d => d.data()) as QuerySnapshot<Payment>)
    ).catch((e: Error) => setDataStatus({
      ...dataStatus,
      error: e.message
    }))
      .finally(() => setDataStatus({
        ...dataStatus,
        loading: false,
        lastUpdate: new Date()
      }))
    return onSnapshot(q, (docs) => {
      setData(docs.docs.map(d => d.data()) as QuerySnapshot<Payment>)
    })
  }, [user])

  const create = useCallback(async (paymentData: Payment) => {
    if (!user || !user.uid || !paymentData) return
    return addDoc(collection(db, "paymentMethods"), {
      ...paymentData,
      uid: user.uid
    });
  }, [user])

  return {
    create,
    data,
    dataStatus,
  }
}
