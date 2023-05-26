import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useMemo } from "react";
import { Nationality } from "@/libs/dtl/types";
import { db } from "../firebase";

export function useGetNationalities() {
    const [nationalities, loading, error] =
        useDocumentData(doc(db, `public/nationalities`));
    const nationalitiesMapped = useMemo(() => {
        if (!nationalities) return []
        return nationalities.all.map((nationality: Nationality) => ({
            ...nationality,
            value: nationality.code,
            label: nationality.name
        }))
    }, [nationalities]);
    return {
        nationalitiesMapped,
        nationalities: nationalities && nationalities.all,
        loading,
        error
    };
}
