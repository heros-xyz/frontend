import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";

const EditAccountInfo = () => {
  return (
    <Box bg="primary" color="white" pt={5} minH="100vh">
      <Head>
        <title>Fan | Edit Profile</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        Edit Account Info
      </Container>
    </Box>
  );
};

export default EditAccountInfo;

EditAccountInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
