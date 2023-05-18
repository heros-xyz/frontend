import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, getDoc, getDocs, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/libs/firebase";
import { MutationState } from "./careerJourney";

export interface Payment {
  // id?: string
  cardName: string
  cardNumber: string
  cardExpMonth: number
  cardExpYear: number
  cardCvc: string
  uid: string
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data()
    data.id = snap.id;
    return data as Payment & { id: string }
  }
}

export const usePaymentMethod = () => {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Payment | null>(null);
  const [mutationCreate, setMutationCreate] = useState<MutationState>({
    success: false,
    loading: false,
    error: null
  })


  const createAndUpdatePaymentMethod = useCallback(async (payment: Payment) => {
    if (!user || !user.uid) return
    const collectionRef = collection(db, "paymentMethods");
    try {
      setMutationCreate(current => ({ ...current, loading: true }))
      const q = query(collectionRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // 1. crea el nuevo
        await addDoc(collectionRef, {
          ...payment,
        });
        //2. Se fija que no haya devuelto error
        const q2 = query(collectionRef, where("uid", "==", user.uid));
        const querySnapshot2 = await getDocs(q2);
        if (!querySnapshot2.empty) {
          querySnapshot2.forEach(async (doc) => {
            if (doc.data().error) throw new Error(doc.data().error)
          });
        }

        // 3. Si no hay error, borra el anterior


        // Document(s) with the specified key exist
        querySnapshot.forEach((doc) => {
          // if (doc.data().error) throw new Error(doc.data().error)
          console.log("Document data:", doc.data(), doc.id);
        });
      } else {
        console.log("No document found with the specified key.");
        console.log("Creating...")
        await addDoc(collectionRef, {
          ...payment,
        });
        // No document with the specified key found
      }
      setMutationCreate(current => ({ ...current, success: true }))
    } catch (error) {
      console.log("Acá está el error", error)
      setMutationCreate(current => ({ ...current, success: false, error: { data: error } }))
    } finally {
      setMutationCreate(current => ({ ...current, loading: false }))
    }
  }, [user?.uid])

  const updatePaymentMethod = useCallback(async (post: Payment) => {
    if (!user || !user.uid) return
    try {
      setMutationCreate(current => ({ ...current, loading: true }))


      setMutationCreate(current => ({ ...current, success: true }))
    } catch (error) {
      console.log(error)
      setMutationCreate(current => ({ ...current, success: false, error: { data: error } }))
    } finally {
      setMutationCreate(current => ({ ...current, loading: false }))
    }
  }, [user?.uid])

  const deletePaymentMethod = useCallback(async (post: Payment) => {
    if (!user || !user.uid) return
    try {
      setMutationCreate(current => ({ ...current, loading: true }))
      const collectionRef = collection(db, "paymentMethods");
      await addDoc(collectionRef, {
        ...post,
      });
      setMutationCreate(current => ({ ...current, success: true }))
    } catch (error) {
      console.log(error)
      setMutationCreate(current => ({ ...current, success: false, error: { data: error } }))
    } finally {
      setMutationCreate(current => ({ ...current, loading: false }))
    }
  }, [user?.uid])


  // useEffect(() => {
  //   if (!user || !user.uid) return
  //   const q = query(collection(db, "payment"), where("uid", "==", user?.uid)).withConverter(converter)
  //   getDocs(q)
  //     .then((snapshot) => {
  //       serData(snapshot.docs.map(d => d.data()))
  //     })
  //     .finally(() => setLoading(false))
  //   return onSnapshot(q, (snapshot) => {
  //     serData(snapshot.docs.map(d => d.data()))
  //   });
  // }, [user?.uid]);

  return { createAndUpdatePaymentMethod: { createAndUpdatePaymentMethod, ...mutationCreate }, updatePaymentMethod: { updatePaymentMethod, ...mutationCreate }, deletePaymentMethod: { deletePaymentMethod, ...mutationCreate }, loading, data }
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
