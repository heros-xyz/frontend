import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IMeta, IResponseComment } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";

interface IPreviewCommentProps {
  navigateToPostDetail?: () => void;
  item?: {
    data: IResponseComment[];
    meta: IMeta;
  };
}

export const PreviewComment: FC<IPreviewCommentProps> = ({
  item,
  navigateToPostDetail,
}) => {
  return (
    <>
      {(item?.data || []).map(
        ({ id, content, user: { firstName, lastName, avatar, nickName } }) => (
          <Box key={id}>
            <Flex alignItems="start" gap="8px" my="10px">
              <Image
                src={getImageLink(avatar)}
                w="30px"
                h="30px"
                borderRadius="full"
                alt="user-avatar"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/50"
              />
              <Text
                fontSize={{ base: "xs", lg: "medium" }}
                fontWeight="semibold"
                color="white"
              >
                {nickName ?? firstName + " " + lastName}
              </Text>
              <Text
                flex="1"
                wordBreak="break-all"
                fontSize={{ base: "xs", lg: "medium" }}
                fontWeight="normal"
                color="white"
              >
                {content}
              </Text>
            </Flex>
          </Box>
        )
      )}
      {item && item?.meta.itemCount > 2 && (
        <Button
          variant="link"
          color="secondary"
          textDecoration="underline"
          textTransform="unset"
          mt={{ base: "5px", lg: "10px" }}
          fontSize={{ base: "12px", lg: "18px" }}
          fontWeight="bold"
          onClick={navigateToPostDetail}
        >
          View all comments
        </Button>
      )}
    </>
  );
};
