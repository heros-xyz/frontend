import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useEffect, useState, useMemo } from "react";
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
  const [today] = useState(new Date());
  const { userProfile } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>(undefined)

  const diffCount = useMemo(() => {
    if (typeof query.time !== "string") return 0;

    const diff = (+query.time - new Date().getTime()) / 1000;
    return diff <= 0 ? 0 : +diff.toFixed();
  }, [query.time, today]);

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
      <If condition={!!query.time}>
        <Then>
          <OtpFill
            description="An OTP code is being sent to your registered email. Please enter the code here."
            title="OTP Verification"
            textButton="verify"
            isLoading={loading}
            otpValue={otp}
            diffCount={diffCount}
            errorMessage={error}
            onSubmit={handleVerify}
            resendOtp={resendOtp}
          />
        </Then>
      </If>
    </Box>
  );
};

export default VerifyOtp;
