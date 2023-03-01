import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import OnboardingWrapper, {
  NextButton,
  OnboardingProps,
} from "@/components/ui/OnboardingWrapper";
import { NextIcon } from "@/components/svg/NextIcon";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";

const AthleteSuccessStep: React.FC<OnboardingProps> = (props) => {
  const router = useRouter();
  return (
    <OnboardingWrapper
      {...props}
      onNextStep={() => router.push("/athlete")}
      Icon={<FanOnboardingSuccess w="full" h="full" />}
      textButton="build up your story"
      IconButton={<NextIcon />}
    >
      <Box textAlign={{ base: "center", xl: "left" }} w={"100%"}>
        <Text
          fontSize={"4xl"}
          fontWeight={"800"}
          lineHeight="50.4px"
          fontFamily="heading"
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
        >
          Your account has been set up. Let’s build up and share your amazing
          story to your fans.
        </Text>
      </Box>
    </OnboardingWrapper>
  );
};

export default AthleteSuccessStep;
