import { query, collection, where, getCountFromServer, Timestamp, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { IHerosError } from "@/types/globals/types";
import { db } from "../firebase";

interface CareerJourney {
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
        const q = query(
            collection(db, "careerJourneys"),
            where("uid", "==", user.uid)
        );
        getCountFromServer(q)
            .then((snapshot) => setCount(snapshot?.data().count))
            .catch(console.error);

    }, [user]);

    return count
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
