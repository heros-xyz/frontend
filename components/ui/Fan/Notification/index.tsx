import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
import { useNotification } from "@/hooks/useNotification";
import NotificationList from "../../Notification/List";
import NotiSkeleton from "../../Notification/Skeleton";

const NotificationFan = () => {
  const {
    notificationOnToday,
    notificationOnWeek,
    notificationOnMonth,
    notificationEarlier,
    hasMore,
    listNotification,
    isLoading,
    onLoadMore,
    onMaskAllNotification,
  } = useNotification();

  return (
    <Box bg="white" pb={4}>
      <Flex
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        position="sticky"
        top={0}
        py={[5, 8]}
        px={[5, 0]}
        zIndex={10}
      >
        <Heading color="primary" fontSize={["xl", "2xl"]}>
          Notifications
        </Heading>
        <If condition={listNotification?.length}>
          <Then>
            <Text
              fontSize={["xs", "md"]}
              textDecoration="underline"
              color={"grey.300"}
              cursor={"pointer"}
              onClick={onMaskAllNotification}
            >
              Mark all as read
            </Text>
          </Then>
        </If>
      </Flex>
      <If condition={isLoading}>
        <Then>
          {Array.from(Array(10).keys()).map((key) => {
            return <NotiSkeleton key={key} />;
          })}
        </Then>
        <Else>
          <If condition={!listNotification.length}>
            <Then>
              <Text
                px={[5, 0]}
                fontSize={{ base: "sm", lg: "lg" }}
                color="primary"
              >
                {`You haven't had any notifications yet!`}
              </Text>
            </Then>
            <Else>
              <Flex flexDirection="column" gap={2.5}>
                <If condition={notificationOnToday?.length}>
                  <Then>
                    <NotificationList
                      periodTitle="Today"
                      items={notificationOnToday}
                    />
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
            </Else>
          </If>

          {hasMore && (
            <Waypoint onEnter={onLoadMore}>
              <Box>
                <NotiSkeleton />
              </Box>
            </Waypoint>
          )}
        </Else>
      </If>
    </Box>
  );
};

export default NotificationFan;
