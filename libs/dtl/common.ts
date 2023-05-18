import { IHerosError } from "@/types/globals/types";

export interface MutationState {
  success: boolean,
  error: null | IHerosError,
  loading: boolean
}

export interface SuscriptionState {
  initiated: boolean
  loading: boolean
  lastUpdate?: Date
  error?: string
}
