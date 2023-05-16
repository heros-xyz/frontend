import { HttpErrorCode } from "./enums";

export const AUTH_ERROR_CODE = {
  [HttpErrorCode.MUST_SIGN_UP_FIRST]: `This email hasn't been registered. Please sign up.`,
  [HttpErrorCode.USER_ALREADY_REGISTERED]: `This email has been registered. Please sign in.`,
  [HttpErrorCode.INVALID_OTP]: "Invalid OTP, please recheck!",
  [HttpErrorCode.EXPIRED_OTP]: "Expired OTP, please recheck!",
};

export const getAuthErrorCode = (code: string | number | undefined) => {
  return AUTH_ERROR_CODE[code as keyof typeof AUTH_ERROR_CODE];
};

export const ACTIVE_PATHS = [
  "/athlete",
  "/fan",
  "/athlete/notification",
  "/fan/notification",
  "/athlete/interactions",
  "/fan/interactions",
  "/athlete/my-fan",
  "/athlete/my-profile",
  "/fan/my-profile",
];

export const gaMeasurementId = "G-W55H90J71S"

export const ADMIN_ROLE = 'ADMIN'
export const ATHLETE_ROLE = 'ATHLETE'
export const FAN_ROLE = 'FAN'
export const REFRESH_TOKEN_KEY = '_Auth.refresh-token'
export const ACCESS_TOKEN_KEY = '_Auth.access-token'
