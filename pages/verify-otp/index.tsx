import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { signInWithCustomToken } from "firebase/auth";
import OtpFill from "@/components/ui/OtpFill";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/api/user";
import { IToken } from "@/types/users/types";
import { useLoading } from "@/hooks/useLoading";
import { IHerosError } from "@/types/globals/types";
import { auth, functions } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { RoutePath } from "@/utils/route";

const VerifyOtp = () => {
  const { query, replace, push } = useRouter();
  const [otp, setOtp] = useState("");
  const { start, finish } = useLoading();
  const [verifyOtp, { data: verifyOtpData, error: verifyOtpError, isLoading }] =
    useVerifyOtpMutation();
  const [resendOtp, { error: resendOtpError }] = useResendOtpMutation();
  const { userProfile } = useAuthContext();
  const [callVerifyOtp, loadingOtpVerify, error] = useHttpsCallable(
    functions,
    "auth-verify"
  );
  const [callSignin, loadingResendOtp, errorResendOtp] = useHttpsCallable(
    functions,
    "auth-signin"
  );

  const callbackUrl = useMemo(() => {
    if (typeof query.callbackUrl === "string") return query.callbackUrl ?? "/";

    return "/";
  }, [query]);

  const handleVerify = async (otp: string) => {
    start();
    try {
      setOtp(otp);
      const params = {
        email: query.email as string,
        otp,
      };
      const res: any = await callVerifyOtp(params);
      if (res?.data) {
        await signInWithCustomToken(auth, res?.data);
        if (userProfile) {
          console.log({ userProfile });
          if (userProfile?.profileType === "FAN") {
            push(
              userProfile?.isFinishOnboarding
                ? RoutePath.FAN
                : RoutePath.FAN_ONBOARDING
            );
          }

          if (userProfile?.profileType === "ATHLETE") {
            push(
              userProfile?.isFinishOnboarding
                ? RoutePath.ATHLETE
                : RoutePath.ATHLETE_SETUP_ACCOUNT
            );
          }
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      finish();
    }
  };

  const handleSignIn = async (token: IToken) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: callbackUrl as string,
        ...token,
      });

      if (res?.ok) {
        replace(callbackUrl);
      }
    } catch (error) {
      setOtp("");
      console.log("next auth credentials error", error);
    }
  };

  const onResendOtp = async () => {
    if (loadingResendOtp) {
      start();
    }
    await callSignin({ email: query?.email as string });
    setTimeout(() => {
      finish();
    }, 300);
  };

  useEffect(() => {
    if (verifyOtpError) {
      setOtp("");
    }
  }, [verifyOtpError]);

  useEffect(() => {
    if (verifyOtpData) {
      handleSignIn(verifyOtpData.token);
    }
  }, [verifyOtpData]);

  return (
    <Box>
      <Head>
        <title>Verify OTP</title>
      </Head>
      <OtpFill
        description="An OTP code is being sent to your registered email. Please enter the code here"
        title="OTP Verification"
        textButton="verify"
        validTime={5}
        isLoading={isLoading}
        otpValue={otp}
        errorMessage={
          ((verifyOtpError as IHerosError)?.data?.statusCode ||
            (resendOtpError as IHerosError)?.data?.statusCode) ??
          ""
        }
        onSubmit={handleVerify}
        resendOtp={onResendOtp}
      />
    </Box>
  );
};

export default VerifyOtp;
