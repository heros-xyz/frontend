import { getStorage, ref, uploadBytesResumable, getDownloadURL, updateMetadata } from "firebase/storage"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query, QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext"
import { Suscription } from "@/libs/dtl/common";
import { Nationality } from "@/libs/dtl/types";
import { db, storage } from "../firebase"


export interface User {
  id: string
  avatar?: string
  dateOfBirth?: Date
  gender?: number
  fullName: string
  firstName: string
  email: string
  lastName: string
  middleName?: string
  isFinishOnboarding: boolean
  isFirstLogin: boolean
  uid?: string
  nationality: Nationality
  isFinishSetupAccount?: boolean
  profileType: "FAN" | "ATHLETE" | "ADMIN"
  stripeCustomer?: string
  // Only for athlete
  hasFirstInteraction?: boolean
  hasCreateInteractionRecent?: boolean
  netAmount: number
}

export function useUploadAvatarToUser() {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)

  const uploadAvatar = async (avatar: File) => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true)
      const refStorage = ref(storage, `profile/${user?.uid}/avatar.${avatar?.type.split('/')[1]}`);
      const customMetadata = {
        cacheControl: 'public, max-age=31536000',  // Un año
      };
      const uploadTask = uploadBytesResumable(refStorage, avatar, { customMetadata });
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observa los estados de subida y
          // Calcula el progreso de la subida
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Maneja cualquier error que ocurra
          console.error("Error subiendo archivo: ", error);
        },
        () => {
          // Subida completada exitosamente!
          // Ahora obtenemos la URL pública del archivo.
        })
      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        //remove token attribute of the downloadURL
        const downloadURLWithoutToken = downloadURL.split('?')[0]
        debugger
        resolve(downloadURLWithoutToken+"?alt=media")
      }).catch(()=>reject()).finally(()=>setIsLoading(false))
    })
  }

  return {
    isLoading,
    uploadAvatar
  }
}

export const REMIND_CREATE_INTERACTION_TIME = 3600 * 24 * 3 * 1000; // 3 days in millisecond unit

export async function getHasRecentPosts(userId: string) {
  const current = new Date();
  const remindInteractionDate = new Date();
  remindInteractionDate.setTime(
    current.getTime() - REMIND_CREATE_INTERACTION_TIME,
  );
  const postsRef = collection(db, 'post')
  const q = query(
    postsRef,
    where('uid', '==', userId),
    orderBy('publicDate', 'desc'),
    limit(1)
  );
  const recentInteraction = (await getDocs(q)).docs.map(doc => doc.data());

  let hasCreateInteractionRecent = true;

  const createdAt = recentInteraction?.[0]?.createdAt?.toDate()

  if (
    !recentInteraction?.length ||
    createdAt < remindInteractionDate
  ) {
    hasCreateInteractionRecent = false;
  }

  return ({
    hasFirstInteraction: Boolean(recentInteraction?.length),
    hasCreateInteractionRecent,
  })
}


const converter = {
  toFirestore: (data: any) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
      ...snap?.data(),
      id: snap?.id,
      dateOfBirth: snap.data().dateOfBirth?.toDate()
    }) as User
}

interface MyUserProfileHook extends Suscription<User>{
  update: (data: Partial<User>) => Promise<void> | undefined
}
export const useMyUserProfile = ():MyUserProfileHook  => {
  const { user: user } = useAuthContext();
  const [status, setStatus] = useState<Suscription<User>>({
    initiated: false,
    loading: true,
  })

  const docRef = useMemo(()=>{
    if(!user || !user.uid) return
    return doc(db, "user", user.uid).withConverter(converter)
  }, [user?.uid])

  const update = useCallback((data: Partial<User>)=>{
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
          setDoc(docRef, {} as User)
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
