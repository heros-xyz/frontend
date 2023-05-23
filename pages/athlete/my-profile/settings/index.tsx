import { Box, Container, Text } from "@chakra-ui/react";
import { ReactElement, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AthleteFanSettings from "@/components/ui/Settings";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useLoading } from "@/hooks/useLoading";
import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/libs/firebase";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";

const Settings = () => {
  const { user } = useAuthContext();
  const { data } = useMyAthleteProfile();
  const { start, finish } = useLoading();
  const router = useRouter();

  const onSignOut = useCallback(async () => {
    try {
      start();
      await auth.signOut();
      router.reload();
    } catch (error) {
      console.error(error.message);
    } finally {
      finish();
    }
  }, [user]);

  return (
    <Box bg="white" pt={5} minH="100vh">
      <Head>
        <title>Athlete | Settings</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "xl", lg: "2xl" }}
          mb={8}
          mt={8}
          color="primary"
        >
          Settings
        </Text>
        <AthleteFanSettings
          email={user?.email ?? ""}
          isLoginWithFacebook={user?.providerId === "facebook.com"}
          isLoginWithGoogle={user?.providerId === "google.com"}
          name={data?.nickName ?? ""}
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
