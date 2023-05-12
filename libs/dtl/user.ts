import { Nationality } from "./nationalities"

export interface User {
  avatar?: string
  birthday?: Date
  gender?: number
  fullname: string
  firstName: string
  lastName: string
  middleName?: string
  isFinishOnboarding: boolean
  uid?: string
  nationality: Nationality
  isFinishSetupAccount?: boolean
}
