import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import OtpFill from "@/components/ui/OtpFill";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/api/user";
import { IToken } from "@/types/users/types";
import { useLoading } from "@/hooks/useLoading";

const VerifyOtp = () => {
  const { query, replace } = useRouter();
  const [otp, setOtp] = useState("");
  const { start, finish } = useLoading();
  const [verifyOtp, { data: verifyOtpData, error: verifyOtpError, isLoading }] =
    useVerifyOtpMutation();
  const [resendOtp, { error: resendOtpError }] = useResendOtpMutation();

  const callbackUrl = useMemo(() => {
    if (typeof query.callbackUrl === "string") return query.callbackUrl ?? "/";

    return "/";
  }, [query]);

  const handleVerify = (otp: string) => {
    setOtp(otp);
    verifyOtp({
      email: query.email as string,
      otp: +otp,
    });
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
    start();
    await resendOtp(query.email as string).unwrap();
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
        description="We’ve emailed an OTP to you. Please enter the code here."
        title="OTP Verification"
        textButton="verify"
        validTime={5}
        isLoading={isLoading}
        otpValue={otp}
        errorMessage={
          (verifyOtpError as any)?.data?.statusCode ||
          (resendOtpError as any)?.data?.statusCode
        }
        onSubmit={handleVerify}
        resendOtp={onResendOtp}
      />
    </Box>
  );
};

export default VerifyOtp;
