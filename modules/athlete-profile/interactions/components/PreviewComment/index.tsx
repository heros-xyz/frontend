import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IMeta, IResponseComment } from "@/types/athlete/types";

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
        ({ id, content, user: { firstName, lastName, avatar } }) => (
          <Box key={id}>
            <Flex alignItems="center" gap="8px" my="10px">
              <Avatar
                src={avatar}
                name={avatar}
                w="30px"
                h="30px"
                borderRadius="full"
              />
              <Text
                fontSize={{ base: "xs", lg: "medium" }}
                fontWeight="semibold"
                color="white"
              >
                {firstName + " " + lastName}
              </Text>
              <Text
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
