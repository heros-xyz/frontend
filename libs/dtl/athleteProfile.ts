import { useDocument } from "react-firebase-hooks/firestore";
import { FirestoreError, Timestamp, doc, QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../firebase";


export interface AthleteProfile {
    id: string,
    createdAt?: Timestamp
    updatedAt?: Timestamp
    deletedAt?: Timestamp
    goal: string;
    currentTeam: string;
    firstName: string;
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
    })
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