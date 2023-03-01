import React, { ReactElement, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/authGuard";
import { IGuards } from "@/types/globals/types";
import {
  getAthleteProfile,
  getRunningQueriesThunk,
  resetApiState,
  useGetAthleteProfileQuery,
} from "@/api/fan";

const AthleteProfile = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { data: athleteProfile } = useGetAthleteProfileQuery(
    query.id as string,
    {
      skip: typeof query.id !== "string",
    }
  );

  useEffect(() => {
    return () => {
      dispatch(resetApiState());
    };
  }, []);

  return (
    <Box bg="primary" pb={6}>
      <Head>
        <title>{athleteProfile?.fullName}</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <ViewAthleteProfile athleteProfile={athleteProfile} />
      </Container>
    </Box>
  );
};

export default AthleteProfile;

AthleteProfile.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setContext(context);
    const athleteId = context.params?.id;

    if (typeof athleteId === "string") {
      store.dispatch(getAthleteProfile.initiate(athleteId));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
