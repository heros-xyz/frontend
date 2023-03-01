import { Box, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useState } from "react";
import { ArrowRight } from "@/components/svg/ArrowRight";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import SelectGender from "@/components/ui/SelectGender";
import { GenderFanOnBoarding } from "@/components/svg/GenderFanOnBoarding";
import { IValuesTypes } from "../../hooks";
interface IProp {
  onSubmit: () => void;
}

const AthleteSelectGender: React.FC<IProp> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const { values, errors, handleSubmit, setFieldValue } =
    useFormikContext<IValuesTypes>();

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();

    if (!errors.gender && values.gender) {
      onSubmit();
    }
  };

  return (
    <FanOnboardingWrapper
      Icon={<GenderFanOnBoarding w="full" h="full" />}
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={submitForm}
      title="BASIC INFORMATION"
    >
      <Box mb={{ base: 2, lg: 4 }} color="black.ish">
        <Box fontSize={{ lg: "xl" }} fontWeight="600" mb={4}>
          Select Gender
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <SelectGender
          value={values?.gender}
          onChange={(value) => setFieldValue("gender", value)}
          errorMessage={
            errors.gender && submitted ? "This is a required field" : ""
          }
        />
      </Box>
    </FanOnboardingWrapper>
  );
};

export default AthleteSelectGender;
