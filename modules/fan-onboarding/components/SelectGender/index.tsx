import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { GenderFanOnBoarding } from "@/components/svg/GenderFanOnBoarding";
import SelectGender from "@/components/ui/SelectGender";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
interface EnterGenderProps {
  onSubmit: (gender: string) => void;
  gender: string;
}

const EnterGender: React.FC<EnterGenderProps> = ({ gender, onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [genderValue, setgenderValue] = useState(gender);

  const handleSubmit = () => {
    setSubmitted(true);
    if (genderValue) {
      onSubmit(genderValue);
    }
  };

  return (
    <HerosOnboardingWrapperNew
      Icon={
        <GenderFanOnBoarding
          w={{ base: "80px", xl: "128px" }}
          h={{ base: "79px", xl: "127px" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={handleSubmit}
      bgIconColor="accent.2"
      display="flex"
      alignItems="center"
      isPaddingTop={false}
    >
      <Box mb={6} color="primary">
        <Box mb={3.5} fontSize={{ lg: "xl" }} fontWeight="bold">
          Select Gender
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <SelectGender
          value={genderValue}
          onChange={setgenderValue}
          errorMessage={
            !genderValue && submitted ? "This is a required field" : ""
          }
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default EnterGender;
