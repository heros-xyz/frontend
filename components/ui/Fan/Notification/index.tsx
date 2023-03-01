import React from "react";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { useNotification } from "@/hooks/useNotification";
import NotificationList from "../../Notification/List";

const NotificationFan = () => {
  const {
    notificationOnToday,
    notificationOnWeek,
    notificationOnMonth,
    notificationEarlier,
    isFetching,
    onMaskAllNotification,
  } = useNotification();

  return (
    <Box bg="primary">
      <Flex
        bg="primary"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        position="sticky"
        top={0}
        py={[5, 10]}
        px={[5, 0]}
        zIndex={10}
      >
        <Heading fontSize={["xl", "2xl"]}>Notifications</Heading>
        <Text
          fontSize={["xs", "md"]}
          textDecoration="underline"
          color={"secondary"}
          cursor={"pointer"}
          onClick={onMaskAllNotification}
        >
          Mark all as read
        </Text>
      </Flex>
      <Flex flexDirection="column" gap={2.5}>
        <If condition={notificationOnToday?.length}>
          <Then>
            <NotificationList periodTitle="Today" items={notificationOnToday} />
          </Then>
        </If>
        <If condition={notificationOnWeek?.length}>
          <Then>
            <NotificationList
              periodTitle="This week"
              items={notificationOnWeek}
            />
          </Then>
        </If>
        <If condition={notificationOnMonth?.length}>
          <Then>
            <NotificationList
              periodTitle="This month"
              items={notificationOnMonth}
            />
          </Then>
        </If>
        <If condition={notificationEarlier?.length}>
          <Then>
            <NotificationList
              periodTitle="Earlier"
              items={notificationEarlier}
            />
          </Then>
        </If>
      </Flex>

      <Box pt={4} pb={4} display="flex" justifyContent="center">
        <If condition={isFetching}>
          <Then>
            <Spinner color="secondary" />
          </Then>
        </If>
      </Box>
    </Box>
  );
};

export default NotificationFan;
