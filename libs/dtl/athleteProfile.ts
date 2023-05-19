import { useCollectionData, useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { FirestoreError, Timestamp, doc, QueryDocumentSnapshot, collection, limit, query } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../firebase";

export interface AthleteProfile {
    id: string,
    createdAt?: Timestamp
    updatedAt?: Timestamp
    deletedAt?: Timestamp
    goal: string;
    currentTeam: string;
    totalSubCount: number
    firstName: string;
    lastName: string;
    middleName: string;
    avatar: string;
    gender: string
    fullName: string
    nickName: string;
    story: string;
    sport: {
        label: string
        key: string
    };
    tagline: string;
    tags: string[];
    uid: string;
}


const converter = {
    toFirestore: (data: any) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
        id: snap?.id,
            ...snap?.data() 
        }) as AthleteProfile
}

export function useGetAthleteProfile(): {
    athleteProfile?: AthleteProfile,
    loading: boolean,
    error: FirestoreError | undefined
} {
    const { userProfile: user } = useAuthContext();
    const [value, loading, error] = useDocument(
        !!user?.uid ?
            doc(db, "athleteProfile", user.uid).withConverter(converter) : null
    );

    return {
        loading,
        error,
        athleteProfile: value?.data() as AthleteProfile
    }
}

export function useAllAthletes({ limitAmount = 3 } = { limitAmount: 3 }) {
    const q = query(collection(db, "athleteProfile").withConverter(converter), limit(limitAmount))
    const [data, loading, error] = useCollectionData(q)

    return {
        data,
        loading,
        error
    }
}

export function useGetAthleteProfileByUid(uid: string) {
    const [data, loading, error] = useDocumentData(uid ? doc(db, "athleteProfile", uid).withConverter(converter) : null)

    return {
        data,
        loading,
        error
    }
}
