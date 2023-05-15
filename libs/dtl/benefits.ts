import { useDocumentData } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { CareerJourney } from "@/libs/dtl/careerJourney";
import { Reaction } from "@/libs/dtl/reaction";

export interface Benefit {
  key: string
  label: string
}

export interface Benefits {
  all: Benefit[]
}

const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>{
    const data = snap.data() as Benefits
    return data
  }
}

export function useBenefits() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Benefit[]>([]);

  useEffect(() => {
    const q = doc(db, "public/benefits").withConverter(converter)
    getDoc(q)
      .then((snapshot) => {
        setData(snapshot.data()?.all || [])
      })
      .finally(() => setLoading(false))
    return onSnapshot(q, (snapshot) => {
      setData(snapshot.data()?.all || [])
    });
  }, []);

  return {
    loading,
    data
  }
}
