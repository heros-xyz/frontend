import { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
  addDoc
} from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";


export interface Payment {
  id?: string
  cardName: string
  cardNumber: string
  cardExpMonth: number
  cardExpYear: number
  cardCvc: string
  stripePayment?: any
  error?: string
  uid?: string
  expiredDate: any // TODO: check this MOCK
}

const converter = {
   toFirestore: (data: Payment) => {
     delete data.id
     return data
   },
   fromFirestore: (snap: QueryDocumentSnapshot) => {
     const data = snap.data() as Payment
     data.id = snap.id;
     return data as Payment
   }
}

export const usePaymentMethods = () => {
  const { user } = useAuthContext()
  const [data, setData] = useState<Payment[] | null>();
  const [dataStatus, setDataStatus] = useState<Partial<{
    initiated: boolean, loading: boolean
    lastUpdate: Date | undefined,
    error: string | undefined
  }>>({
    initiated: false,
    loading: false,
  })
  useEffect(() => {
    if (!user || !user.uid) return
    setDataStatus({
      initiated: true,
      loading: true
    })
    const q = query(collection(db, "paymentMethods"), where("uid", "==", user.uid)).withConverter(converter);
    getDocs(q).then(
      (docs) => setData(docs.docs.map(d => d.data()) as Payment[])
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
      setData(docs.docs.map(d => d.data()) as Payment[])
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
