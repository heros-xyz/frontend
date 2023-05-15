import {
  Box,
  Container,
  Text,
  Grid,
  Flex,
  Link,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Membership from "@/components/ui/Membership";
import Wallet from "@/components/ui/Wallet";
import JustForYou from "@/components/ui/JustForYou";
import AthleteOverview from "@/components/ui/AthleteOverview";
import { Setting } from "@/components/svg/Setting";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { formatMoney, formatNumber } from "@/utils/functions";

import { useAuthContext } from "@/context/AuthContext";
import { RoutePath } from "@/utils/route";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";

const AthleteDashboard = () => {
  const router = useRouter();
  const { userProfile: user } = useAuthContext();
  const { data: totalSubData, isLoading: isGettingTotalSub } = {
    data: null,
    isLoading: false,
  };
  const { data: grossMoneyData } = { data: null };
  const { data: membershipData, isLoading: isGettingMembership } = {
    data: null,
    isLoading: false,
  };

  const { data: profile, isLoading: isGettingNetMoney } = {
    data: null,
    isLoading: false,
  };
  const { athleteProfile: sportProfile } = useGetAthleteProfile();

  const onClickManage = () => {
    router.push("/athlete/membership/listing");
  };

  const onAddTier = () => {
    router.push("/athlete/membership/add");
  };
  const onWithDrawMoney = () => {
    router.push("/athlete/withdraw-money");
  };

  useEffect(() => {
    if (!!user && !user?.isFinishOnboarding) {
      router.push(RoutePath.ATHLETE_CHECKLIST);
    }
  }, [user]);

  return (
    <Box bg="white" pt={6} minH="100vh">
      <Head>
        <title>{`${sportProfile?.nickName} | Home Page | Heros`}</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Grid gridGap={["5", "4"]}>
          <Flex
            color={"primary"}
            alignContent={"flex-start"}
            justifyContent={"space-between"}
            pb={["2", "4"]}
          >
            <Image
              w="64px"
              h="64px"
              rounded="full"
              src={user?.avatar}
              alt="user-avatar"
              objectFit="cover"
            />
            <Box flex={"1"} alignSelf={"center"} pl={"5"}>
              <Text fontWeight={"bold"}>{sportProfile?.nickName}</Text>
              <Text>{sportProfile?.sport?.label || ""}</Text>
            </Box>
            <Link
              as={NextLink}
              href="/athlete/my-profile/settings"
              height="fit-content"
            >
              <Setting w={["5", "6"]} h={["5", "6"]} color="primary" />
            </Link>
          </Flex>
          <AthleteOverview
            fans={formatNumber(totalSubData?.total ?? 0)}
            money={formatMoney(grossMoneyData?.total ?? 0)}
            isLoading={isGettingTotalSub}
          />
          <Membership
            title={"Membership"}
            isMembership={membershipData?.data?.length ? true : false}
            buttonContent={"add tier"}
            tier={membershipData?.data?.length ? 1 : 0}
            onClickManage={onClickManage}
            onAddTier={onAddTier}
            isLoading={isGettingMembership}
          />
          <Wallet
            title={"Wallet"}
            currentMoney={profile?.netAmount ?? 0}
            feePrice={5}
            timeReceive={""}
            havePaymentMethod={true}
            buttonContent={"withdraw money"}
            onWithDrawMoney={onWithDrawMoney}
            isLoading={isGettingNetMoney}
          />
        </Grid>
        <JustForYou
          href="/athlete/interactions"
          showCreateFirstInteraction={!profile?.hasFirstInteraction}
          showCreateInteractionRecent={!profile?.hasCreateInteractionRecent}
        />
      </Container>
    </Box>
  );
};

export default AthleteDashboard;

AthleteDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
*/
