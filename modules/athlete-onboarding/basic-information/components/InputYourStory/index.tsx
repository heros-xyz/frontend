import { Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import TextareaAutoSize from "react-textarea-autosize";
import { YourStoryIcon } from "@/components/svg/YourStoryIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { colors } from "@/styles/themes/colors";
import { useDevice } from "@/hooks/useDevice";
import { IValuesTypes } from "../../hooks";

interface InputYourStoryProps {
  onSubmit?: () => void;
  submitLoading?: boolean;
}

const InputYourStory: React.FC<InputYourStoryProps> = ({
  onSubmit,
  submitLoading = false,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const { isDesktop } = useDevice();
  const { values, errors, handleSubmit, handleChange } =
    useFormikContext<IValuesTypes>();

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();

    if (!errors.story && values.story) {
      onSubmit && onSubmit();
    }
  };

  return (
    <HerosOnboardingWrapperNew
      Icon={
        <YourStoryIcon
          w={{ base: "90px", xl: "145px" }}
          h={{ base: "80px", xl: "128px" }}
          color={{ base: "#FFFAE8", xl: "accent.6" }}
        />
      }
      textButton="SUBMIT"
      onSubmit={submitForm}
      submitLoading={submitLoading}
      title="Personal Information"
      bgIconColor="accent.6"
    >
      <Box mb={{ base: 4, lg: 10 }} color="primary">
        <Box fontSize={{ base: "md", xl: "xl" }} fontWeight="bold" mb={1.5}>
          Tell Your Story (5000 characters max)
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <Text
          as="p"
          fontSize={{ base: "xs", xl: "md" }}
          mb={2}
          color="grey.300"
        >
          Tell your fans your amazing story. This is important as your fans are
          looking for the inspiration and the connection to invest in you.
          <br />
          Your story can include a <b>background</b>, your <b>life journey</b>,
          your <b>struggles & wins</b>, the <b>love for your sport</b> and what
          you want to <b>achieve</b>.
        </Text>
        <TextareaAutoSize
          id="story"
          name="story"
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
            borderColor: Boolean(errors.story && submitted)
              ? colors.error.dark
              : colors.grey[200],
          }}
          minRows={1}
          maxRows={4}
          value={values?.story}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={errors.story && submitted}
          errorMessage={errors.story}
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default InputYourStory;
