import { Box, Container, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AthleteFanSettings from "@/components/ui/Settings";
import { setToken } from "@/libs/axiosInstance";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useLoading } from "@/hooks/useLoading";
import { $http } from "@/libs/http";
import { useProfileQuery } from "@/api/user";

const Settings = () => {
  const { data: session } = useSession();
  const { data: profile } = useProfileQuery("");
  const { start, finish } = useLoading();
  const router = useRouter();

  const onSignOut = async () => {
    try {
      start();
      // await $http({
      //   method: "POST",
      //   baseURL: "",
      //   url: `/api/auth/sign-out`,
      // });
      await Promise.all([
        signOut({
          redirect: false,
        }),
        $http({
          baseURL: "",
          url: `/api/remove-authorization`,
        }),
      ]);
      router.push("/");
      finish();
      setToken(undefined);
    } catch (error) {
      finish();
    }
  };

  return (
    <Box bg="primary" pt={5} minH="100vh">
      <Head>
        <title>Athlete | Settings</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "xl", lg: "2xl" }}
          mb={8}
          mt={8}
          color="white"
        >
          Settings
        </Text>
        <AthleteFanSettings
          email={session?.user.email ?? ""}
          isLoginWithFacebook={profile?.signInMethod === "FACEBOOK"}
          isLoginWithGoogle={profile?.signInMethod === "GOOGLE"}
          name={`${session?.user.firstName} ${session?.user.lastName}`}
          type="ATHLETE"
          onSignOut={onSignOut}
        />
      </Container>
    </Box>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
