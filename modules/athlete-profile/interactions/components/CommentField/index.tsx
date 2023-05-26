import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReplyIconLg } from "@/components/svg/ReplyIconLg";
import { useDevice } from "@/hooks/useDevice";
import { useCommentReply } from "@/libs/dtl/comment";
import { useMyUserProfile } from "@/libs/dtl";

interface IReplyingCommentProps {
  isFocused?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onCancelReply?: () => void;
  isUnfocused?: () => void;
  onSubmitComment?: (value: string) => void;
}

const MAX_COMMENT_LENGTH = 2000;

const CommentField: FC<IReplyingCommentProps> = ({
  isFocused,
  isLoading,
  disabled,
  isUnfocused,
  onSubmitComment,
}) => {
  const myUserProfile = useMyUserProfile()
  const commentReply = useCommentReply();

  const { isMobile } = useDevice();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (onSubmitComment)
      await onSubmitComment(inputValue);
    commentReply.clear();
    setInputValue("");
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);


  return (
    <Box
      bg="white"
      position={{ base: "fixed", lg: "sticky" }}
      w={{ base: "100vw", lg: "100%" }}
      alignSelf="center"
      bottom={0}
      zIndex={10}
      left={0}
    >
      <Box position="relative">
        <AnimatePresence>
          {commentReply.comment && (
            <motion.div
              initial={{ opacity: 0.8, top: isMobile ? -32 : -56 }}
              animate={{ opacity: 1, top: isMobile ? -52 : -68 }}
              exit={{ opacity: 0, top: isMobile ? -32 : -56 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                width: "100%",
                left: 0,
              }}
            >
              <Flex
                bg="grey.0"
                width="100%"
                rounded={{ lg: "md" }}
                justifyContent="space-between"
                py="10px"
                px="22px"
                alignItems="center"
                shadow="md"
              >
                {myUserProfile.data && <Flex alignItems="center">
                  <ReplyIconLg role="button" />
                  <Box ml={{ base: "7px", lg: "17px" }}>
                    <Text
                      color="accent.2"
                      fontWeight="extrabold"
                      fontSize={{ base: "10px", lg: "16px" }}
                    >
                      {myUserProfile.data.firstName + " " + myUserProfile.data.lastName}
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "10px", lg: "16px" }}
                      width="12ch"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      color="primary"
                    >
                      {commentReply.comment.content}
                    </Text>
                  </Box>
                </Flex>}
                <CloseButton color="primary" onClick={commentReply.clear} />
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
        <Flex
          alignItems="center"
          gap={4}
          justifySelf="end"
          pt="10px"
          pb="15px"
          px={{ base: "20px", lg: "0" }}
        >
          <Image
            w={{ base: "30px", lg: "50px" }}
            h={{ base: "30px", lg: "50px" }}
            src={myUserProfile.data?.avatar}
            alt="avatar"
            rounded="full"
            objectFit="cover"
            fallbackSrc="/images/DefaultAvaCircle.png"
          />
          <Input
            flex={1}
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Say something"
            color="primary"
            _placeholder={{ color: "grey.300", opacity: 0.5 }}
            _focus={{ borderColor: "primary" }}
            borderColor="primary"
            variant="flushed"
            isDisabled={disabled}
            fontSize={{ base: "16px", lg: "xl" }}
            onBlur={isUnfocused}
            maxLength={MAX_COMMENT_LENGTH}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !!inputValue) {
                handleSubmitComment();
              }
            }}
          />
          <Button
            variant="link"
            color={inputValue ? "secondary" : "gray"}
            fontSize={{ base: "sm", lg: "xl" }}
            textDecoration="unset"
            textTransform="unset"
            isDisabled={disabled}
            onClick={() => {
              if (!inputValue) return;
              handleSubmitComment();
            }}
            isLoading={isLoading}
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CommentField;
