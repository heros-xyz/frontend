import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { functions } from "@/libs/firebase";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { wrapper } from "@/store";
import { loggedInGuard } from "@/middleware/loggedInGuard";
import { IHerosError } from "@/types/globals/types";
import { useLoading } from "@/hooks/useLoading";

const FanSignUp = () => {
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
        profileType: "FAN",
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
      await fetch("/api/set-role?role=FAN");
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
      await fetch("/api/set-role?role=FAN");
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
        <title>Fan | Sign Up</title>
      </Head>
      <AuthTemplate
        pageType="fan"
        authErrorMessage={
          (signUpWithEmailError as IHerosError)?.data?.message ?? ""
        }
        authErrorCode={(signUpWithEmailError as IHerosError)?.data?.statusCode}
        isLoading={isLoading}
        onSubmitForm={handleSignUpWithEmail}
        handleSignInFacebook={handleSignUpFacebook}
        handleSignInGoogle={handleSignUpGoogle}
      />
    </Box>
  );
};

export default FanSignUp;

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
