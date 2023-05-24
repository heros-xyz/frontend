import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { OnboardingProps } from "@/components/ui/OnboardingWrapper";
import { NextIcon } from "@/components/svg/NextIcon";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { RoutePath } from "@/utils/route";

const AthleteSuccessStep: React.FC<OnboardingProps> = (props) => {
  const router = useRouter();
  return (
    <HerosOnboardingWrapperNew
      // {...props}
      onSubmit={() => router.push(RoutePath.ATHLETE_CHECKLIST)}
      Icon={
        <FanOnboardingSuccess
          w={{ base: "90px", xl: "144px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "secondary" }}
        />
      }
      textButton="build up your story"
      IconButton={<NextIcon />}
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
          Account Set Up Successfully
        </Text>
        <Text
          w={"100%"}
          pt={4}
          pb={7.5}
          fontWeight={"normal"}
          fontSize={"md"}
          fontFamily="heading"
          color="grey.300"
        >
          Your account has been set up. Let&apos;s build up and share your
          amazing story to your fans.
        </Text>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default AthleteSuccessStep;
