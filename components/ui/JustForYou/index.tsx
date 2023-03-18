import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { If, Then } from "react-if";
import NextLink from "next/link";
import { ArrowNarrowRight } from "@/components/svg/ArrowNarrowRight";
interface JustForYouProps {
  showCreateFirstInteraction?: boolean;
  showCreateInteractionRecent?: boolean;
  href: string;
}

const JustForYou: React.FC<JustForYouProps> = ({
  showCreateFirstInteraction,
  showCreateInteractionRecent,
  href,
}) => {
  return (
    <Box bg="white" pt={"8"}>
      <If
        condition={
          showCreateFirstInteraction ||
          (!showCreateFirstInteraction && showCreateInteractionRecent)
        }
      >
        <Then>
          <Text
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight={"extrabold"}
            color="primary"
          >
            Just for you
          </Text>
        </Then>
      </If>

      <If condition={showCreateFirstInteraction}>
        <Then>
          <Box
            borderRadius="md"
            borderWidth="2px"
            borderColor="primary"
            my="6"
            p="5"
            color="primary"
          >
            <Text fontSize={["sm", "xl"]} fontWeight={700} mb="1">
              Create your first interaction
            </Text>
            <Text as="p" fontSize={["xs", "md"]}>
              This is how you can interact with your fan. Let’s give them
              something
            </Text>
            <Box mt={3}>
              <Link as={NextLink} href={href}>
                <Flex alignItems="center">
                  <Box fontSize={["xs", "lg"]} color="secondary" mr={2}>
                    Create
                  </Box>
                  <ArrowNarrowRight w="5" height="4" color="secondary" mt={1} />
                </Flex>
              </Link>
            </Box>
          </Box>
        </Then>
      </If>
      <If
        condition={!showCreateFirstInteraction && showCreateInteractionRecent}
      >
        <Then>
          <Box
            borderRadius="md"
            borderWidth="2px"
            borderColor="accent.1"
            my="6"
            p="5"
          >
            <Text color="white" fontSize={["sm", "xl"]} fontWeight={700} mb="1">
              Create a new interaction
            </Text>
            <Text as="p" color="grey.100" fontSize={["xs", "md"]}>
              You have not created any interaction recently. Share some updates
              with your fans
            </Text>
            <Box mt={3}>
              <Link as={NextLink} href={href}>
                <Flex alignItems="center">
                  <Box fontSize={["xs", "lg"]} color="secondary" mr={2}>
                    Create
                  </Box>
                  <ArrowNarrowRight w="5" height="4" color="secondary" mt={1} />
                </Flex>
              </Link>
            </Box>
          </Box>
        </Then>
      </If>
    </Box>
  );
};

export default JustForYou;
