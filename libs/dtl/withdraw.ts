import { useCallback, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useAuthContext } from "@/context/AuthContext";
import { db, functions } from "../firebase";

export interface Withdraw {
  status: string
  netAmount: number
  paymentInformation: WithdrawParamsInformation
  uid: string
}

export interface WithdrawParamsInformation {
  bankName: string
  cardNumber: string
  swiftCode: string
}

export function useWithdrawal() {
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const create = useCallback(async (withdraw: WithdrawParamsInformation) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      const createRequest = httpsCallable(
        functions,
        "withdrawal-create"
      )
      await createRequest(withdraw)
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [user])

  return { create, loading, isSuccess }
}
