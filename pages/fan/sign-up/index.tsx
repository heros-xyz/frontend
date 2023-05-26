import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpsCallable } from "@firebase/functions";
import {
  FacebookAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { auth, db, functions } from "@/libs/firebase";
import { convertTimeUnit } from "@/utils/time";
import { RoutePath } from "@/utils/route";
import { User } from "@/libs/dtl";
import { FAN_ROLE } from "@/utils/constants";

const FanSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSignUpWithEmail = async (email: string) => {
    setLoading(true);
    const params = {
      email: email as string,
      profileType: "FAN",
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
    setLoading(true);
    try {
      await signInWithRedirect(auth, new FacebookAuthProvider());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("next facebook google error", error);
    }
  };

  const handleSignUpGoogle = async () => {
    setLoading(true);
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("next auth google error", error);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (credential) => {
        if (credential?.user.uid) {
          const ref = doc(db, `user/${credential?.user?.uid}`);
          const user = (await getDoc(ref)).data() as User;
          if (!user?.profileType) {
            // first time
            await updateDoc(ref, {
              profileType: FAN_ROLE,
            });
            await router.push(RoutePath.FAN_ONBOARDING);
            return;
          }
          if (!user?.isFinishOnboarding) {
            await router.push(RoutePath.FAN_ONBOARDING);
          } else {
            await router.push(RoutePath.FAN);
          }
        }
      })
      .catch(console.error);
  }, [auth]);

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
