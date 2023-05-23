import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import {
    Timestamp,
    doc,
    QueryDocumentSnapshot,
    collection,
    limit,
    query,
    where,
    getDoc,
    onSnapshot,
    setDoc, updateDoc, orderBy
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Suscription } from "@/libs/dtl/common";
import { db } from "../firebase";
import { Nationality } from "./nationalities";
import { useGetMySubscriptions } from "./subscription";

const AthleteProfileCollectionName = "athleteProfile"


export interface AthleteProfile {
    id: string,
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
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
    dateOfBirth: Date
    sport: {
        label: string
        key: string
    };
    tagline: string;
    tags: string[];
    uid: string;
    nationality: Nationality
    totalInteractionCount: number
    recommended?: boolean
    isFinishOnboarding?: boolean
}


export const converter = {
    toFirestore: (data: any) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
            id: snap?.id,
            ...snap?.data(),
            createdAt: snap?.data()?.createdAt?.toDate(),
    }) as AthleteProfile
}

export const useAthleteProfile = (athleteId?: string):Suscription<AthleteProfile>  => {
    const [status, setStatus] = useState<Suscription<AthleteProfile>>({
        initiated: false,
        loading: true,
    })

    const docRef = useMemo(()=>{
        if(!athleteId) return
        return doc(db, "athleteProfile", athleteId).withConverter(converter)
    }, [athleteId])

    useEffect(() => {
        if (!docRef) return
        setStatus((prev) => ({
            ...prev,
            loading: true,
            error: undefined,
        }))
        getDoc(docRef)
          .then((snapshot) => {
              if (!snapshot.exists()){
                  setDoc(docRef, {} as AthleteProfile)
              }
              setStatus((prev) => ({
                  ...prev,
                  data: snapshot.data()
              }))
          })
          .catch((e: Error) => {
              setStatus((prev) => ({
                  ...prev,
                  error: e.message
              }))
          })
          .finally(() => {
              setStatus((prev) => ({
                  ...prev,
                  loading: false,
                  lastUpdate: new Date()
              }))
          })
        return onSnapshot(docRef, (snapshot) => {
            setStatus((prev) => ({
                ...prev,
                data: snapshot.data(),
                lastUpdate: new Date()
            }))
        });
    }, [docRef])


    return status
}

interface MyAthleteProfileHook extends Suscription<AthleteProfile>{
    update: (data: Partial<AthleteProfile>) => Promise<void> | undefined
}
export const useMyAthleteProfile = ():MyAthleteProfileHook  => {
    const { user } = useAuthContext();
    const status = useAthleteProfile(user?.uid)

    const docRef = useMemo(()=>{
        if(!user || !user.uid) return
        return doc(db, AthleteProfileCollectionName, user.uid).withConverter(converter)
    }, [user?.uid])

    const update = useCallback((data: Partial<AthleteProfile>)=>{
        if (!user?.uid) return
        return updateDoc(doc(db, AthleteProfileCollectionName, user.uid).withConverter(converter), data)
    }, [user?.uid])


    return {
        update,
        ...status,
    }
}

export function useAllAthletes({ limitAmount = 3 } = { limitAmount: 3 }) {
    const q = query(
        collection(db, AthleteProfileCollectionName),
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
    const [data, loading, error] = useDocumentData(uid ? doc(db, AthleteProfileCollectionName, uid).withConverter(converter) : null)

    return {
        data,
        loading,
        error
    }
}

type GetListAthleteRecommended = {
    limitAmount?: number
}
export function useGetListAthleteRecommended({ limitAmount = 3 }: GetListAthleteRecommended) {
    const q = query(
        collection(db, AthleteProfileCollectionName),
        where("isFinishOnboarding", "==", true),
        orderBy("totalSubCount", "desc"),
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
                const profileRef = doc(db, `${AthleteProfileCollectionName}/${id}`).withConverter(converter);
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
            const profilesData = await Promise.all(profilesPromises as any);
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
