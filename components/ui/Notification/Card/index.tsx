import React, { useMemo } from "react";
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

  const hasBeenRead = useMemo(() => {
    return item?.readAt === null;
  }, [item?.readAt]);

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
          bg={{
            base: hasBeenRead ? "accent.1" : "",
            lg: hasBeenRead ? "accent.1" : "",
          }}
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
            color={`${!hasBeenRead && "white"}`}
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
              color={`${hasBeenRead ? "secondary" : "accent.2"}`}
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
