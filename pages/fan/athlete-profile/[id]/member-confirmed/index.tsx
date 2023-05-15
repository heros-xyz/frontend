import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import { useGetBasicInformationQuery } from "@/api/athlete";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { wrapper } from "@/store";

import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import { setTokenToStore } from "@/utils/auth";

const MembershipConfirmed = () => {
  const router = useRouter();
  const { data: dataAthlete } = useGetBasicInformationQuery(
    router.query.id as string,
    {
      skip: typeof router.query.id !== "string",
    }
  );
  return (
    <HerosOnboardingWrapperNew
      onSubmit={() => router.push(`/fan/athlete-profile/${router.query.id}`)}
      Icon={
        <FanOnboardingSuccess
          w={{ base: "90px", xl: "144px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "secondary" }}
        />
      }
      textButton="BACK TO ATHLETE PROFILE"
      bgIconColor="secondary"
      isSuccessPage
    >
      <Box textAlign={{ base: "center", xl: "left" }} w={"100%"}>
        <Text
          fontSize={{ base: "xl", xl: "4xl" }}
          fontWeight={"800"}
          lineHeight="50.4px"
          fontFamily="heading"
          color="primary"
        >
          Membership Confirmed
        </Text>
        <Text
          w={"100%"}
          pt={2}
          pb={7.5}
          fontWeight={500}
          fontSize={"md"}
          fontFamily="heading"
          color="grey.300"
        >
          You are now a fan of <b>{dataAthlete?.nickName ?? ""}</b>! Get started
          by exploring the benefits that come with your membership.
        </Text>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default MembershipConfirmed;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => (context) => {
    setTokenToStore(store, context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
