import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import OnboardingWrapper, {
  OnboardingProps,
} from "@/components/ui/OnboardingWrapper";
import { NextIcon } from "@/components/svg/NextIcon";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";

const AthleteUpdatedSuccessfully: React.FC<OnboardingProps> = (props) => {
  const router = useRouter();
  return (
    <OnboardingWrapper
      {...props}
      onNextStep={() => router.push("/athlete/checklist")}
      Icon={<FanOnboardingSuccess w="full" h="full" />}
      textButton="GO TO CHECKLIST"
      IconButton={<NextIcon />}
    >
      <Box textAlign={{ base: "center", xl: "left" }} w={"100%"}>
        <Text
          fontSize={{ base: "4xl", lg: "48px" }}
          fontWeight={"800"}
          lineHeight="50.4px"
          fontFamily="heading"
        >
          Updated Successfully
        </Text>
        <Text
          w={"100%"}
          pt={4}
          pb={7.5}
          fontWeight={"normal"}
          fontSize={"md"}
          fontFamily="heading"
        >
          Your changes have been successfully saved.
        </Text>
      </Box>
    </OnboardingWrapper>
  );
};

export default AthleteUpdatedSuccessfully;
