import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useMemo } from "react";
import YourAthletesList from "@/components/ui/FanOfAthletes/List";
import FindHeros from "@/components/ui/FindHeros";
import { useGetListAthleteSubscribedQuery } from "@/api/fan";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";

const AllAthletes = () => {
  const { data: listAthleteSubscribed } = useGetListAthleteSubscribedQuery({
    page: 1,
    take: 50,
  });

  const listAthleteSubscribedFormat = useMemo(() => {
    if (listAthleteSubscribed) {
      return listAthleteSubscribed.data.map((item) => {
        return {
          avatar: item.avatar,
          fullName: item.nickName,
          createdAt: item.createdAt,
          id: item.athleteId,
        };
      });
    }

    return [];
  }, [listAthleteSubscribed]);
  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Fan | All Subscribed Athletes </title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box position="relative" pt={1}>
          <FindHeros />
        </Box>

        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          color="primary"
          fontWeight={700}
          mb={{ base: 5, xl: 6 }}
          mt={6}
        >
          Your Athletes
        </Text>
        <YourAthletesList
          athleteList={listAthleteSubscribedFormat}
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
