import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { INotificationInfo } from "@/types/notifications/types";
import {
  convertDateFromNow,
  getLinkByNotificationType,
  notificationContent,
} from "@/utils/functions";
import { resetApiState, useMaskNotificationMutation } from "@/api/global";
import { getImageLink } from "@/utils/link";
interface IProps {
  item?: INotificationInfo;
}

const NotificationCard: React.FC<IProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [onMaskNotification] = useMaskNotificationMutation();

  const onClickNotification = () => {
    if (item?.id) {
      onMaskNotification(item?.id);
      dispatch(resetApiState());
    }
  };
  return (
    <Link
      href={getLinkByNotificationType(item) ?? ""}
      onClick={onClickNotification}
    >
      <Box>
        <Flex
          py={[2.5, 4]}
          px={5}
          gap={2.5}
          bg={`${item?.readAt === null && "acccent.1"} `}
          borderRadius={["0", "10px"]}
        >
          <Image
            src={getImageLink(item?.source?.avatar)}
            width={["50px", "60px"]}
            height={["50px", "60px"]}
            alt="avatar"
            rounded="full"
            fallbackSrc="https://via.placeholder.com/50"
            objectFit="cover"
          />
          <Box
            fontSize={["xs", "md"]}
            color={`${item?.readAt !== null && "white"}`}
          >
            <Heading as="span" fontSize={["xs", "md"]}>
              {item?.source?.nickName ?? item?.source?.fullName}
            </Heading>
            <Text as="span" wordBreak="break-word">
              {notificationContent(item)}
            </Text>
            <Text
              fontFamily="heading"
              fontWeight="bold"
              color={`${item?.readAt === null ? "acccent.2" : "secondary"}`}
            >
              {convertDateFromNow(item?.createdAt)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default NotificationCard;