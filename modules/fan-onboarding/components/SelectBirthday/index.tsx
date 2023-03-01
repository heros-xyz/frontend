import { Box, Flex, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { BirthdateFanOnBoarding } from "@/components/svg/BirthdateFanOnBoarding";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import { isValidDate } from "@/utils/functions";

interface initialValues {
  dateOfBirth: string;
}
interface IProp {
  onSubmit: (values: string) => void;
  initialValues: initialValues;
}

const EnterBirthday: React.FC<IProp> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    dateOfBirth: Yup.string()
      .required("This is a required field")
      .test("valid-date", "Please select valid date", (value) => {
        return isValidDate(value);
      }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.dateOfBirth);
    },
  });

  return (
    <FanOnboardingWrapper
      Icon={<BirthdateFanOnBoarding w="full" h="full" />}
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={formik.handleSubmit}
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
            date={initialValues?.dateOfBirth}
            onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
            submitted={!!formik.submitCount}
            zIndex={20}
          />
        </Flex>
        <ErrorMessage
          mt={0.5}
          condition={Boolean(formik.submitCount && formik.errors?.dateOfBirth)}
          errorMessage={formik.errors?.dateOfBirth}
        />
      </Box>
    </FanOnboardingWrapper>
  );
};

export default EnterBirthday;
