import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Session } from "next-auth";
import { deleteCookie } from "cookies-next";
import AuthTemplate from "@/components/ui/AuthTemplate";
import { usePreSignInWithEmailMutation } from "@/api/user";
import { wrapper } from "@/store";
import { loggedInGuard } from "@/middleware/loggedInGuard";

const SignIn = () => {
  const router = useRouter();
  const [signInWithEmail, { isLoading, error: signInWithEmailError }] =
    usePreSignInWithEmailMutation();
  const [, setLoginError] = useState<string | undefined>("");

  const callbackUrl = useMemo(() => {
    return router.query.callbackUrl ?? "/";
  }, [router.query]);

  const handleSignInWithEmail = async (email: string) => {
    try {
      await signInWithEmail({ email }).unwrap();
      router.push({
        pathname: "/verify-otp",
        query: { email, callbackUrl },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInFacebook = async () => {
    try {
      const res = await signIn("facebook", {
        callbackUrl: callbackUrl as string,
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
        callbackUrl: callbackUrl as string,
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
