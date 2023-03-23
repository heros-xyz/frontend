import {
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import { Else, If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import NotificationList from "@/components/ui/Notification/List";
import { useNotification } from "@/hooks/useNotification";

const AthleteNotification = () => {
  const {
    notificationOnToday,
    notificationOnWeek,
    notificationOnMonth,
    notificationEarlier,
    hasMore,
    listNotification,
    onLoadMore,
    onMaskAllNotification,
  } = useNotification();

  return (
    <Box bg={"white"} minHeight="100vh">
      <Head>
        <title>Athlete | Notifications</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Box pb={5}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            color="primary"
            bg="white"
            position="sticky"
            top={0}
            py={[5, 10]}
            px={[5, 0]}
            zIndex={9999}
          >
            <Heading fontSize={["xl", "2xl"]}>Notifications</Heading>
            <If condition={listNotification?.length}>
              <Then>
                <Text
                  fontSize={["xs", "md"]}
                  textDecoration="underline"
                  color={"secondary"}
                  cursor={"pointer"}
                  onClick={onMaskAllNotification}
                >
                  Mark all as read
                </Text>
              </Then>
            </If>
          </Flex>
          <If condition={listNotification?.length}>
            <Then>
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

              {hasMore && (
                <Waypoint onEnter={onLoadMore}>
                  <Box
                    px={5}
                    pt={2}
                    display="flex"
                    justifyContent="center"
                    alignItems={"center"}
                    gap={2.5}
                    w="full"
                  >
                    <SkeletonCircle w="50px" h="50px" />
                    <Box pl={1} flex={1}>
                      <Skeleton w="40%" height="12px" color="white" mb={2} />
                      <Skeleton w="80%" height="12px" color="white" />
                    </Box>
                  </Box>
                </Waypoint>
              )}
            </Then>
            <Else>
              <Text
                px={[5, 0]}
                fontSize={{ base: "sm", lg: "lg" }}
                color="primary"
              >
                {`You haven't had any notifications yet!`}
              </Text>
            </Else>
          </If>
        </Box>
      </Container>
    </Box>
  );
};

export default AthleteNotification;

AthleteNotification.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
