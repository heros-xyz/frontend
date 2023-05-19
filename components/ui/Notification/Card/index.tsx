import React, { useMemo } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { INotificationInfo } from "@/types/notifications/types";
import {
  getLinkByNotificationType,
  notificationContent,
} from "@/utils/functions";
import { getImageLink } from "@/utils/link";
import HerosImage from "@/components/common/HerosImage";
import { convertDateFromNow } from "@/utils/time";
interface IProps {
  item?: INotificationInfo;
}

const NotificationCard: React.FC<IProps> = ({ item }) => {
  /*
  const [onMaskNotification] = useMaskNotificationMutation();
  */

  const onMaskNotification = (id: string) => {}; // MOCK
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
          <HerosImage
            src={getImageLink(item?.source?.avatar)}
            width={{ base: "50px", lg: "60px" }}
            height={{ base: "50px", lg: "60px" }}
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
