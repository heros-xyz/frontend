import { Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import { YourStoryIcon } from "@/components/svg/YourStoryIcon";
import ErrorMessage from "@/components/common/ErrorMessage";
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
    <FanOnboardingWrapper
      Icon={<YourStoryIcon w="full" h="full" />}
      textButton="SUBMIT"
      onSubmit={submitForm}
      title="BASIC INFORMATION"
    >
      <Box mb={{ base: 4, lg: 10 }} color="black.ish">
        <Box fontSize={{ lg: "xl" }} fontWeight="500" mb={1.5}>
          Tell Your Story (500 characters max)
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <Text as="p" fontSize="xs" mb={2}>
          Tell a compelling story of yourself to inspire potential fans.
        </Text>
        <Input
          variant="flushed"
          placeholder="Tell Your Story"
          borderColor="primary"
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
    </FanOnboardingWrapper>
  );
};

export default InputYourStory;
