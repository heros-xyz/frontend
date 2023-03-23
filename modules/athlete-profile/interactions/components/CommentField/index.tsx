import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReplyIconLg } from "@/components/svg/ReplyIconLg";
import { useDevice } from "@/hooks/useDevice";
import { getImageLink } from "@/utils/link";
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

const CommentField: FC<IReplyingCommentProps> = ({
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
          {isReplying && (
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
                bg="accent.3"
                width="100%"
                rounded={{ lg: "md" }}
                justifyContent="space-between"
                py="10px"
                px="22px"
                alignItems="center"
                shadow="md"
              >
                <Flex alignItems="center">
                  <ReplyIconLg role="button" />
                  <Box ml={{ base: "7px", lg: "17px" }}>
                    <Text
                      color="accent.2"
                      fontWeight="extrabold"
                      fontSize={{ base: "10px", lg: "16px" }}
                    >
                      {isReplying.nickName ??
                        isReplying.firstName + " " + isReplying.lastName}
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
                      {isReplying.content}
                    </Text>
                  </Box>
                </Flex>
                <CloseButton color="primary" onClick={onCancelReply} />
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
            src={getImageLink(userSession?.user?.avatar)}
            alt="avatar"
            rounded="full"
            fallbackSrc="https://via.placeholder.com/50"
            objectFit="cover"
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
