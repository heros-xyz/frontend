import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { Close } from "@/components/svg/Close";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import ErrorMessage from "@/components/common/ErrorMessage";

interface AddTagProps {
  onSubmit: (value: string[]) => void;
}

const AddTag: FC<AddTagProps> = ({ onSubmit }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ",") return;
    setInputValue(e.target.value);
  };

  const handleDeleteTag = (index: number) => {
    setTags((prev) => [...prev].filter((_, idx) => idx !== index));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && Boolean(inputValue)) {
      if (inputValue.length > 25) {
        setIsInvalid(true);
        return;
      }
      if (inputValue.length < 25 && inputValue[0] === "#") {
        setTags((prev) => [
          ...prev,
          inputValue.trim().replace(/[^a-zA-Z ]/g, ""),
        ]);
        setInputValue("");
        setIsInvalid(false);
        return;
      }
    }
  };

  return (
    <HerosOnboardingWrapper
      onSubmit={() => onSubmit(tags)}
      textButton="SUBMIT"
      title="PAGE INFORMATION"
    >
      <Box>
        <Text as="p" fontWeight={500} fontSize="base" mb={2.5}>
          Add Tag(s)
        </Text>
        <Text as="p" fontSize="xs" fontWeight={400} mb={2.5}>
          Help people find you easier by adding keywords related to you and your
          content. Tags will not be visible to fans on your profile page.
          Separate tags by comma.
        </Text>
        <Text fontSize="12px" as="p" mb="20px" fontWeight={600}>
          Ideas for you: #sport, #athlete,...
        </Text>
        <Input
          variant="flushed"
          mb={2.5}
          placeholder="Add Tags"
          borderColor="primary"
          fontSize={{ base: "sm" }}
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={isInvalid}
          errorMessage="Tagline cannot exceed 25 characters."
        />
        <Flex flexWrap="wrap">
          {tags.map((it, index) => (
            <Text
              key={it}
              as="span"
              bg="accent.2"
              textColor="white"
              py="3px"
              px="12px"
              rounded="full"
              fontSize="14px"
              fontWeight={500}
              mr="12px"
              mb="6px"
            >
              #{it}{" "}
              <Close
                width="9px"
                height="9px"
                ml="10px"
                cursor="pointer"
                onClick={() => handleDeleteTag(index)}
              />
            </Text>
          ))}
        </Flex>
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default AddTag;
