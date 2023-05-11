import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { functions } from "@/libs/firebase";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { loggedInGuard } from "@/middleware/loggedInGuard";
import { wrapper } from "@/store";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";

const AthleteSignUp = () => {
  const [callSignup, loading, error] = useHttpsCallable(
    functions,
    "auth-signup"
  );
  const router = useRouter();
  const [signUpWithEmail, { isLoading, error: signUpWithEmailError }] =
    usePreSignInWithEmailMutation();
  const { start, finish } = useLoading();

  const handleSignUpWithEmail = async (email: string) => {
    try {
      const params = {
        email: email as string,
        profileType: "ATHLETE",
      };
      const res = await callSignup(params);
      console.log("Respuesta", res);

      router.push({
        pathname: "/verify-otp",
        query: { email },
      });
    } catch (error) {
      console.log(error);
    }
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
        isLoading={isLoading}
        authErrorMessage={
          (signUpWithEmailError as IHerosError)?.data?.message ?? ""
        }
        authErrorCode={(signUpWithEmailError as IHerosError)?.data?.statusCode}
        onSubmitForm={handleSignUpWithEmail}
        handleSignInFacebook={handleSignUpFacebook}
        handleSignInGoogle={handleSignUpGoogle}
      />
    </Box>
  );
};

export default AthleteSignUp;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    return loggedInGuard(context, (session: Session | null) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
