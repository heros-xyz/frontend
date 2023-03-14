import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import FanAthleteInteraction from "@/modules/fan-dashboard/components/ViewAthleteInteraction";
const Interactions = () => {
  return (
    <Box bg="primary">
      <Head>
        <title>Fan | Interactions</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <FanAthleteInteraction />
      </Container>
    </Box>
  );
};

export default Interactions;

Interactions.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
