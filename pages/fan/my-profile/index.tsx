import { Box, Container, Image, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { setToken } from "@/libs/axiosInstance";
import AthleteFanSettings from "@/components/ui/Settings";
import { profile, useProfileQuery, useSignOutMutation } from "@/api/user";
import { useLoading } from "@/hooks/useLoading";
import { $http } from "@/libs/http";
import { getImageLink } from "@/utils/link";
import { useAppSelector, wrapper } from "@/store";
import { IGuards } from "@/types/globals/types";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { setTokenToStore } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";

const MyProfile = () => {
  const { isFan } = useUser();
  const { data: user } = useProfileQuery("");
  const { start, finish } = useLoading();
  const [userSignOut] = useSignOutMutation();
  const refreshToken = useAppSelector((state) => state.appState.refreshToken);
  const router = useRouter();

  const onSignOut = async () => {
    try {
      start();

      await Promise.all([
        userSignOut({ refreshToken }).unwrap(),
        signOut({
          redirect: false,
        }),
        $http({
          baseURL: "",
          url: `/api/remove-authorization`,
        }),
      ]);

      router.push("/").then(finish);
      setToken(undefined);
    } catch (error) {
      finish();
    }
  };

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
              src={getImageLink(user?.avatar)}
              alt="user-avatar"
              objectFit="cover"
              rounded="full"
              mr={3}
              fallbackSrc="/images/DefaultAvaCircle.png"
            />
            <Text fontWeight={700} flex={1} color="grey.0">
              {user?.firstName} {user?.lastName}
            </Text>
          </Box>
        </Container>
      </Box>

      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <AthleteFanSettings
          email={user?.email ?? ""}
          isLoginWithFacebook={user?.signInMethod === "FACEBOOK"}
          isLoginWithGoogle={user?.signInMethod === "GOOGLE"}
          name={`${user?.firstName} ${user?.lastName}`}
          type={user?.role ?? undefined}
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
  (store) => (context) => {
    setTokenToStore(store, context);
    store.dispatch(profile.initiate(""));

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
