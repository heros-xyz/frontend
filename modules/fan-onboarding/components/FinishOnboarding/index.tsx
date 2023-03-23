import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";

const FinishOnboarding = () => {
  const router = useRouter();
  return (
    <HerosOnboardingWrapperNew
      Icon={
        <FanOnboardingSuccess
          w={{ base: "90px", xl: "144px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "secondary" }}
        />
      }
      textButton="Start Discovering"
      IconButton={<ArrowRight />}
      onSubmit={async () => {
        await fetch("/api/set-first-login");
        router.push("/fan");
      }}
      bgIconColor="secondary"
      isSuccessPage
    >
      <Box textAlign={{ base: "center", lg: "left" }} mb={5} color="primary">
        <Text
          fontFamily="heading"
          fontSize={{ base: "2xl", lg: "5xl" }}
          fontWeight="bold"
          mb={3}
          textTransform="capitalize"
        >
          Account set up Successfully
        </Text>
        <Text fontSize={{ base: "xs", xl: "md" }} color="grey.300">
          Your account has been set up successfully.
        </Text>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default FinishOnboarding;
