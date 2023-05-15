import { Box, Flex, Text, Input } from "@chakra-ui/react";
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { Close } from "@/components/svg/Close";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";

interface AddTagProps {
  onSubmit: (value: string[]) => void;
  isLoading: boolean;
  setValue: Dispatch<SetStateAction<number>>;
}

const AddTag: FC<AddTagProps> = ({ onSubmit, isLoading, setValue }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isMaxTag, setIsMaxTag] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replaceAll(/[^a-zA-Z0-9]/g, ""));
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
      if (tags.includes(inputValue)) {
        setInputValue("");
        return;
      }
      if (tags.length < 5) {
        setTags((prev) => [...prev, inputValue]);
        setIsInvalid(false);
        setIsMaxTag(false);
        setInputValue("");
        return;
      } else {
        setIsMaxTag(true);
      }
    }
  };

  const elem = document.getElementById("children");
  const rect = elem?.getBoundingClientRect();
  if (rect) {
    setValue(rect.x);
  }

  return (
    <HerosOnboardingWrapperNew
      onSubmit={() => onSubmit(tags)}
      textButton="SUBMIT"
      title="Page information"
      submitLoading={isLoading}
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
          content.
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
        <ErrorMessage
          condition={isMaxTag && tags.length === 5}
          errorMessage="The maximum number of tags are 5."
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
              my="6px"
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
