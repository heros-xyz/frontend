import React, { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { useAthleteProfile, useGetAthleteProfileByUid } from "@/libs/dtl/athleteProfile";

const AthleteProfile = () => {
  const { query } = useRouter();
  const athleteProfile = useAthleteProfile(
    query.id as string
  );

  if (athleteProfile.loading || !athleteProfile.data) {
    return <></>;
  }

  return (
    <Box bg="white" pb={6}>
      <Head>
        <title>{`${athleteProfile.data.nickName} | Athlete | Heros`}</title>
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

