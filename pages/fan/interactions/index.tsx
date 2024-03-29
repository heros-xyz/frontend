import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import FanAthleteInteraction from "@/modules/fan-dashboard/components/ViewAthleteInteraction";
import { useUser } from "@/hooks/useUser";

const Interactions = () => {
  const { isFan } = useUser();
  return (
    <Box bg="white">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | Interactions`}</title>
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
