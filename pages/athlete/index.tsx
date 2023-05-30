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
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Membership from "@/components/ui/Membership";
import Wallet from "@/components/ui/Wallet";
import JustForYou from "@/components/ui/JustForYou";
import AthleteOverview from "@/components/ui/AthleteOverview";
import { Setting } from "@/components/svg/Setting";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { formatMoney, formatNumber } from "@/utils/functions";
import { RoutePath } from "@/utils/route";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";
import { useMembershipTiersAsMaker } from "@/libs/dtl/membershipTiers";
import { useGetGrossMoney } from "@/libs/dtl/subscription";
import { getHasRecentPosts, useMyUserProfile } from "@/libs/dtl";

const AthleteDashboard = () => {
  const router = useRouter();
  const myUserProfile = useMyUserProfile();
  const [recentActivity, setRecentActivity] = useState({
    hasFirstInteraction: false,
    hasCreateInteractionRecent: false,
    loadingRecentActivity: true,
  });
  const { data: grossMoneyData } = useGetGrossMoney();
  const { data: membershipData, loading: isGettingMembership } =
    useMembershipTiersAsMaker();
  const { data: sportProfile } = useMyAthleteProfile();

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
    if (
      !myUserProfile.loading &&
      !myUserProfile.data?.isFinishOnboarding &&
      !!myUserProfile.data?.isFinishSetupAccount
    ) {
      router.push(RoutePath.ATHLETE_CHECKLIST);
    }
  }, [myUserProfile]);

  useEffect(() => {
    (async () => {
      if (
        myUserProfile.data?.profileType === "ATHLETE" &&
        !!myUserProfile.data?.uid
      ) {
        const recentPosts = await getHasRecentPosts(myUserProfile.data?.uid);
        setRecentActivity({
          ...recentPosts,
          loadingRecentActivity: false,
        });
      }
    })();
  }, [myUserProfile, setRecentActivity]);

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
              src={myUserProfile.data?.avatar}
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
            fans={formatNumber(sportProfile?.totalSubCount ?? 0)}
            money={formatMoney(grossMoneyData?.total ?? 0)}
            isLoading={myUserProfile?.loading}
          />
          <Membership
            title={"Membership"}
            isMembership={membershipData?.length ? true : false}
            buttonContent={"add tier"}
            tier={membershipData?.length ? 1 : 0}
            onClickManage={onClickManage}
            onAddTier={onAddTier}
            isLoading={isGettingMembership}
          />
          <Wallet
            title={"Wallet"}
            currentMoney={
              !myUserProfile.data?.netAmount ||
              isNaN(myUserProfile.data?.netAmount)
                ? 0
                : Number(myUserProfile.data?.netAmount) / 100 ?? 0
            }
            feePrice={5}
            timeReceive={""}
            havePaymentMethod={true}
            buttonContent={"withdraw money"}
            onWithDrawMoney={onWithDrawMoney}
            isLoading={myUserProfile.loading ?? false}
          />
        </Grid>
        {!recentActivity?.loadingRecentActivity && (
          <JustForYou
            href="/athlete/interactions"
            showCreateFirstInteraction={!recentActivity?.hasFirstInteraction}
            showCreateInteractionRecent={
              !recentActivity?.hasCreateInteractionRecent
            }
          />
        )}
      </Container>
    </Box>
  );
};

export default AthleteDashboard;

AthleteDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
