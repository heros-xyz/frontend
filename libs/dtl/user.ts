import { getDownloadURL, ref } from "firebase/storage"
import { useState } from "react"
import { useUploadFile } from "react-firebase-hooks/storage"
import { useAuthContext } from "@/context/AuthContext"
import { storage } from "../firebase"
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
  stripeCustomer?: string
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
