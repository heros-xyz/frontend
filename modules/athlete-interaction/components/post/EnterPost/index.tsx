import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormikContext } from "formik";
import { If, Then } from "react-if";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import { useSession } from "next-auth/react";
import { PhotoIcon } from "@/components/svg/Photo";
import { HashTagIcon } from "@/components/svg/HashTagIcon";
import { Close } from "@/components/svg/Close";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  ERROR_SIZE_UPLOAD_POST_MEDIA,
  ERROR_TYPE_UPLOAD_POST_MEDIA,
} from "@/utils/inputRules";
import UploadMediaPost from "../UploadMediaPost";
import { IValuesTypes } from "../../../hooks";

const EnterPost = () => {
  const { data: session } = useSession();
  const { values, errors, setFieldValue } = useFormikContext<IValuesTypes>();
  const upload = useRef() as MutableRefObject<HTMLInputElement>;
  const [editor] = useState(() => withReact(createEditor()));
  const [inputValueTag, setInputValueTag] = useState<string>("");

  useEffect(() => {
    if (!values?.tags?.length) {
      setInputValueTag("");
    }
  }, [values?.tags]);

  const onSelectMedia = () => {
    if (values?.listMedia.length < 10) {
      upload?.current?.click();
    }
  };
  const handleChangeInputTag = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputValueTag("");
    } else {
      const string = e.target.value.replace(/[^\w\s]/g, "");
      setInputValueTag(string);
    }
  };

  const handleDeleteTag = (tag: string) => {
    const newArrTag = values.tags.filter((it) => it !== tag);
    setFieldValue("tags", newArrTag);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      !!inputValueTag &&
      inputValueTag.length <= 25
    ) {
      const newArrTag = [...values.tags, inputValueTag.trim()];
      if (values.tags.includes(inputValueTag)) {
        setInputValueTag("");
        return;
      }
      setFieldValue("tags", newArrTag);
      setInputValueTag("");
    }
  };

  const fomatErrorMessage = useMemo(() => {
    if (Array.isArray(errors.listMedia)) {
      const isErrorSize = errors.listMedia.some(
        (item: any) => item?.file === "Invalid"
      );
      const isErrorType = errors.listMedia.some(
        (item: any) => item?.file === "InvalidType"
      );
      if (isErrorSize) return ERROR_SIZE_UPLOAD_POST_MEDIA;
      if (isErrorType) return ERROR_TYPE_UPLOAD_POST_MEDIA;
    }
    return "";
  }, [errors.listMedia]);

  return (
    <Box>
      <Box
        py={4}
        px={5}
        bg="grey.0"
        mx={{ base: -5, lg: 0 }}
        rounded={{ lg: "xl" }}
      >
        <Box mb={5}>
          <UploadMediaPost ref={upload} onAdd={onSelectMedia} />
        </Box>
        <Box>
          <Slate editor={editor} value={[]}>
            <Textarea
              id="content"
              value={values.content}
              placeholder={
                session?.user.hasFirstInteraction
                  ? "Let your fans know what’s on your mind."
                  : "Add your first interaction."
              }
              variant="unstyled"
              fontSize={{ base: "xs", lg: "lg" }}
              resize="none"
              py={0}
              mb={2}
              onChange={(e) => setFieldValue("content", e.target.value)}
            />
          </Slate>
        </Box>
        <Flex alignItems="center" gap={6}>
          <PhotoIcon
            w={{ base: "20px", lg: "26px" }}
            h={{ base: "20px", lg: "26px" }}
            color="primary"
            cursor="pointer"
            onClick={onSelectMedia}
          />
          <Flex w="full" alignItems="center" gap={3}>
            <HashTagIcon
              w={{ base: "16px", lg: "21px" }}
              h={{ base: "16px", lg: "21px" }}
              color="primary"
            />
            <Input
              variant="flushed"
              fontSize="sm"
              placeholder="Add tags, use comma to separate"
              borderColor="primary"
              onKeyDown={handleKeyDown}
              disabled={values?.tags?.length >= 50}
              value={inputValueTag}
              onInput={handleChangeInputTag}
            />
          </Flex>
        </Flex>
        <If condition={values?.tags?.length}>
          <Then>
            <Flex flexWrap="wrap" gap={2} mt={2.5}>
              {values?.tags?.map((it) => (
                <Text
                  key={it}
                  as="span"
                  bg="accent.2"
                  textColor="white"
                  py="3px"
                  px="12px"
                  rounded="full"
                  fontSize="sm"
                  fontWeight={500}
                >
                  #{it}{" "}
                  <Close
                    width="9px"
                    height="9px"
                    ml="10px"
                    cursor="pointer"
                    onClick={() => handleDeleteTag(it)}
                  />
                </Text>
              ))}
            </Flex>
          </Then>
        </If>
      </Box>
      <ErrorMessage
        mt={2.5}
        condition={errors.content}
        errorMessage={errors.content}
      />
      <ErrorMessage
        whiteSpace="break-spaces"
        condition={Boolean(errors.listMedia?.length)}
        errorMessage={
          Array.isArray(errors.listMedia) ? fomatErrorMessage : errors.listMedia
        }
      />
      <ErrorMessage
        whiteSpace="break-spaces"
        condition={inputValueTag.length > 25}
        errorMessage="Tag cannot exceed 25 characters."
      />
    </Box>
  );
};

export default EnterPost;
