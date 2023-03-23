import { Box, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
interface IProps {
  currentTeam: string;
  setStepValue: (value: object) => void;
  onSubmit: (value: object) => void;
}

const InputCurrentTeam: React.FC<IProps> = ({
  currentTeam,
  onSubmit,
  setStepValue,
}) => {
  const validationSchema = Yup.object().shape({
    currentTeam: Yup.string().max(
      100,
      "Current Team cannot exceed 100 characters."
    ),
  });

  const formik = useFormik({
    initialValues: {
      currentTeam,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <HerosOnboardingWrapperNew
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="Sport profile"
      onSubmit={formik.handleSubmit}
    >
      <Box mb={4} mt={{ base: 20, xl: 0 }}>
        <Box mb={2}>
          <Text
            as="span"
            fontWeight="bold"
            fontSize={{ base: "md", xl: "xl" }}
            color="primary"
          >
            Enter your Current Team/ Association/ Club
          </Text>
        </Box>
        <Input
          id="currentTeam"
          variant={"flushed"}
          borderColor="grey.200"
          value={formik.values.currentTeam}
          placeholder="Current Team/ association/ Club"
          onChange={(event) => {
            formik.handleChange(event);
            setStepValue({ currentTeam: event.target.value });
          }}
          isInvalid={Boolean(
            formik.errors.currentTeam && formik.touched.currentTeam
          )}
        />
        <ErrorMessage
          condition={formik.errors.currentTeam && formik.touched.currentTeam}
          errorMessage={formik.errors.currentTeam}
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default InputCurrentTeam;
