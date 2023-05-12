import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { signInWithCustomToken } from "firebase/auth";
import OtpFill from "@/components/ui/OtpFill";
import { useLoading } from "@/hooks/useLoading";
import { IHerosError } from "@/types/globals/types";
import { auth, functions } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { RoutePath } from "@/utils/route";

const VerifyOtp = () => {
  const { query, push } = useRouter();
  const [otp, setOtp] = useState("");
  const { start, finish } = useLoading();
  const { userProfile } = useAuthContext();
  const [callVerifyOtp, isLoading, verifyOtpError] = useHttpsCallable(
    functions,
    "auth-verify"
  );
  const [resendOtp, loadingResendOtp, resendOtpError] = useHttpsCallable(
    functions,
    "auth-signin"
  );

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
      }
    } catch (error) {
      console.log({ error });
    } finally {
      finish();
    }
  };

  const onResendOtp = async () => {
    if (loadingResendOtp) {
      start();
    }
    await resendOtp({ email: query?.email as string });
    setTimeout(() => {
      finish();
    }, 300);
  };

  useEffect(() => {
    if (userProfile) {
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
  }, [userProfile]);

  useEffect(() => {
    if (verifyOtpError) {
      setOtp("");
    }
  }, [verifyOtpError]);

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
          ((verifyOtpError as unknown as IHerosError)?.data?.statusCode ||
            (resendOtpError as unknown as IHerosError)?.data?.statusCode) ??
          ""
        }
        onSubmit={handleVerify}
        resendOtp={onResendOtp}
      />
    </Box>
  );
};

export default VerifyOtp;
