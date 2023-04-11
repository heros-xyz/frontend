import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import { Else, If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import NotificationList from "@/components/ui/Notification/List";
import { useNotification } from "@/hooks/useNotification";
import NotiSkeleton from "@/components/ui/Notification/Skeleton";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const AthleteNotification = () => {
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
            zIndex={999}
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
          <If condition={isLoading}>
            <Then>
              {Array.from(Array(10).keys()).map((key) => {
                return <NotiSkeleton key={key} />;
              })}
            </Then>
            <Else>
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
                      <Box>
                        <NotiSkeleton />
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
