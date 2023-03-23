import { Box, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FullNameFanOnBoardingIcon } from "@/components/svg/FullNameFanOnBoarding";
import { ArrowRight } from "@/components/svg/ArrowRight";
import ErrorMessage from "@/components/common/ErrorMessage";
import { isValidString } from "@/utils/functions";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";

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
        "This field contains text only",
        (value: string | undefined) => {
          if (value) {
            return isValidString(value);
          }
          return true;
        }
      )
      .required("This is a required field"),
    lastName: Yup.string()
      .max(20, "Last name cannot exceeds 20 characters")
      .test(
        "invalid-lastname",
        "This field contains text only",
        (value: string | undefined) => {
          if (value) {
            return isValidString(value);
          }
          return true;
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
    <HerosOnboardingWrapperNew
      Icon={
        <FullNameFanOnBoardingIcon
          w={{ base: "72px", xl: "115px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "#E2FF65" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={formik.handleSubmit}
      bgIconColor="#E2FF65"
    >
      <Box color="primary">
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
            color="grey.300"
            fontSize={{ base: "xs", lg: "md" }}
          >
            Let&apos;s your favorite athletes know who is following and
            supporting them. Your full name will be shown to the public.
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
              borderColor="grey.200"
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
              borderColor="grey.200"
            />
            <ErrorMessage
              condition={formik.errors.lastName && formik.touched.lastName}
              errorMessage={formik.errors.lastName}
            />
          </Box>
        </Box>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default EnterFullName;
