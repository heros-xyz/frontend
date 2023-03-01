import { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import AthleteProfile from "@/modules/athlete-profile";

const MyProfile = () => {
  return (
    <Box bg="primary">
      <Head>
        <title>Athlete | My Profile</title>
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
