import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { GenderFanOnBoarding } from "@/components/svg/GenderFanOnBoarding";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import SelectGender from "@/components/ui/SelectGender";
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
    <FanOnboardingWrapper
      Icon={<GenderFanOnBoarding w="full" h="full" />}
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={handleSubmit}
    >
      <Box mb={6} color="black.ish">
        <Box mb={3.5} fontSize={{ lg: "xl" }} fontWeight="500">
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
    </FanOnboardingWrapper>
  );
};

export default EnterGender;
