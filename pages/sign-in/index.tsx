import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useUnmount } from "react-use";

import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";
import { auth, db, functions } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";
import { useAuthContext } from "@/context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const { start, finish, finishLoading, startLoading } = useLoading();
  const { user, userProfile, loading: authContextLoading } = useAuthContext();
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] =
    useSignInWithFacebook(auth);
  const [signInWithEmailError, setSignInWithEmailError] =
    useState<IHerosError>();
  const [callSignin, isLoading, error] = useHttpsCallable(
    functions,
    "auth-signin"
  );

  useEffect(() => {
    if (!!userProfile?.uid && !!user?.uid) {
      if (userProfile?.profileType === "FAN") {
        router.push(RoutePath.FAN);
      }
      if (userProfile?.profileType === "ATHLETE") {
        router.push(RoutePath.ATHLETE);
      }
    }
    if (!!user) {
      router.push(RoutePath.JOINING_AS);
    }
  }, [user, userProfile]);

  const callbackUrl = useMemo(() => {
    return router.query.callbackUrl ?? "/";
  }, [router.query]);

  const handleSignInWithEmail = async (email: string) => {
    try {
      const result = await callSignin({ email });
      console.log({ error, result });
      router.push({
        pathname: "/verify-otp",
        query: { email, callbackUrl },
      });
    } catch (error) {
      console.log(error);
      setSignInWithEmailError({
        data: error?.message,
      });
    }
  };

  const handleSignInFacebook = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log("next auth google error", error);
    }
  };

  const handleSignInGoogle = async () => {
    if (loadingGoogle) {
      start();
    }
    try {
      console.log("signInWithGoogle()");
      await signInWithRedirect(auth, new GoogleAuthProvider());
      console.log({ signInWithEmailError });
    } catch (error) {
      console.log("ERROR", error);
      finish();
    }
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (credential) => {
        console.log("credential", credential);
        if (credential?.user.uid) {
          const user = (
            await getDoc(doc(db, `user/${credential?.user.uid}`))
          ).data();
          if (!user || !user?.profileType) {
            router.push(RoutePath.JOINING_AS);
          }
        }
      })
      .catch(console.error);
  }, [auth]);

  useEffect(() => {
    if (authContextLoading === true) {
      console.log("empezar loading");
      start();
    } else {
      console.log("cortar loading");
      finish();
    }
  }, [authContextLoading]);

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
          (signInWithEmailError as IHerosError)?.data.message ?? ""
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
