import { Box, Container, Image, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { setToken } from "@/libs/axiosInstance";
import AthleteFanSettings from "@/components/ui/Settings";
import { useProfileQuery } from "@/api/user";
import { useLoading } from "@/hooks/useLoading";
import { $http } from "@/libs/http";
import { getImageLink } from "@/utils/link";

const MyProfile = () => {
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
      finish();
      router.push("/");
      setToken(undefined);
    } catch (error) {
      finish();
    }
  };

  return (
    <Box bg="primary" minH="100vh">
      <Head>
        <title>Fan | My Profile</title>
      </Head>
      <Box
        bg={{ base: "acccent.4", lg: "none" }}
        py={{ base: 2.5, lg: 4 }}
        mb={5}
        pt={{ base: 4, lg: 12 }}
      >
        <Container
          size={["base", "sm", "md", "lg", "500px"]}
          bg="acccent.4"
          py={{ lg: 6 }}
          borderRadius={{ lg: "12px" }}
        >
          <Box px={{ lg: 6 }} display="flex" alignItems="center">
            <Image
              w={{ base: "60px", lg: "80px" }}
              h={{ base: "60px", lg: "80px" }}
              src={getImageLink(session?.user.avatar)}
              alt="user-avatar"
              objectFit="cover"
              rounded="full"
              mr={3}
              fallbackSrc="https://via.placeholder.com/50"
            />
            <Text fontWeight={700} flex={1}>
              {session?.user.firstName} {session?.user.lastName}
            </Text>
          </Box>
        </Container>
      </Box>

      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <AthleteFanSettings
          email={session?.user.email ?? ""}
          isLoginWithFacebook={profile?.signInMethod === "FACEBOOK"}
          isLoginWithGoogle={profile?.signInMethod === "GOOGLE"}
          name={`${session?.user.firstName} ${session?.user.lastName}`}
          type="FAN"
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