import { Box, Container, Image, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { setContext, setToken } from "@/libs/axiosInstance";
import AthleteFanSettings from "@/components/ui/Settings";
import { useProfileQuery } from "@/api/user";
import { useLoading } from "@/hooks/useLoading";
import { $http } from "@/libs/http";
import { getImageLink } from "@/utils/link";
import { wrapper } from "@/store";
import { IGuards } from "@/types/globals/types";
import { fanAuthGuard } from "@/middleware/fanGuard";

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
    <Box bg="white" minH="100vh">
      <Head>
        <title>Fan | My Profile</title>
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
              src={getImageLink(session?.user.avatar)}
              alt="user-avatar"
              objectFit="cover"
              rounded="full"
              mr={3}
              fallbackSrc="https://via.placeholder.com/50"
            />
            <Text fontWeight={700} flex={1} color="white">
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
