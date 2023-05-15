import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
export interface Payment {
  id?: string
  paymentMethodId: string
  paymentMethod: any
  //Estos no van...
  cardNumber: string
  cardType: string
  expiredDate: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Payment
    data.id = snap.id;
    return data
  }
}

export const usePaymentMethod = () => {
  const { user } = useAuthContext()
  const create = useCallback(async (post: Payment) => {
    if (!user || !user.uid) return
    //Llama a la fucnion de withdrawal
  }, [user?.uid])
  const [loading, setLoading] = useState(true);
  const [data, serData] = useState<Payment[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return
    const q = query(collection(db, "payment"), where("uid", "==", user?.uid)).withConverter(converter)
    getDocs(q)
      .then((snapshot) => {
        serData(snapshot.docs.map(d => d.data()))
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      serData(snapshot.docs.map(d => d.data()))
    });
  }, [user?.uid]);

  return { create, loading, data }
}
