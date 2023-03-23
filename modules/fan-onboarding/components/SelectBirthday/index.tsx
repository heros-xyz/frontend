import { Box, Flex, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import { BirthdateFanOnBoarding } from "@/components/svg/BirthdateFanOnBoarding";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import { isValidDate } from "@/utils/functions";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";

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
      .test("valid-date", "Invalid date", (value) => {
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
    <HerosOnboardingWrapperNew
      Icon={
        <BirthdateFanOnBoarding
          w={{ base: "67px", xl: "107px" }}
          h={{ base: "80px", xl: "128px" }}
          color={{ base: "#FFFAE8", xl: "accent.4" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={formik.handleSubmit}
      bgIconColor="accent.4"
      display="flex"
      alignItems="center"
      isPaddingTop={false}
    >
      <Box mb={{ base: 4, lg: 20 }} color="primary">
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
            isDarkTheme
          />
        </Flex>
        <ErrorMessage
          mt={0.5}
          condition={Boolean(formik.submitCount && formik.errors?.dateOfBirth)}
          errorMessage={formik.errors?.dateOfBirth}
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default EnterBirthday;
