import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import FanDashboardLayout from "@/layouts/FanDashboard";
import FanAthleteInteraction from "@/modules/fan-dashboard/components/ViewAthleteInteraction";
const Interactions = () => {
  return (
    <Box bg="primary">
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
