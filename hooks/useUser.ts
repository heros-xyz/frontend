import { useSession } from "next-auth/react"
import { ADMIN_ROLE, ATHLETE_ROLE, FAN_ROLE } from "@/utils/constants"
import { IUser } from "@/types/next-auth"

export const useUser = () => {
	const { data: session } = useSession()

	return {
		user: session?.user as IUser || {},
		isAthlete: session?.user.role === ATHLETE_ROLE,
		isFan: session?.user.role === FAN_ROLE,
		isAdmin: session?.user.role === ADMIN_ROLE,
	}
}