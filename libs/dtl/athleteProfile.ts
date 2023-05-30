import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import {
    collection,
    doc,
    getCountFromServer,
    getDoc,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Suscription } from "@/libs/dtl/common";
import { AthleteProfile, AthleteProfilesuscription, CollectionPath } from "@/libs/dtl/types";
import { NotificationEventType } from "@/utils/enums";
import { IAthleteUpToDate } from "@/types/athlete/types";
import { db } from "../firebase";
import { SubscriptionStatus, useGetMySubscriptions } from "./subscription";
import { collectionPath } from "./constant";
import { NotificationStatusType } from "./notification";


export const converter = {
    toFirestore: (data: any) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        ({
            id: snap?.id,
            ...snap?.data(),
            createdAt: snap?.data()?.createdAt?.toDate?.(),
            dateOfBirth: snap?.data()?.dateOfBirth?.toDate?.(),
            postsDates: snap?.data()?.postsDates?.map?.((date: any) => date?.toDate?.()) ?? [],
        }) as AthleteProfile
}

export const useAthleteProfile = (athleteId?: string): AthleteProfilesuscription => {
    const [status, setStatus] = useState<Suscription<AthleteProfile>>({
        initiated: false,
        loading: true,
    })
    const [isMyAthlete, setIsMyAthlete] = useState(false)
    const { user } = useAuthContext()
    useEffect(() => {
        if (!athleteId || !user) return
        const q = query(collection(db, CollectionPath.SUBSCRIPTIONS),
          where("maker", "==", athleteId),
          where("taker", "==", user.uid),
          where("status", "==", SubscriptionStatus.ACTIVE)
        );

        getCountFromServer(q)
          .then((snapshot) => setIsMyAthlete(snapshot?.data().count!==0))
          .catch(console.error);

        return onSnapshot(q, (snapshot) => {
            setIsMyAthlete(snapshot.docs.length!==0)
        })
    }, [athleteId, user]);

    const docRef = useMemo(() => {
        if (!athleteId) return
        return doc(db, collectionPath.ATHLETE_PROFILE, athleteId).withConverter(converter)
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
                if (!snapshot.exists()) {
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


    return {
        isMyAthlete,
        ...status,
    }
}

interface MyAthleteProfileHook extends Suscription<AthleteProfile> {
    update: (data: Partial<AthleteProfile>) => Promise<void> | undefined
}
export const useMyAthleteProfile = (): MyAthleteProfileHook => {
    const { user } = useAuthContext();
    const status = useAthleteProfile(user?.uid)

    const docRef = useMemo(() => {
        if (!user || !user.uid) return
        return doc(db, collectionPath.ATHLETE_PROFILE, user.uid).withConverter(converter)
    }, [user?.uid])

    const update = useCallback((data: Partial<AthleteProfile>) => {
        if (!user?.uid) return
        return updateDoc(doc(db, collectionPath.ATHLETE_PROFILE, user.uid).withConverter(converter), data)
    }, [user?.uid])


    return {
        update,
        ...status,
    }
}

export function useAllAthletes({ limitAmount = 3 } = { limitAmount: 3 }) {
    const q = query(
        collection(db, collectionPath.ATHLETE_PROFILE),
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
    const [data, loading, error] = useDocumentData(uid ? doc(db, collectionPath.ATHLETE_PROFILE, uid).withConverter(converter) : null)

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
        collection(db, collectionPath.ATHLETE_PROFILE),
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
                const profileRef = doc(db, `${collectionPath.ATHLETE_PROFILE}/${id}`).withConverter(converter);
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

export const useGetNotificationsFromAthletes = () => {
    const { user } = useAuthContext()
    const { data: athletes, loading: loadingAthletes } = useAthleteSubscribed({ limitAmount: 50 })
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (loadingAthletes || !user?.uid) return

        (async () => {
            setLoading(true)
            const data = athletes.map(async (athlete) => {

                const q = query(
                    collection(db, CollectionPath.NOTIFICATIONS),
                    where("uid", "==", user?.uid),
                    where("eventType", "==", NotificationEventType.ATHLETE_NEW_INTERACTION),
                    where("source.id", "==", athlete.id),
                    where("status", "==", NotificationStatusType.NOT_READ),
                )

                const count = (await getCountFromServer(q)).data().count

                return {
                    id: athlete.id,
                    targetUser: {
                        avatar: athlete?.avatar,
                        firstName: athlete?.firstName,
                        id: athlete.id,
                        lastName: athlete?.lastName,
                        nickName: athlete?.nickName,
                    },
                    totalNewestInteraction: count
                } as IAthleteUpToDate
            })
            setLoading(false)
            setData(await Promise.all(data))
        })()
    }, [athletes, user?.uid, loadingAthletes])


    return {
        data,
        loading: loadingAthletes || loading
    }
}
