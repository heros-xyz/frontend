import { Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import { YourStoryIcon } from "@/components/svg/YourStoryIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { IValuesTypes } from "../../hooks";

interface InputYourStoryProps {
  onSubmit?: () => void;
}

const InputYourStory: React.FC<InputYourStoryProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
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
      title="Basic information"
      bgIconColor="accent.6"
    >
      <Box mb={{ base: 4, lg: 10 }} color="primary">
        <Box fontSize={{ lg: "xl" }} fontWeight="bold" mb={1.5}>
          Tell Your Story (500 characters max)
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <Text as="p" fontSize="xs" mb={2} color="grey.300">
          Tell a compelling story of yourself to inspire potential fans.
        </Text>
        <Input
          variant="flushed"
          placeholder="Tell Your Story"
          borderColor="grey.200"
          name="story"
          fontSize={{ base: "sm" }}
          isInvalid={Boolean(errors.story && submitted)}
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
