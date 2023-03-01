import { Box, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import ErrorMessage from "@/components/common/ErrorMessage";
interface IProps {
  onSubmit: (value: object) => void;
}

const InputCurrentTeam: React.FC<IProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    currentTeam: Yup.string()
      .max(100, "Current Team cannot exceed 100 characters.")
      .required("This is a required field."),
  });

  const formik = useFormik({
    initialValues: {
      currentTeam: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <HerosOnboardingWrapper
      Icon={<></>}
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="SPORT PROFILE"
      onSubmit={formik.handleSubmit}
    >
      <Box mb={4}>
        <Box mb={2}>
          <Text as="span" fontWeight="600">
            Enter your Current Team/ Association/ Club
          </Text>
        </Box>
        <Input
          id="currentTeam"
          variant={"flushed"}
          borderColor="primary"
          value={formik.values.currentTeam}
          placeholder="Current Team/ association/ Club"
          onChange={formik.handleChange}
          isInvalid={Boolean(
            formik.errors.currentTeam && formik.touched.currentTeam
          )}
        />
        <ErrorMessage
          condition={formik.errors.currentTeam && formik.touched.currentTeam}
          errorMessage={formik.errors.currentTeam}
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default InputCurrentTeam;
