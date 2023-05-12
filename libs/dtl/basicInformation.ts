import { User } from "./user";

export function mapToBasicInformation(userData: User) {
    return {
        dateOfBirth: (userData?.birthday || new Date())
            .toISOString()
            .split('T')[0],
        gender: userData?.gender || 0,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        middleName: userData?.middleName,
    }
}
