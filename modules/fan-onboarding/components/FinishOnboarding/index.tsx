import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";

const FinishOnboarding = () => {
  const router = useRouter();
  return (
    <FanOnboardingWrapper
      Icon={
        <FanOnboardingSuccess
          w={{ base: "150px", xl: "240px" }}
          h={{ base: "150px", xl: "240px" }}
        />
      }
      textButton="Start Discovering"
      obBg="white"
      IconButton={<ArrowRight />}
      onSubmit={async () => {
        await fetch("/api/set-first-login");
        router.push("/fan");
      }}
    >
      <Box textAlign={{ base: "center", lg: "left" }} mb={5}>
        <Text
          fontFamily="heading"
          fontSize={{ base: "2xl", lg: "5xl" }}
          fontWeight="bold"
          mb={3}
          textTransform="capitalize"
        >
          Account set up Successfully
        </Text>
        <Text fontSize={{ base: "xs" }} color={{ lg: "grey.300" }}>
          Your account has been set up successfully.
        </Text>
      </Box>
    </FanOnboardingWrapper>
  );
};

export default FinishOnboarding;
