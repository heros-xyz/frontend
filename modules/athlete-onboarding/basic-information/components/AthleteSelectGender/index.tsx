import { Box, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useState } from "react";
import { ArrowRight } from "@/components/svg/ArrowRight";
import SelectGender from "@/components/ui/SelectGender";
import { GenderFanOnBoarding } from "@/components/svg/GenderFanOnBoarding";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
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
    <HerosOnboardingWrapperNew
      Icon={
        <GenderFanOnBoarding
          w={{ base: "80px", xl: "128px" }}
          h={{ base: "79px", xl: "127px" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={submitForm}
      title="Basic information"
      bgIconColor="accent.2"
    >
      <Box mb={{ base: 2, lg: 4 }} color="primary">
        <Box fontSize={{ lg: "xl" }} fontWeight="bold" mb={4}>
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
    </HerosOnboardingWrapperNew>
  );
};

export default AthleteSelectGender;
