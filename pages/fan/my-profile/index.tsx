import { Box, Container, Image, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";
import AthleteFanSettings from "@/components/ui/Settings";
import { useAuthContext } from "@/context/AuthContext";
import { useLoading } from "@/hooks/useLoading";
import { useUser } from "@/hooks/useUser";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { auth } from "@/libs/firebase";

const MyProfile = () => {
  const { isFan } = useUser();
  const { user, userProfile } = useAuthContext();
  const { start, finish } = useLoading();
  const router = useRouter();

  const onSignOut = useCallback(async () => {
    try {
      start();
      await auth.signOut()
      router.reload()
      finish();
    } catch (error) {
      finish();
    }
  }, [user]);

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | My Profile`}</title>
      </Head>
      <Box
        bg={{
          base: "linear-gradient(137.89deg, #1E16C1 15.14%, #298ADA 49.2%, #33EFEF 88.63%)",
          lg: "none",
        }}
        py={{ base: 2.5, lg: 4 }}
        mb={5}
        pt={{ base: 4, lg: 12 }}
      >
        <Container
          size={["base", "sm", "md", "lg", "500px"]}
          bg={
            "linear-gradient(137.89deg, #1E16C1 15.14%, #298ADA 49.2%, #33EFEF 88.63%)"
          }
          py={{ lg: 6 }}
          borderRadius={{ lg: "12px" }}
        >
          <Box px={{ lg: 6 }} display="flex" alignItems="center">
            <Image
              w={{ base: "60px", lg: "80px" }}
              h={{ base: "60px", lg: "80px" }}
              src={userProfile?.avatar}
              alt="user-avatar"
              objectFit="cover"
              rounded="full"
              mr={3}
              fallbackSrc="/images/DefaultAvaCircle.png"
            />
            <Text fontWeight={700} flex={1} color="grey.0">
              {userProfile?.firstName} {userProfile?.lastName}
            </Text>
          </Box>
        </Container>
      </Box>

      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <AthleteFanSettings
          email={userProfile?.email ?? ""}
          isLoginWithFacebook={user?.providerId === "facebook.com"}
          isLoginWithGoogle={user?.providerId === "google.com"}
          name={`${userProfile?.firstName} ${userProfile?.lastName}`}
          type={userProfile?.profileType ?? undefined}
          onSignOut={onSignOut}
        />
      </Container>
    </Box>
  );
};
export default MyProfile;

MyProfile.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
