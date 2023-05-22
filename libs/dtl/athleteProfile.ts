import { useCollectionData, useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { FirestoreError, Timestamp, doc, QueryDocumentSnapshot, collection, limit, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../firebase";
import { Nationality } from "./nationalities";
import { useGetMySubscriptions } from "./subscription";

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
    dateOfBirth: string
    sport: {
        label: string
        key: string
    };
    tagline: string;
    tags: string[];
    uid: string;
    nationality: Nationality
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
    const q = query(
        collection(db, "athleteProfile"),
        where("isFinishOnboarding", "==", true),
        limit(limitAmount)
    ).withConverter(converter)
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

export function useGetListAthleteRecommended({ limitAmount } = { limitAmount: 3 }) {
    const q = query(
        collection(db, "athleteProfile"),
        where("isFinishOnboarding", "==", true),
        limit(limitAmount)
    ).withConverter(converter)
    const [data, loading, error] = useCollectionData(q)

    return { data, loading, error }
}


export function useAthleteSubscribed({ limitAmount = 3 }) {
    const [profiles, setProfiles] = useState<AthleteProfile[]>([])
    const [status, setStatus] = useState({ loading: true })
    const { data: mySubscriptions, loading: loadingMySubscriptions } = useGetMySubscriptions()

    useEffect(() => {
        const fetchProfiles = async () => {
            const profilesPromises = mySubscriptions?.map?.(async ({ maker: id }) => {
                const profileRef = doc(db, `athleteProfile/${id}`).withConverter(converter);
                const unsubscribe = onSnapshot(profileRef, profileSnapshot => {
                    if (profileSnapshot.exists()) {
                        setProfiles(prevProfiles => {
                            const updatedProfiles = [...prevProfiles];
                            const profileIndex = updatedProfiles.findIndex(profile => profile.id === profileSnapshot.id);
                            if (profileIndex !== -1) {
                                updatedProfiles[profileIndex] = profileSnapshot.data() as AthleteProfile;
                            } else {
                                updatedProfiles.push({ ...profileSnapshot.data() } as AthleteProfile);
                            }
                            return updatedProfiles;
                        });
                    } else {
                        setProfiles(prevProfiles => {
                            const updatedProfiles = prevProfiles.filter(profile => profile.id !== profileSnapshot.id);
                            return updatedProfiles;
                        });
                    }
                });
                return { id, unsubscribe };
            });
            const profilesData = await Promise.all(profilesPromises);
            setStatus({ loading: false })
            // Unsubscribe from snapshots when component unmounts
            return () => {
                profilesData?.forEach?.(({ unsubscribe }) => unsubscribe?.());
            };
        };

        if (!!mySubscriptions && mySubscriptions?.length > 0) {
            fetchProfiles();
        } else {
            setProfiles([]);
            setStatus({ loading: false })
        }
    }, [mySubscriptions]);


    return ({
        ...status,
        data: profiles,
    })
}