import { Box, Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import { If, Then } from "react-if";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import NotificationList from "@/components/ui/Notification/List";
import { useNotification } from "@/hooks/useNotification";

const AthleteNotification = () => {
  const {
    notificationOnToday,
    notificationOnWeek,
    notificationOnMonth,
    notificationEarlier,
    isFetching,
    onMaskAllNotification,
  } = useNotification();

  return (
    <Box bg={"primary"} minHeight="100vh">
      <Head>
        <title>Athlete | Notifications</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Box pb={5} bg="primary">
          <Flex
            bg="primary"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            position="sticky"
            top={0}
            py={[5, 10]}
            px={[5, 0]}
            zIndex={9999}
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
          <Flex flexDirection="column" gap={2.5} bg="primary">
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

          <Box pt={4} pb={4} display="flex" justifyContent="center">
            <If condition={isFetching}>
              <Then>
                <Spinner color="secondary" />
              </Then>
            </If>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AthleteNotification;

AthleteNotification.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
