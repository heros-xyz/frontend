import { getDownloadURL, ref } from "firebase/storage"
import { useState } from "react"
import { useUploadFile } from "react-firebase-hooks/storage"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useAuthContext } from "@/context/AuthContext"
import { db, storage } from "../firebase"
import { Nationality } from "./nationalities"

export interface User {
  avatar?: string
  dateOfBirth?: Date | string
  gender?: number
  fullname: string
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
}

export function useUploadAvatarToUser() {
  const { user } = useAuthContext()
  const [uploadFile] = useUploadFile();
  const [isLoading, setIsLoading] = useState(false)

  const uploadAvatar = async (avatar: File) => {
    try {
      setIsLoading(true)
      console.log({ user })
      const refStorage = ref(storage, `profile/${user?.uid}/avatar.${avatar?.type.split('/')[1]}`);
      const result = await uploadFile(refStorage, avatar, {
        contentType: avatar.type
      });
      if (!!result?.ref) {
        return await getDownloadURL(result?.ref);
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    uploadAvatar
  }
}

export const REMIND_CREATE_INTERACTION_TIME = 3600 * 24 * 3 * 1000; // 3 days in millisecond unit

export async function getHasRecentPosts(userId: string) {
  /**
   * 
   * 
   * const current = new Date();
    const remindInteractionDate = new Date();
    remindInteractionDate.setTime(
      current.getTime() - REMIND_CREATE_INTERACTION_TIME,
    );
   * 
   * 
   * Busca las ultimas iteraccion del usuario
   * const recentInteraction = await getDocs(query(collection(db, "post", user.uid))(user.uid);
   *  let hasCreateInteractionRecent = true;(user.uid);
   *  let hasCreateInteractionRecent = true;

    if (
      !recentInteraction ||
      recentInteraction.createdAt < remindInteractionDate
    ) {
      hasCreateInteractionRecent = false;
    }
   * 
   * 
   */
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('uid', '==', userId), orderBy('publishedDate', 'desc'), limit(1));
  const dosc = (await getDocs(q)).docs.map(doc => doc.data());

}