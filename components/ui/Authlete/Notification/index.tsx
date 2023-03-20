import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { notiList } from "@/utils/mock";
import NotificationList from "../../Notification/List";

const NotificationAthlete = () => {
  return (
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
          color={"primary"}
          cursor={"pointer"}
        >
          Mark all as read
        </Text>
      </Flex>
      <Flex flexDirection="column" gap={2.5} bg="primary">
        {/* <NotificationList periodTitle="Today" items={notiList} />
        <NotificationList periodTitle="This Week" items={notiList} />
        <NotificationList periodTitle="This Month" items={notiList} /> */}
      </Flex>
    </Box>
  );
};

export default NotificationAthlete;
