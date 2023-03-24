import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReplyIconLg } from "@/components/svg/ReplyIconLg";
import { useDevice } from "@/hooks/useDevice";
import { IReplyingTo } from "../../post-detail/CommentSection";

interface IReplyingCommentProps {
  isFocused?: boolean;
  isLoading?: boolean;
  isUnfocused?: () => void;
  isReplying?: IReplyingTo;
  onCancelReply?: () => void;
  onSubmitComment?: (value: string) => void;
}

const MAX_COMMENT_LENGTH = 2000;

const ReplyingComment: FC<IReplyingCommentProps> = ({
  isFocused,
  isLoading,
  isReplying,
  isUnfocused,
  onCancelReply,
  onSubmitComment,
}) => {
  const { data: userSession } = useSession();

  const { isMobile } = useDevice();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitComment = () => {
    onSubmitComment && onSubmitComment(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <Box
      position="sticky"
      w={{ base: "100%", lg: "100%" }}
      alignSelf="center"
      bottom={0}
      zIndex={10}
    >
      <Box position="relative">
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ opacity: 0.8, top: isMobile ? -42 : -58 }}
              animate={{ opacity: 1, top: isMobile ? -52 : -68 }}
              exit={{ opacity: 0, top: isMobile ? -42 : -58 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                width: "100%",
              }}
            >
              <Flex
                width="100%"
                bg="secondary"
                rounded={{ lg: "md" }}
                justifyContent="space-between"
                py="10px"
                px="22px"
                alignItems="center"
              >
                <Flex alignItems="center">
                  <ReplyIconLg role="button" />
                  <Box ml={{ base: "7px", lg: "17px" }}>
                    <Text
                      color="acccent.2"
                      fontWeight="extrabold"
                      fontSize={{ base: "10px", lg: "16px" }}
                    >
                      {isReplying.firstName + " " + isReplying.lastName}
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "10px", lg: "16px" }}
                      width="12ch"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                    >
                      {isReplying.content}
                    </Text>
                  </Box>
                </Flex>
                <CloseButton onClick={onCancelReply} />
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
        <Flex
          bg="primary"
          alignItems="center"
          gap={4}
          justifySelf="end"
          pt="15px"
          pb="20px"
        >
          <Avatar
            w={{ base: "30px", lg: "50px" }}
            h={{ base: "30px", lg: "50px" }}
            src={userSession?.user?.avatar}
          />
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Say something"
            color="acccent.4"
            variant="flushed"
            fontSize={{ base: "sm", lg: "xl" }}
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
            color={inputValue ? "acccent.1" : "white"}
            fontSize={{ base: "sm", lg: "xl" }}
            textDecoration="unset"
            textTransform="unset"
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

export default ReplyingComment;
