import { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import AthleteProfile from "@/modules/athlete-profile";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";

const MyProfile = () => {
  const { data } = useMyAthleteProfile();
  return (
    <Box bg="white">
      <Head>
        <title>{`${data?.nickName ?? ""} | Profile | Heros`}</title>
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

