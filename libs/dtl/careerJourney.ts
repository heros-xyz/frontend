import { query, collection, where, getCountFromServer, addDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { IHerosError } from "@/types/globals/types";
import { db } from "../firebase";

export interface CareerJourney {
    startDate: string;
    endDate?: string;
    title: string;
    icon?: string | undefined;
    description: string;
    isPeriodDate?: boolean
    uid: string;
}

export function useGetCareerJourneyCount() {
    const { user } = useAuthContext()
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!user) return
        const q = query(
            collection(db, "careerJourneys"),
            where("uid", "==", user?.uid)
        );
        getCountFromServer(q)
            .then((snapshot) => setCount(snapshot?.data().count))
            .catch(console.error);

    }, [user]);

    return count
}

const converter = {
    toFirestore: (data: any) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
        id: snap?.id,
        ...snap?.data() as CareerJourney
    })
}

export function useCareerJourneys() {
    const { user } = useAuthContext()
    const [journeys, loading, error] = useCollectionData(
        user?.uid ?
            query(
                collection(db, "careerJourneys").withConverter(converter),
                where("uid", "==", user?.uid))
            : null,
    );

    return {
        journeys,
        loading,
        error
    }
}

interface AddCareerJourneyResult {
    loading: boolean;
    error: IHerosError | null;
    addJourneys: (journeys: CareerJourney[]) => void;
}

export function useAddCareerJourneys(): AddCareerJourneyResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null>(null);

    const addJourneys = async (documents: CareerJourney[]) => {
        setLoading(true);

        const collectionRef = collection(db, "careerJourneys");

        try {
            for (const doc of documents) {
                await addDoc(collectionRef, doc);
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        addJourneys
    };
}


export function useGetCareerJourney(id: string) {




}