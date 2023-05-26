import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { httpsCallable } from "@firebase/functions";
import { useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { auth, db, functions } from "@/libs/firebase";
import { useLoading } from "@/hooks/useLoading";
import { convertTimeUnit } from "@/utils/time";
import { ATHLETE_ROLE } from "@/utils/constants";
import { RoutePath } from "@/utils/route";
import { User } from "@/libs/dtl";

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
      await signInWithRedirect(auth, new FacebookAuthProvider());
      finish();
    } catch (error) {
      finish();
      console.log("next facebook google error", error);
    }
  };

  const handleSignUpGoogle = async () => {
    start();
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
      finish();
    } catch (error) {
      finish();
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
              profileType: ATHLETE_ROLE,
            });
            await router.push(RoutePath.ATHLETE_SETUP_ACCOUNT);
            return;
          }

          if (!user?.isFinishOnboarding) {
            await router.push(RoutePath.ATHLETE_CHECKLIST);
            return;
          }

          if (!!user?.isFinishOnboarding && !user?.isFinishSetupAccount) {
            await router.push(RoutePath.ATHLETE_SETUP_ACCOUNT);
            return;
          }

          await router.push(RoutePath.ATHLETE);
        }
      })
      .catch(console.error);
  }, [auth]);

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
