import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import ErrorMessage from "@/components/common/ErrorMessage";
import { PageInformation } from "@/components/svg";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
interface TagLineProps {
  onSubmit: (value: string) => void;
  value: string;
}

const TagLine: FC<TagLineProps> = ({ value, onSubmit }) => {
  const [tag, setTag] = useState(value);
  return (
    <HerosOnboardingWrapper
      Icon={<PageInformation w="full" h="full" />}
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="PAGE INFORMATION"
      onSubmit={() => {
        tag.length <= 100 && onSubmit(tag);
      }}
    >
      <Box mb={4}>
        <Text as="p" fontWeight="medium" fontSize="base" mb={2.5}>
          Write A Tagline (100 characters max)
        </Text>
        <Text as="p" fontSize="xs" fontWeight="normal" mb={5}>
          You can add your favorite line or anything that define you or your
          personality. It will be shown below your Nickname.
        </Text>
        <Input
          value={tag}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTag(e.target.value)
          }
          variant="flushed"
          fontSize={{ base: "sm" }}
          borderColor="primary"
          placeholder="Tagline"
          maxLength={101}
        />
        <ErrorMessage
          condition={tag.length > 100}
          errorMessage="Tagline cannot exceed 100 characters."
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default TagLine;
