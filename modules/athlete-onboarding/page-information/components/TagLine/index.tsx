import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { YourStoryIcon } from "@/components/svg/YourStoryIcon";
interface TagLineProps {
  onSubmit: (value: string) => void;
  value: string;
}

const TagLine: FC<TagLineProps> = ({ value, onSubmit }) => {
  const [tag, setTag] = useState(value);
  return (
    <HerosOnboardingWrapperNew
      Icon={
        <YourStoryIcon
          w={{ base: "90px", xl: "145px" }}
          h={{ base: "80px", xl: "128px" }}
          color={{ base: "#FFFAE8", xl: "accent.6" }}
        />
      }
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="Page information"
      onSubmit={() => {
        tag.length <= 100 && onSubmit(tag);
      }}
      bgIconColor="accent.6"
    >
      <Box mb={4}>
        <Text
          as="p"
          fontWeight="bold"
          fontSize={{ base: "md", xl: "xl" }}
          mb={2.5}
          color="primary"
        >
          Write A Tagline (100 characters max)
        </Text>
        <Text
          as="p"
          fontSize={{ base: "xs", xl: "md" }}
          fontWeight="normal"
          mb={5}
          color="grey.300"
        >
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
          borderColor="grey.200"
          placeholder="Tagline"
          maxLength={101}
        />
        <ErrorMessage
          condition={tag.length > 100}
          errorMessage="Tagline cannot exceed 100 characters."
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default TagLine;
