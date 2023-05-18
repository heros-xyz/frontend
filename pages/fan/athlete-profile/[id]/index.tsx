import React, { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { useGetAthleteProfileByUid } from "@/libs/dtl/athleteProfile";

const AthleteProfile = () => {
  const { query } = useRouter();
  const { data: athleteProfile, loading } = useGetAthleteProfileByUid(
    query.id as string
  );

  if (loading || !athleteProfile) {
    return <></>;
  }

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

