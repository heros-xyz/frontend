import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { db } from "@/libs/firebase";

export interface Sport {
  key: string
  label: string
}

export interface Sports {
  all: Sport[]
}

export function useSports() {
  const [sports, loading, error] =
    useDocumentData(doc(db,`public/sports`));
  const sportsMapped = useMemo(() => {
    if (!sports) return []
    return sports.all.map((sport: Sport) => ({
      value: sport.key,
      label: sport.label
    }))
  }, [sports]);
  return {
    sportsMapped,
    sports: sports && sports.all,
    loading,
    error
  };
}
