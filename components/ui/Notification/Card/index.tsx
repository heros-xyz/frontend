import React, { useMemo } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { INotificationInfo } from "@/types/notifications/types";
import {
  getLinkByNotificationType,
  notificationContent,
} from "@/utils/functions";
import HerosImage from "@/components/common/HerosImage";
import { convertDateFromNow } from "@/utils/time";
import { db } from "@/libs/firebase";
import { collectionPath } from "@/libs/dtl/constant";
import { NotificationStatusType } from "@/libs/dtl/notification";
import { useLoading } from "@/hooks/useLoading";
interface IProps {
  item?: INotificationInfo;
}

const NotificationCard: React.FC<IProps> = ({ item }) => {
  const { start, finish } = useLoading();

  const onClickNotification = async () => {
    if (item?.id) {
      try {
        start();
        await updateDoc(
          doc(db, `${collectionPath.NOTIFICATIONS}/${item?.id}`),
          { readAt: new Date(), status: NotificationStatusType.READ }
        );
      } catch (error) {
        console.log(error);
      } finally {
        finish();
      }
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
            src={item?.source?.avatar}
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
