import { query, collection, where, getCountFromServer, addDoc, QueryDocumentSnapshot, doc, updateDoc, serverTimestamp, FieldValue } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useCollectionData, useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { set } from "immer/dist/internal";
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

interface MutationState {
    success: boolean,
    error: null | IHerosError,
    loading: boolean
}

export function useGetCareerJourney(id: string) {
    const [mutationStatus, setMutationStatus] = useState<MutationState>({
        success: false,
        error: null,
        loading: false
    })
    const [journey, loading, error] = useDocumentData(
        id ? doc(db, 'careerJourneys', id).withConverter(converter) : null
    )

    const editJourney = useCallback(async (params: Partial<CareerJourney>) => {
        try {
            const docRef = doc(db, "careerJourneys", id);
            setMutationStatus(c => ({ ...c, loading: true }))
            await updateDoc(docRef, params);
            setMutationStatus(c => ({ ...c, success: true }))
            return null
        } catch (error) {
            setMutationStatus(c => ({ ...c, error: { data: error } }))
            console.log({ error })
        } finally {
            setMutationStatus(c => ({ ...c, loading: false }))
        }
    }, [id])

    const deleteJourney = useCallback(async () => {
        try {
            const docRef = doc(db, "careerJourneys", id);
            setMutationStatus(c => ({ ...c, loading: true }))
            await updateDoc(docRef, { deletedAt: serverTimestamp() });
            setMutationStatus(c => ({ ...c, success: true }))
        } catch (error) {
            setMutationStatus(c => ({ ...c, error: { data: error } }))
            console.log("Delete Journey", { error })
        } finally {
            setMutationStatus(c => ({ ...c, loading: false }))
        }

    }, [id])

    return {
        edit: {
            ...mutationStatus,
            editJourney,
        },
        get: {
            loading,
            journey,
            error,
        },
        delete: {
            ...mutationStatus,
            deleteJourney,
        }
    }
}

export function useAddCareerJourney() {
    const { user } = useAuthContext()
    const [add, setAdd] = useState<MutationState>({
        success: false,
        error: null,
        loading: false
    })

    const addJourney = useCallback(async (params: CareerJourney) => {
        if (!user) return
        try {
            setAdd(c => ({ ...c, loading: true }))
            const collectionRef = collection(db, "careerJourneys");
            await addDoc(collectionRef, { ...params, uid: user?.uid });
            setAdd(c => ({ ...c, success: true }))
        } catch (error) {
            setAdd(c => ({ ...c, error: { data: error } }))
            console.log(error)
        } finally {
            setAdd(c => ({ ...c, loading: false }))
        }

    }, [user])

    return {
        ...add,
        addJourney,
    }
}
