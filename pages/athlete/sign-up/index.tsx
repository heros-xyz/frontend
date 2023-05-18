import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { httpsCallable } from "@firebase/functions";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { functions } from "@/libs/firebase";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";
import { convertTimeUnit } from "@/utils/time";
import { useState } from "react";

const AthleteSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();
  const { start, finish } = useLoading();

  const handleSignUpWithEmail = async (email: string) => {
    setLoading(true);
    const params = {
      email: email as string,
      profileType: "ATHLETE",
    };
    httpsCallable(
      functions,
      "auth-signup"
    )(params)
      .then(() => {
        const time = convertTimeUnit("5min");
        return router.push({
          pathname: "/verify-otp",
          query: { email, time },
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUpFacebook = async () => {
    start();
    try {
      await fetch("/api/set-role?role=ATHLETE");
      await signIn("facebook", {
        callbackUrl: "/",
      });
      finish();
    } catch (error) {
      finish();
      console.log("next facebook google error", error);
    }
  };

  const handleSignUpGoogle = async () => {
    start();
    try {
      await fetch("/api/set-role?role=ATHLETE");
      await signIn("google", {
        callbackUrl: "/",
      });
      finish();
    } catch (error) {
      finish();
      console.log("next auth google error", error);
    }
  };

  return (
    <Box>
      <Head>
        <title>Athlete | Sign Up</title>
      </Head>
      <AuthTemplate
        pageType="athlete"
        isLoading={loading}
        authErrorMessage={error}
        authErrorCode={0}
        onSubmitForm={handleSignUpWithEmail}
        handleSignInFacebook={handleSignUpFacebook}
        handleSignInGoogle={handleSignUpGoogle}
      />
    </Box>
  );
};

export default AthleteSignUp;
