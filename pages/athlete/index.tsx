import {
  Box,
  Container,
  Text,
  Grid,
  Avatar,
  Flex,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { setContext } from "@/libs/axiosInstance";
import { wrapper } from "@/store";
import Membership from "@/components/ui/Membership";
import Wallet from "@/components/ui/Wallet";
import JustForYou from "@/components/ui/JustForYou";
import AthleteOverview from "@/components/ui/AthleteOverview";
import { Setting } from "@/components/svg/Setting";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { formatMoney, formatNumber } from "@/utils/functions";

import {
  useGetGrossAmountMoneyQuery,
  useGetMembershipListQuery,
  useGetTotalSubscriptionQuery,
} from "@/api/athlete";
import { useProfileQuery } from "@/api/user";

const AthleteDashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: totalSubData, isLoading: isGettingTotalSub } =
    useGetTotalSubscriptionQuery("");
  const { data: grossMoneyData } = useGetGrossAmountMoneyQuery("");
  const { data: membershipData, isLoading: isGettingMembership } =
    useGetMembershipListQuery({
      userId: session?.user?.id,
    });
  const { data: profile, isLoading: isGettingNetMoney } = useProfileQuery("");

  const onClickManage = () => {
    router.push("/athlete/membership/listing");
  };

  const onAddTier = () => {
    router.push("/athlete/membership/add");
  };
  const onWithDrawMoney = () => {
    router.push("/athlete/withdraw-money");
  };

  return (
    <Box bg="primary" pt={6} minH="100vh">
      <Head>
        <title>Athlete | Homepage</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Grid gridGap={["5", "4"]}>
          <Flex
            color={"white"}
            alignContent={"flex-start"}
            justifyContent={"space-between"}
            pb={["2", "4"]}
          >
            <Avatar size={"lg"} src={session?.user?.avatar} />
            <Box flex={"1"} alignSelf={"center"} pl={"5"}>
              <Text fontWeight={"bold"}>
                {session?.user?.lastName} {session?.user?.firstName}
              </Text>
              <Text> Cricket </Text>
            </Box>
            <Link
              as={NextLink}
              href="/athlete/my-profile/settings"
              height="fit-content"
            >
              <Setting w={["5", "6"]} h={["5", "6"]} />
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
            currentMoney={profile?.netAmount}
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
