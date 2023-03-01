import { Box, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import { YourGoalIcon } from "@/components/svg/YourGoalIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
interface IProps {
  onSubmit: (value: object) => void;
}

const InputYourGoal: React.FC<IProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    goal: Yup.string()
      .max(500, "Your Goal cannot exceed 500 characters.")
      .required("This is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      goal: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <HerosOnboardingWrapper
      Icon={<YourGoalIcon w="full" h="full" />}
      textButton="Submit"
      title="SPORT PROFILE"
      onSubmit={formik.handleSubmit}
    >
      <Box mb={4}>
        <Box mb={2}>
          <Box>
            <Text as="span" fontWeight="600">
              Enter Your Goal (500 characters max)
            </Text>
            <Text as="span" color={"red"} ml={1}>
              *
            </Text>
          </Box>
          <Text fontSize={"xs"} mt={2}>
            Make sure you paint a compelling picture of how they can join you on
            this journey.
          </Text>
        </Box>
        <Input
          id="goal"
          variant={"flushed"}
          value={formik.values.goal}
          borderColor="primary"
          placeholder="Your Goal"
          onChange={formik.handleChange}
          isInvalid={Boolean(formik.errors.goal && formik.touched.goal)}
        />
        <ErrorMessage
          condition={formik.errors.goal && formik.touched.goal}
          errorMessage={formik.errors.goal}
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default InputYourGoal;
