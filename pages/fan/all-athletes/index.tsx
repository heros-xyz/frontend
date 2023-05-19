import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import YourAthletesList from "@/components/ui/FanOfAthletes/List";
import FindHeros from "@/components/ui/FindHeros";
import FanDashboardLayout from "@/layouts/FanDashboard";

import { FAN_ROLE } from "@/utils/constants";
import { IAthleteSubscribed } from "@/types/athlete/types";
import { useUser } from "@/hooks/useUser";

const AllAthletes = () => {
  const { isFan, isAdmin } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteSubscribed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const [currentRecommendPage, setCurrentRecommendPage] = useState<number>(1);
  const [currentRecommendData, setCurrentRecommendData] = useState<
    IAthleteSubscribed[]
  >([]);
  const [hasNextRecommendPage, setHasNextRecommendPage] =
    useState<boolean>(false);
  const { data: listSubscribed, isSuccess } = {
    data: { data: [], meta: { hasNextPage: true, itemCount: 0 } },
    isSuccess: false,
  };

  const { data: listAthleteRecommended } = {
    data: { data: [], meta: { hasNextPage: true } },
  };

  useEffect(() => {
    setCurrentData([]);
  }, []);

  useEffect(() => {
    if (listAthleteRecommended) {
      setCurrentRecommendData((prev) => [
        ...prev,
        ...listAthleteRecommended.data,
      ]);
      setHasNextRecommendPage(listAthleteRecommended.meta.hasNextPage);
    }
  }, [listAthleteRecommended]);

  useEffect(() => {
    if (listSubscribed) {
      setCurrentData((prev) => [...prev, ...listSubscribed?.data]);
      setHasNextPage(listSubscribed.meta.hasNextPage);
    }
  }, [listSubscribed]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const onLoadMoreRecommend = () => {
    setCurrentRecommendPage(currentRecommendPage + 1);
  };
  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} |  My Athletes`}</title>
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
          My Athletes
        </Text>
        <YourAthletesList
          athleteList={currentData}
          athleteRecommendList={currentRecommendData}
          hasFanText={false}
          role={FAN_ROLE}
          isAdmin={isAdmin}
          dateFormat="DD/MM/YYYY"
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
          total={listSubscribed?.meta.itemCount ?? 0}
          onLoadMoreRecommend={onLoadMoreRecommend}
          hasNextRecommendPage={hasNextRecommendPage}
        />
      </Container>
    </Box>
  );
};

export default AllAthletes;

AllAthletes.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
