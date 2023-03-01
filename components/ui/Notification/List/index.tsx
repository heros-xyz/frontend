import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { INotificationInfo } from "@/types/notifications/types";
import NotificationCard from "../Card";

interface IProps {
  periodTitle?: string;
  items?: Array<INotificationInfo>;
}
const NotificationList: React.FC<IProps> = ({
  periodTitle = "",
  items = [],
}) => {
  return (
    <Box>
      <Heading
        mx={[5, 0]}
        my={[3, 3.5]}
        fontSize={["md", "xl"]}
        color="acccent.3"
      >
        {periodTitle}
      </Heading>

      <Flex flexDirection="column" gap={1.5}>
        {items.map((item, index) => (
          <NotificationCard key={`${"key" + index}`} item={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default NotificationList;
