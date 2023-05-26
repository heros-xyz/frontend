import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { db } from "@/libs/firebase";
import { AthleteProfile } from "@/libs/dtl/types";
import { collectionPath } from "@/libs/dtl/constant";

interface Props {
  athleteNickname: string;
}

const MembershipConfirmed = (props: Props) => {
  const { athleteNickname } = props;
  const router = useRouter();

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
          You are now a fan of <b>{athleteNickname ?? ""}</b>! Get started by
          exploring the benefits that come with your membership.
        </Text>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};
export default MembershipConfirmed;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const athleteProfileRef = doc(
    db,
    collectionPath.ATHLETE_PROFILE,
    id as string
  );
  const athleteProfileData = (
    await getDoc(athleteProfileRef)
  ).data() as AthleteProfile;

  return {
    props: {
      athleteNickname:
        athleteProfileData?.nickName ?? athleteProfileData.firstName,
    },
  };
}
