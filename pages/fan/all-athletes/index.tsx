import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useEffect, useMemo, useState } from "react";
import YourAthletesList from "@/components/ui/FanOfAthletes/List";
import FindHeros from "@/components/ui/FindHeros";
import { useGetListAthleteSubscribedQuery } from "@/api/fan";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import { IAthleteSubscribed } from "@/types/athlete/types";

const AllAthletes = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteSubscribed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const { data: listSubscribed } = useGetListAthleteSubscribedQuery({
    page: currentPage,
    take: 10,
  });

  const listSubscribedFormat = useMemo(() => {
    if (currentData) {
      return currentData.map((item) => {
        return {
          avatar: item.avatar,
          fullName: item.nickName,
          createdAt: item.createdAt,
          id: item.athleteId,
        };
      });
    }

    return [];
  }, [currentData]);

  useEffect(() => {
    if (listSubscribed) {
      setCurrentData((prev) => [...prev, ...listSubscribed?.data]);
      setHasNextPage(listSubscribed.meta.hasNextPage);
    }
  }, [listSubscribed]);
  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

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
          athleteList={listSubscribedFormat}
          hasFanText={false}
          role="FAN"
          dateFormat="DD/MM/YYYY"
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
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
