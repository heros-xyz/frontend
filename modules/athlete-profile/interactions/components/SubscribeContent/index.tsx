import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ISubscribeContentProps {
  athleteName: string;
  onClick: () => void;
}

const SubscribeContent: FC<ISubscribeContentProps> = ({
  athleteName,
  onClick,
}) => {
  return (
    <Flex bg="accent.2" borderRadius={{ base: "md", lg: "12px" }}>
      <Box
        color="white"
        py={{ base: "3" }}
        px={{ base: "4" }}
        p={{ lg: "30px" }}
      >
        <Text fontWeight="bold" fontSize={{ base: "sm", lg: "xl" }}>
          Subcribe to exclusive content!
        </Text>
        <Text fontWeight="normal" fontSize={{ base: "xs", lg: "md" }}>
          You can view fan-only posts and interact with all{" "}
          <b>{athleteName}’s </b>
          content once you are a sucbriber.
        </Text>
      </Box>
      <Flex alignItems="center" borderLeft="1px white solid">
        <Link
          px="7"
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "xl" }}
          color="white"
          onClick={onClick}
        >
          Subscribe
        </Link>
      </Flex>
    </Flex>
  );
};
export default SubscribeContent;
