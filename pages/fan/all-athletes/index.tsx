import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useEffect, useMemo, useState } from "react";
import YourAthletesList from "@/components/ui/FanOfAthletes/List";
import FindHeros from "@/components/ui/FindHeros";
import FanDashboardLayout from "@/layouts/FanDashboard";

import { FAN_ROLE } from "@/utils/constants";
import { IAthleteSubscribed } from "@/types/athlete/types";
import { useUser } from "@/hooks/useUser";
import {
  useAthleteSubscribed,
  useGetListAthleteRecommended,
} from "@/libs/dtl/athleteProfile";
import { useGetMySubscriptions } from "@/libs/dtl/subscription";

const AllAthletes = () => {
  const { isFan, isAdmin } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteSubscribed[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentRecommendPage, setCurrentRecommendPage] = useState<number>(1);
  const [hasNextRecommendPage, setHasNextRecommendPage] =
    useState<boolean>(false);
  const { data: mySubscriptions, loading: loadingMySubscriptions } =
    useGetMySubscriptions();
  const { data: listSubscribed, loading: loadingSubscribed } =
    useAthleteSubscribed({ limitAmount: undefined });

  const { data: listRecommended } = useGetListAthleteRecommended({
    limitAmount: undefined,
  });

  useEffect(() => {
    setCurrentData([]);
  }, []);

  const listAthleteRecommended = useMemo(() => {
    const combined =
      listRecommended?.filter(
        (ath) => listSubscribed.find((sub) => sub.id === ath.id) === undefined
      ) ?? [];

    return combined.map((result) => {
      const currentSubscription = mySubscriptions?.find(
        (sub) => sub.maker === result?.id
      );

      return {
        ...result,
        createdAt: result?.createdAt?.toDate?.() ?? "",
        status: currentSubscription?.status as unknown as string,
        autoRenew: currentSubscription?.autoRenew ?? false,
        expiredDate: new Date(currentSubscription?.expiredDate ?? "") ?? "",
        sportName: result?.sport?.label ?? "",
      };
    });
  }, [listRecommended, listSubscribed, mySubscriptions]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const onLoadMoreRecommend = () => {
    setCurrentRecommendPage(currentRecommendPage + 1);
  };

  if (loadingMySubscriptions || loadingSubscribed) {
    return <></>;
  }

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
          athleteList={listSubscribed.map((item) => ({
            ...item,
            createdAt: item?.createdAt?.toDate() ?? "",
            athleteId: item.id,
          }))}
          athleteRecommendList={listAthleteRecommended.map((item) => ({
            ...item,
            athleteId: item.id,
          }))}
          hasFanText={false}
          role={FAN_ROLE}
          isAdmin={isAdmin}
          dateFormat="DD/MM/YYYY"
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
          total={listSubscribed?.length ?? 0}
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
