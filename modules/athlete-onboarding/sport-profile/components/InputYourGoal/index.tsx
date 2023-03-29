import { Box, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextareaAutoSize from "react-textarea-autosize";
import { YourGoalIcon } from "@/components/svg/YourGoalIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { colors } from "@/styles/themes/colors";
import { useDevice } from "@/hooks/useDevice";
interface IProps {
  goal: string;
  onSubmit: (value: object) => void;
  setStepValue: (value: object) => void;
}

const InputYourGoal: React.FC<IProps> = ({ goal, onSubmit, setStepValue }) => {
  const { isDesktop } = useDevice();
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
        <Box mb={{ base: 5, xl: 7 }}>
          <Box fontSize={{ base: "md", xl: "xl" }}>
            <Text as="span" fontWeight="bold" color="primary">
              Enter Your Goal (500 characters max)
            </Text>
            <Text as="span" color={"red"} ml={1}>
              *
            </Text>
          </Box>
          <Text fontSize={{ base: "xs", xl: "md" }} mt={2} color="grey.300">
            Your goal is an important connection to your fans. Make sure you
            paint a compelling picture.
            <br />
            They want to know <b>your goals</b> and how they will be on that{" "}
            <b>journey</b> with you. Where do you <b>want to get to</b>? What
            are the things you <b>need to overcome</b>? <b>How</b> will you get
            there? How important are <b>your fans</b>?
          </Text>
        </Box>
        <TextareaAutoSize
          id="goal"
          name="goal"
          className="postComment"
          placeholder="Tell Your Story"
          style={{
            resize: "none",
            width: "100%",
            borderBottom: `1px solid`,
            outline: "none",
            paddingTop: "10px",
            paddingLeft: 0,
            borderRadius: 0,
            fontWeight: 500,
            paddingBottom: "10px",
            fontSize: isDesktop ? "18px" : "14px",
            lineHeight: isDesktop ? "28px" : "22px",
            borderColor: Boolean(formik.errors.goal && formik.touched.goal)
              ? colors.error.dark
              : colors.grey[200],
          }}
          minRows={1}
          maxRows={4}
          value={formik.values.goal}
          onChange={(event) => {
            formik.handleChange(event);
            setStepValue({ goal: event.target.value });
          }}
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
