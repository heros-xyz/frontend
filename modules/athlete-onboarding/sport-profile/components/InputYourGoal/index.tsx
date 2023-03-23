import { Box, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { YourGoalIcon } from "@/components/svg/YourGoalIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
interface IProps {
  goal: string;
  onSubmit: (value: object) => void;
  setStepValue: (value: object) => void;
}

const InputYourGoal: React.FC<IProps> = ({ goal, onSubmit, setStepValue }) => {
  const validationSchema = Yup.object().shape({
    goal: Yup.string()
      .max(500, "Your Goal cannot exceed 500 characters.")
      .required("This is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      goal,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <HerosOnboardingWrapperNew
      Icon={
        <YourGoalIcon
          w="full"
          h="full"
          color={{ base: "accent.6", xl: "white" }}
        />
      }
      textButton="Submit"
      title="Sport profile"
      onSubmit={formik.handleSubmit}
      bgIconColor="accent.6"
    >
      <Box mb={4}>
        <Box mb={2}>
          <Box>
            <Text as="span" fontWeight="bold" color="primary">
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
          borderColor="grey.200"
          placeholder="Your Goal"
          onChange={(event) => {
            formik.handleChange(event);
            setStepValue({ goal: event.target.value });
          }}
          isInvalid={Boolean(formik.errors.goal && formik.touched.goal)}
        />
        <ErrorMessage
          condition={formik.errors.goal && formik.touched.goal}
          errorMessage={formik.errors.goal}
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default InputYourGoal;
