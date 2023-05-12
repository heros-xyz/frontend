import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { signInWithCustomToken } from "firebase/auth";
import { httpsCallable } from "@firebase/functions";
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>(undefined)

  const handleVerify = async (otp: string) => {
    setLoading(true)
    console.log(query)
    debugger
    httpsCallable(functions, 'auth-verify')({otp, email: query.email})
      .then(({data}) => signInWithCustomToken(auth, data as string))
      .catch((error) => setError(error.message))
      .finally(()=>setLoading(false))
  };

  const resendOtp = () => httpsCallable(functions, 'auth-signin')({email: query.email})
    .then(({data}) => signInWithCustomToken(auth, data as string))
    .catch((error) => setError(error.message))
    .finally(()=>setLoading(false))

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
        isLoading={loading}
        otpValue={otp}
        errorMessage={error}
        onSubmit={handleVerify}
        resendOtp={resendOtp}
      />
    </Box>
  );
};

export default VerifyOtp;
