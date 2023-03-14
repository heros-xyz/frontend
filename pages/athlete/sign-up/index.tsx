import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { loggedInGuard } from "@/middleware/loggedInGuard";
import { wrapper } from "@/store";

const AthleteSignUp = () => {
  const router = useRouter();
  const [signUpWithEmail, { isLoading, error: signUpWithEmailError }] =
    usePreSignInWithEmailMutation();

  const handleSignUpWithEmail = async (email: string) => {
    try {
      await signUpWithEmail({
        email,
        role: "ATHLETE",
      }).unwrap();

      router.push({
        pathname: "/verify-otp",
        query: { email },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpFacebook = async () => {
    try {
      await fetch("/api/set-role?role=ATHLETE");
      await signIn("facebook", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("next facebook google error", error);
    }
  };

  const handleSignUpGoogle = async () => {
    try {
      await fetch("/api/set-role?role=ATHLETE");
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
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
        authErrorMessage={(signUpWithEmailError as any)?.data?.message ?? ""}
        authErrorCode={(signUpWithEmailError as any)?.data?.statusCode ?? ""}
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