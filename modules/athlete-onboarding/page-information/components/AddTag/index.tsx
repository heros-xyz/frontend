import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { Close } from "@/components/svg/Close";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";

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
    if (e.key === "Enter" && !!inputValue) {
      if (inputValue.length > 25) {
        setIsInvalid(true);
        return;
      }
      setTags((prev) => [...prev, inputValue.trim()]);
      setIsInvalid(false);
      setInputValue("");
    }
  };

  return (
    <HerosOnboardingWrapperNew
      onSubmit={() => onSubmit(tags)}
      textButton="SUBMIT"
      title="Page information"
    >
      <Box minW={{ xl: "750px" }}>
        <Text
          as="p"
          fontWeight="bold"
          fontSize={{ base: "md", xl: "xl" }}
          mb={2.5}
          color="primary"
        >
          Add Tag(s)
        </Text>
        <Text
          as="p"
          fontSize={{ base: "xs", xl: "md" }}
          fontWeight={400}
          mb={2.5}
        >
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
          borderColor="grey.200"
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
    </HerosOnboardingWrapperNew>
  );
};

export default AddTag;
