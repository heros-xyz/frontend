import { useSession } from "next-auth/react"
import { ADMIN_ROLE, ATHLETE_ROLE, FAN_ROLE } from "@/utils/constants"
import { IUser } from "@/types/next-auth"
import { useAuthContext } from "@/context/AuthContext"
import { User } from "@/libs/dtl"

export const useUser = () => {
	const { userProfile } = useAuthContext()

	return {
		user: userProfile as User || {},
		isAthlete: userProfile?.profileType === ATHLETE_ROLE,
		isFan: userProfile?.profileType === FAN_ROLE,
		isAdmin: userProfile?.profileType === ADMIN_ROLE,
	}
}