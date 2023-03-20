import { Box, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FullNameFanOnBoardingIcon } from "@/components/svg/FullNameFanOnBoarding";
import { ArrowRight } from "@/components/svg/ArrowRight";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import ErrorMessage from "@/components/common/ErrorMessage";
import { isValidString } from "@/utils/functions";

interface initialValues {
  firstName: string;
  lastName: string;
}
interface IProp {
  onSubmit: (values: initialValues) => void;
  initialValues: initialValues;
}

const EnterFullName: React.FC<IProp> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(20, "First name cannot exceeds 20 characters")
      .test(
        "invalid-firstname",
        "First name is not allowing special character",
        (value: string | undefined) => {
          if (value) {
            return isValidString(value);
          }
          return false;
        }
      )
      .required("This is a required field"),
    lastName: Yup.string()
      .max(20, "Last name cannot exceeds 20 characters")
      .test(
        "invalid-lastname",
        "Last name is not allowing special character",
        (value: string | undefined) => {
          if (value) {
            return isValidString(value);
          }
          return false;
        }
      )
      .required("This is a required field"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <FanOnboardingWrapper
      Icon={
        <FullNameFanOnBoardingIcon
          w={{ base: "150px", xl: "240px" }}
          h={{ base: "150px", xl: "240px" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={formik.handleSubmit}
    >
      <Box color="black.ish">
        <Box mb={{ base: 5, lg: 8 }}>
          <Box mb={2.5} fontSize={{ lg: "xl" }} fontWeight="500">
            Enter Your Full Name
            <Text as="span" color="error.dark">
              {" "}
              *
            </Text>
          </Box>
          <Box
            fontWeight="normal"
            color={{ lg: "grey.300" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            Let’s your favorite athletes know who is following and supporting
            them. Your full name will be shown to the public.
          </Box>
        </Box>
        <Box mb={4}>
          <Box mb={{ base: 5, lg: 8 }}>
            <Input
              id="firstName"
              variant="flushed"
              placeholder="First name"
              fontSize={{ base: "sm", lg: "3xl" }}
              value={formik.values?.firstName}
              onChange={formik.handleChange}
              isInvalid={Boolean(
                formik.errors.firstName && formik.touched.firstName
              )}
            />
            <ErrorMessage
              condition={formik.errors.firstName && formik.touched.firstName}
              errorMessage={formik.errors.firstName}
            />
          </Box>

          <Box>
            <Input
              id="lastName"
              variant="flushed"
              placeholder="Last name"
              fontSize={{ base: "sm", lg: "3xl" }}
              value={formik.values?.lastName}
              onChange={formik.handleChange}
              isInvalid={Boolean(
                formik.errors.lastName && formik.touched.lastName
              )}
            />
            <ErrorMessage
              condition={formik.errors.lastName && formik.touched.lastName}
              errorMessage={formik.errors.lastName}
            />
          </Box>
        </Box>
      </Box>
    </FanOnboardingWrapper>
  );
};

export default EnterFullName;
