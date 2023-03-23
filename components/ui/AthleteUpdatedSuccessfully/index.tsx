import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { OnboardingProps } from "@/components/ui/OnboardingWrapper";
import { NextIcon } from "@/components/svg/NextIcon";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import HerosOnboardingWrapperNew from "../HerosOnboardingWrapperNew";

const AthleteUpdatedSuccessfully: React.FC<OnboardingProps> = (props) => {
  const router = useRouter();
  return (
    <HerosOnboardingWrapperNew
      {...props}
      onSubmit={() => router.push("/athlete/checklist")}
      Icon={
        <FanOnboardingSuccess
          w={{ base: "90px", xl: "144px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "secondary" }}
        />
      }
      textButton="GO TO CHECKLIST"
      IconButton={<NextIcon />}
      bgIconColor="secondary"
      title={props.title ?? "Basic information"}
      isSuccessPage
    >
      <Box textAlign={{ base: "center", xl: "left" }} w={"100%"}>
        <Text
          fontSize={{ base: "xl", lg: "4xl" }}
          fontWeight={"800"}
          lineHeight="50.4px"
          fontFamily="heading"
          color="primary"
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
          color="grey.300"
        >
          Your changes have been successfully saved.
        </Text>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default AthleteUpdatedSuccessfully;
