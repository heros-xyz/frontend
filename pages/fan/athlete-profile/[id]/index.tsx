import React, { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { IGuards } from "@/types/globals/types";
import {
  getAthleteProfile,
  getPaymentInfo,
  getRunningQueriesThunk,
  useGetAthleteProfileQuery,
} from "@/api/fan";
import { getValidateIsFan } from "@/api/athlete";
import { fanAuthGuard } from "@/middleware/fanGuard";

const AthleteProfile = () => {
  const { query } = useRouter();

  const { data: athleteProfile } = useGetAthleteProfileQuery(
    query.id as string,
    {
      skip: typeof query.id !== "string",
    }
  );

  return (
    <Box bg="white" pb={6}>
      <Head>
        <title>{`${athleteProfile?.nickName} | Athlete | Heros`}</title>
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
      store.dispatch(getValidateIsFan.initiate(athleteId));
      store.dispatch(getPaymentInfo.initiate(""));
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
