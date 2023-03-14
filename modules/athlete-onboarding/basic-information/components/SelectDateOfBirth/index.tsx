import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { BirthdateFanOnBoarding } from "@/components/svg/BirthdateFanOnBoarding";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IValuesTypes } from "../../hooks";
interface IProp {
  onSubmit: () => void;
}

const SelectDateOfBirth: React.FC<IProp> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const { values, errors, handleSubmit, setFieldValue } =
    useFormikContext<IValuesTypes>();

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();

    if (!errors.dateOfBirth && values.dateOfBirth) {
      onSubmit();
    }
  };

  return (
    <FanOnboardingWrapper
      Icon={<BirthdateFanOnBoarding w="full" h="full" />}
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={submitForm}
      title="BASIC INFORMATION"
    >
      <Box mb={{ base: 4, lg: 20 }} color="black.ish">
        <Box fontSize={{ lg: "xl" }} fontWeight="500" mb={3}>
          Select Date of Birth
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <Flex
          fontSize={{ base: "sm", lg: "3xl" }}
          justifyContent="space-between"
          gap={{ base: 5, lg: 8 }}
        >
          <DateSelect
            onChange={(value) => setFieldValue("dateOfBirth", value)}
            date={values?.dateOfBirth}
            submitted={submitted}
          />
        </Flex>
        <ErrorMessage
          mt={0.5}
          condition={submitted && errors?.dateOfBirth}
          errorMessage={errors?.dateOfBirth}
        />
      </Box>
    </FanOnboardingWrapper>
  );
};

export default SelectDateOfBirth;