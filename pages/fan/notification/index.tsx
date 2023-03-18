import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import NotificationFan from "@/components/ui/Fan/Notification";
import FindHeros from "@/components/ui/FindHeros";

const FanNotification = () => {
  return (
    <Box bg="white" minHeight="100vh">
      <Head>
        <title>Fan | Notifications</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <FindHeros />
      </Container>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <NotificationFan />
      </Container>
    </Box>
  );
};

export default FanNotification;

FanNotification.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
