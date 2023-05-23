import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useUnmount } from "react-use";

import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { httpsCallable } from "@firebase/functions";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";
import { auth, functions } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";
import { useAuthContext } from "@/context/AuthContext";
import { convertTimeUnit } from "@/utils/time";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userProfile) return;
    if (userProfile.uid) {
      if (userProfile.profileType === "FAN") {
        router.push(RoutePath.FAN);
      } else if (userProfile.profileType === "ATHLETE") {
        router.push(RoutePath.ATHLETE);
      } else {
        router.push(RoutePath.JOINING_AS);
      }
    }
  }, [userProfile]);

  const callbackUrl = useMemo(() => {
    return router.query.callbackUrl ?? "/";
  }, [router.query]);

  const handleSignInWithEmail = async (email: string) => {
    setLoading(true);
    const time = convertTimeUnit("5min");
    httpsCallable(
      functions,
      "auth-signin"
    )({ email })
      .then(() =>
        router.push({
          pathname: "/verify-otp",
          query: { email, time },
        })
      )
      .catch((error) => {
        const data = {
          data: error,
        };
        setSignInWithEmailError(data);
      })
      .finally(() => {
        setLoading(false);
      });
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
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      console.log("ERROR", error);
      finish();
    }
  };

  useEffect(() => {
    if (authContextLoading === true) {
      start();
    } else {
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
        isLoading={loading}
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
