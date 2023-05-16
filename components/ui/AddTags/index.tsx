import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { Close } from "@/components/svg/Close";

const AddTags = () => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const onHandleSubmitTag = () => {
    if (!input) return;
    setTags((current) => [...current, input]);
    setInput("");
  };

  const onHandleRemoveTag = (index: number) => {
    const array = [...tags];
    if (index !== -1) {
      array.splice(index, 1);
      setTags(array);
    }
  };

  return (
    <Box bg="secondary">
      <Text
        fontSize="md"
        fontWeight="bold"
        color="black.ish"
        lineHeight="140%"
        mb={{ base: 1.5, xl: 2.5 }}
      >
        Add Tag(s)
      </Text>
      <Box
        fontSize={{ base: "xs", xl: "md" }}
        fontWeight="normal"
        color="primary"
        lineHeight="140%"
      >
        <Text mb={{ base: 1.5 }}>
          Help people find you easier by adding keywords related to you and your
          content.
        </Text>
        <Text as="b">Ideas for you: #sport, #athlete,...</Text>
      </Box>
      <Box mt={{ base: 3, xl: 7 }} mb={6}>
        <Input
          placeholder="Add Tags"
          variant="flushed"
          width="100%"
          value={input}
          fontSize={{ base: "sm", xl: "3xl" }}
          _placeholder={{
            fontSize: { base: "sm", xl: "3xl" },
            color: "grey.300",
          }}
          onChange={(event) => setInput(event.target.value)}
        />

        {tags && (
          <Flex mt={{ base: 2, xl: 7 }} gap={{ base: 2.5, xl: 4 }} wrap="wrap">
            {tags.map((tag, index: number) => (
              <Tag
                size="lg"
                borderRadius="full"
                variant="solid"
                py={{ base: 0.5, xl: 1 }}
                px={{ base: 2.5, xl: 4 }}
                colorScheme="tagTheme"
                maxHeight={{ base: "26px", xl: "33px" }}
                key={tag}
              >
                <TagLabel
                  fontSize={{ base: "sm", xl: "lg" }}
                  fontWeight="medium"
                  color="#fff"
                  lineHeight={{ base: 3, xl: "140%" }}
                  mr={{ base: 4, xl: 2.5 }}
                >
                  #{tag}
                </TagLabel>
                <Close
                  cursor="pointer"
                  width={{ base: "10px", xl: "12px" }}
                  height={{ base: "10px", xl: "12px" }}
                  onClick={() => onHandleRemoveTag(index)}
                />
              </Tag>
            ))}
          </Flex>
        )}
      </Box>

      <Flex justify={{ base: "center", xl: "flex-end" }}>
        <Button
          width={{ base: "100%", xl: "auto" }}
          variant="primary"
          height="48px"
          fontSize={{ base: "md", xl: "xl" }}
          onClick={onHandleSubmitTag}
        >
          submit
        </Button>
      </Flex>
    </Box>
  );
};

export default AddTags;
