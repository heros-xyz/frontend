import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { INotificationInfo } from "@/types/notifications/types";
import {
  convertDateFromNow,
  getLinkByNotificationType,
  notificationContent,
} from "@/utils/functions";
import { useMaskNotificationMutation } from "@/api/global";
import { getImageLink } from "@/utils/link";
interface IProps {
  item?: INotificationInfo;
}

const NotificationCard: React.FC<IProps> = ({ item }) => {
  const [onMaskNotification] = useMaskNotificationMutation();

  const onClickNotification = () => {
    if (item?.id) {
      onMaskNotification(item?.id);
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
          bg={`${item?.readAt === null ? "accent.1" : "grey.0"} `}
          borderRadius={["0", "10px"]}
        >
          <Image
            src={getImageLink(item?.source?.avatar)}
            width={["50px", "60px"]}
            height={["50px", "60px"]}
            alt="avatar"
            rounded="full"
            objectFit="cover"
          />
          <Box
            fontSize={["xs", "md"]}
            color={`${item?.readAt !== null && "white"}`}
            flex={1}
          >
            <Heading as="span" color="primary" fontSize={["xs", "md"]}>
              {item?.source?.nickName ?? item?.source?.fullName}
            </Heading>
            <Text as="span" color="primary" wordBreak="break-word">
              {notificationContent(item)}
            </Text>
            <Text
              fontFamily="heading"
              fontWeight="bold"
              color={`${item?.readAt === null ? "secondary" : "accent.2"}`}
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
