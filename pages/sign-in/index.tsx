import { Url } from "url";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Session } from "next-auth";
import { deleteCookie } from "cookies-next";
import { useUnmount } from "react-use";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { wrapper } from "@/store";
import { loggedInGuard } from "@/middleware/loggedInGuard";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";
import { auth, functions, signInWithPopupGoogle } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const router = useRouter();
  const [signInWithEmail, { isLoading, error: signInWithEmailError }] =
    usePreSignInWithEmailMutation();
  const [, setLoginError] = useState<string | undefined>("");
  const { start, finish } = useLoading();
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] =
    useSignInWithFacebook(auth);
  const [executeCallable, loading, error] = useHttpsCallable(
    functions,
    "auth-signup"
  );

  const callbackUrl = useMemo(() => {
    return router.query.callbackUrl ?? "/";
  }, [router.query]);

  const handleSignInWithEmail = async (email: string) => {
    try {
      // TODO: call OTP function
      //await signInWithEmail({ email }).unwrap();
      const res = await executeCallable({ email });
      console.log("Function called", res);
      router.push({
        pathname: "/verify-otp",
        query: { email, callbackUrl },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInFacebook = async () => {
    start();
    try {
      await signInWithFacebook();
    } catch (error) {
      finish();
      console.log("next auth google error", error);
    }
  };

  const handleSignInGoogle = async () => {
    if (loadingGoogle) {
      start();
    }
    try {
      console.log("signInWithGoogle()");

      await signInWithGoogle();

      if (userGoogle) {
        // If first time should go to onboarding
        console.log("userGoogle", userGoogle?.user);
        router.push(RoutePath?.FAN);
        finish();
      }
    } catch (error) {
      console.log("ERROR", error);
      finish();
    }
  };

  useEffect(() => {
    fetch("/api/remove-first-login");
  }, []);

  useUnmount(() => {
    finish();
  });

  return (
    <Box>
      <Head>
        <title>Heros | Sign In</title>
        <meta property="og:title" content="Welcome to Heros" key="title" />
        <meta
          property="description"
          content="We are a membership club of athletes and fans committed to inspiring and investing in each other"
          key="description"
        />
        <meta
          property="image"
          content="https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
          key="image"
        />
        <meta
          property="og:image"
          content="https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
          key="image"
        />
        <meta property="og:type" content="website" key="type" />
      </Head>
      <AuthTemplate
        pageType="signin"
        isLoading={isLoading}
        authErrorMessage={
          (signInWithEmailError as IHerosError)?.data?.message ?? ""
        }
        authErrorCode={(signInWithEmailError as IHerosError)?.data?.statusCode}
        onSubmitForm={handleSignInWithEmail}
        handleSignInFacebook={handleSignInFacebook}
        handleSignInGoogle={handleSignInGoogle}
      />
    </Box>
  );
};

export default SignIn;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    deleteCookie("role", { req: context.req, res: context.res, path: "/" });
    return loggedInGuard(context, (session: Session | null) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);


