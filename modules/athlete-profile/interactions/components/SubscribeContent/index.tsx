import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ISubscribeContentProps {
  onClick: () => void;
}

const SubscribeContent: FC<ISubscribeContentProps> = ({ onClick }) => {
  return (
    <Flex bg="acccent.1" borderRadius={{ base: "md", lg: "12px" }}>
      <Box
        color="black"
        py={{ base: "3" }}
        px={{ base: "4" }}
        p={{ lg: "30px" }}
      >
        <Text fontWeight="bold" fontSize={{ base: "sm", lg: "xl" }}>
          Subcribe to exclusive content!
        </Text>
        <Text fontWeight="normal" fontSize={{ base: "xs", lg: "md" }}>
          You can view fan-only posts and interact with all Matt Prior’s content
          once you are a sucbriber.
        </Text>
      </Box>
      <Flex alignItems="center" borderLeft="1px white solid">
        <Link
          px="7"
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "xl" }}
          color="acccent.2"
          onClick={onClick}
        >
          Subscribe
        </Link>
      </Flex>
    </Flex>
  );
};
export default SubscribeContent;
