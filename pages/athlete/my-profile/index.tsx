import { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import AthleteProfile from "@/modules/athlete-profile";
import { store, wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { getRunningQueriesThunk, profile, useProfileQuery } from "@/api/user";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const MyProfile = () => {
  const { data: profile } = useProfileQuery("");
  return (
    <Box bg="white">
      <Head>
        <title>{`${profile?.nickname} | Profile | Heros`}</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <AthleteProfile />
      </Container>
    </Box>
  );
};

export default MyProfile;

MyProfile.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    store.dispatch(profile.initiate(""));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
