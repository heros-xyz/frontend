import { useCallback, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export interface Withdraw {
  status: string
  netAmount: number
  paymentInformation: string
  uid: string
}

export function useWithdrawal() {
  const [loading, setLoading] = useState(false)
  const {user} = useAuthContext()
  const create = useCallback(async (withdraw: Withdraw) => {
    if (!user?.uid) return
    //Llama a la fucnion de withdrawal
  }, [user])
  return { create, loading }
}
