import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, useUpdateEffect } from "@chakra-ui/react";
import Head from "next/head";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { $http } from "@/libs/http";

const SignIn = () => {
  const router = useRouter();
  const [signInWithEmail, { isLoading, error: signInWithEmailError }] =
    usePreSignInWithEmailMutation();
  const [, setLoginError] = useState<string | undefined>("");
  const { data: session } = useSession();

  const handleSignInWithEmail = async (email: string) => {
    try {
      await signInWithEmail({ email }).unwrap();
      router.push({
        pathname: "/verify-otp",
        query: { email },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInFacebook = async () => {
    try {
      const res = await signIn("facebook", {
        callbackUrl: process.env.HEROS_BASE_URL,
      });

      if (!res?.ok) {
        setLoginError(res?.error);
      }
    } catch (error) {
      console.log("next auth google error", error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: "/",
      });

      if (!res?.ok) {
        setLoginError(res?.error);
      }
    } catch (error) {
      console.log("next auth google error", error);
    }
  };

  useEffect(() => {
    fetch("/api/remove-first-login");
  }, []);

  useUpdateEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Box>
      <Head>
        <title>Sign In</title>
      </Head>
      <AuthTemplate
        pageType="signin"
        isLoading={isLoading}
        authErrorMessage={(signInWithEmailError as any)?.data?.message ?? ""}
        authErrorCode={(signInWithEmailError as any)?.data?.statusCode ?? ""}
        onSubmitForm={handleSignInWithEmail}
        handleSignInFacebook={handleSignInFacebook}
        handleSignInGoogle={handleSignInGoogle}
      />
    </Box>
  );
};

export default SignIn;
