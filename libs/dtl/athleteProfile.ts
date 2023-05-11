import { useDocument } from "react-firebase-hooks/firestore";
import { FirestoreError, Timestamp, doc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../firebase";


export interface AthleteProfile {
    createdAt?: Timestamp
    updatedAt?: Timestamp
    deletedAt?: Timestamp
    goal: string;
    currentTeam: string;
    firstName: string;
    nickName: string;
    story: string;
    sport: string;
    tagline: string;
    tags: string[];
    uid: string;
}


export function useGetAthleteProfile(): {
    athleteProfile?: AthleteProfile,
    loading: boolean,
    error: FirestoreError | undefined
} {
    const { userProfile: user } = useAuthContext();
    const [value, loading, error] = useDocument(
        !!user?.uid ?
            doc(db, "athleteProfile", user.uid) : null
    );

    return {
        loading,
        error,
        athleteProfile: value?.data() as AthleteProfile
    }
}