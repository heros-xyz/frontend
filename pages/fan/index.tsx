import { Box, Center, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useCallback, useState } from "react";
import { useGetLatestInteractionQuery } from "@/api/fan";
import FanInteractions from "@/components/ui/FanLatestInteractions";
import FindHeros from "@/components/ui/FindHeros";
import { useUser } from "@/hooks/useUser";
import FanDashboardLayout from "@/layouts/FanDashboard";
import MyAthletes from "@/modules/fan-dashboard/components/MyAthletes";
import { useAuthContext } from "@/context/AuthContext";

const FanDashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const { userProfile } = useAuthContext();
  const { isFan } = useUser();
  const { isFirstLogin } = userProfile ?? {};

  const onChange = useCallback((el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
  }, []);

  const { data: latestInteraction, isLoading } = useGetLatestInteractionQuery({
    page: 1,
    take: 3,
  });


  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | Homepage`}</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box position="relative">
          <FindHeros value={searchValue} onChange={onChange} />
        </Box>
      </Container>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Center
          h="160px"
          bg="linear-gradient(137.89deg, #1E16C1 15.14%, #298ADA 49.2%, #33EFEF 88.63%)"
          color="primary"
          mt={{ xl: 8 }}
          mb={{ xl: 4 }}
          borderRadius={{ lg: "12px" }}
        >
          <Text
            fontSize="xl"
            color="white"
            fontFamily="heading"
            fontWeight={700}
          >
            {isFirstLogin ? "Hello, heros" : "Welcome back, heros"}
          </Text>
        </Center>
      </Container>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box py={5} mb={{ xl: 3 }}>
          <MyAthletes />
        </Box>
        <FanInteractions
          isLoading={isLoading}
          titleHeading="Latest Interactions"
          items={latestInteraction?.data ?? []}
          actionText="View All"
        />
      </Container>
    </Box>
  );
};

export default FanDashboard;

FanDashboard.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
