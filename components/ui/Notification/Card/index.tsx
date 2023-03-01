import React from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { INotificationInfo } from "@/types/notifications/types";
import {
  convertDateFromNow,
  getLinkByNotificationType,
  notificationContent,
} from "@/utils/functions";
import { resetApiState, useMaskNotificationMutation } from "@/api/global";
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
          <Avatar
            src={item?.source?.avatar}
            width={["50px", "60px"]}
            height={["50px", "60px"]}
          />
          <Box
            fontSize={["xs", "md"]}
            color={`${item?.readAt !== null && "white"}`}
          >
            <Heading as="span" fontSize={["xs", "md"]}>
              {item?.source?.fullName}
            </Heading>
            <Text as="span">{notificationContent(item)}</Text>
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
