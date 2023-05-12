import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { httpsCallable } from "@firebase/functions";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { functions } from "@/libs/firebase";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";

const FanSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>(undefined)
  const router = useRouter();
  const { start, finish } = useLoading();

  const handleSignUpWithEmail = async (email: string) => {
      setLoading(true)
      const params = {
        email: email as string,
        profileType: "FAN",
      };
      debugger
      httpsCallable(functions, 'auth-signup')(params)
        .then(() =>
          router.push({
            pathname: "/verify-otp",
            query: { email },
          })
        )
        .catch((error) => {
          setError(error.message)
        }).finally(()=>{
          setLoading(false)
        })
  };

  const handleSignUpFacebook = async () => {
    setLoading(true)
    try {
      await fetch("/api/set-role?role=FAN");
      await signIn("facebook", {
        callbackUrl: "/",
      });
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("next facebook google error", error);
    }
  };

  const handleSignUpGoogle = async () => {
    setLoading(true)
    try {
      await fetch("/api/set-role?role=FAN");
      await signIn("google", {
        callbackUrl: "/",
      });
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("next auth google error", error);
    }
  };

  return (
    <Box>
      <Head>
        <title>Fan | Sign Up</title>
      </Head>
      <AuthTemplate
        pageType="fan"
        authErrorMessage={error}
        authErrorCode={0}
        isLoading={loading}
        onSubmitForm={handleSignUpWithEmail}
        handleSignInFacebook={handleSignUpFacebook}
        handleSignInGoogle={handleSignUpGoogle}
      />
    </Box>
  );
};

export default FanSignUp;
