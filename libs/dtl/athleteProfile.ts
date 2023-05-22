import { useCollectionData, useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import {
    FirestoreError,
    Timestamp,
    doc,
    QueryDocumentSnapshot,
    collection,
    limit,
    query,
    where, getDoc, onSnapshot, addDoc, setDoc, updateDoc
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Suscription } from "@/libs/dtl/common";
import { db } from "../firebase";
import { Nationality } from "./nationalities";

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
    dateOfBirth: Date
    sport: {
        label: string
        key: string
    };
    tagline: string;
    tags: string[];
    uid: string;
    nationality: Nationality
    isFinishOnboarding?: boolean
}


const converter = {
    toFirestore: (data: any) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
        id: snap?.id,
        dateOfBirth: snap.data().dateOfBirth.toDate(),
        ...snap?.data()
    }) as AthleteProfile
}


interface MyAthleteProfileHook extends Suscription<AthleteProfile>{
    update: (data: Partial<AthleteProfile>) => Promise<void> | undefined
}
export const useMyAthleteProfile = ():MyAthleteProfileHook  => {
    const { user: user } = useAuthContext();
    const [status, setStatus] = useState<Suscription<AthleteProfile>>({
        initiated: false,
        loading: true,
    })

    const docRef = useMemo(()=>{
        if(!user || !user.uid) return
        return doc(db, "athleteProfile", user.uid).withConverter(converter)
    }, [user?.uid])

    const update = useCallback((data: Partial<AthleteProfile>)=>{
        if (!docRef) return
        return updateDoc(docRef, data)
    }, [docRef])

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


    return {
        update,
        ...status,
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
