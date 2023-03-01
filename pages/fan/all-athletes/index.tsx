import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import YourAthletesList from "@/components/ui/FanOfAthletes/List";
import FindHeros from "@/components/ui/FindHeros";
import { useGetListAthleteSubscribedQuery } from "@/api/fan";
import FanDashboardLayout from "@/layouts/FanDashboard";

const AllAthletes = () => {
  const { data: listAthleteSubscribed } = useGetListAthleteSubscribedQuery({});
  return (
    <Box bg="primary" minH="100vh">
      <Head>
        <title>Fan | All Subscribed Athletes </title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box position="relative" pt={1}>
          <FindHeros />
        </Box>

        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          color="white"
          fontWeight={700}
          mb={{ base: 5, xl: 6 }}
          mt={6}
        >
          Your Athletes
        </Text>
        <YourAthletesList
          athleteList={listAthleteSubscribed?.data || []}
          hasFanText={false}
          role="FAN"
          dateFormat="DD/MM/YYYY"
        />
      </Container>
    </Box>
  );
};

export default AllAthletes;

AllAthletes.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
