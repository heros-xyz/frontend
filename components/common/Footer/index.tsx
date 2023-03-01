import { Box, Text, Flex, Divider, Link, Container } from "@chakra-ui/react";
import FbLogo from "@/components/svg/Footer/FbLogo";
import TwitLogo from "@/components/svg/Footer/TwitLogo";
import GoogleLogo from "@/components/svg/Footer/GoogleLogo";

const Footer = () => {
  return (
    <Box as="footer" bg="primary">
      <Container size={["base", "sm", "md", "lg", "xl"]}>
        <Flex minWidth="max-content" gap={2} pt={12} pb={8} alignItems="start">
          <Box p={0} w="50%">
            <Box
              fontSize="sm"
              fontWeight="600"
              textTransform="uppercase"
              color="grey.100"
            >
              Company
            </Box>
            <Flex
              minWidth="max-content"
              flexDirection="column"
              alignItems="start"
              color="secondary"
            >
              <Link
                as="span"
                mt="4"
                fontSize={{ base: "md", xl: "md" }}
                w="100%"
              >
                About
              </Link>
              <Link
                as="span"
                mt="4"
                fontSize={{ base: "md", xl: "md" }}
                w="100%"
              >
                Fan’s FAQs
              </Link>
              <Link
                as="span"
                mt="4"
                fontSize={{ base: "md", xl: "md" }}
                w="100%"
              >
                Athlete’s FAQs
              </Link>
            </Flex>
          </Box>

          <Box p={0} w="50%">
            <Box
              fontSize="sm"
              fontWeight="600"
              textTransform="uppercase"
              color="grey.100"
            >
              Legal
            </Box>

            <Flex
              minWidth="max-content"
              flexDirection="column"
              alignItems="start"
              color="secondary"
            >
              <Link
                as="span"
                mt="4"
                fontSize={{ base: "md", xl: "md" }}
                w="100%"
              >
                Privacy
              </Link>
              <Link
                as="span"
                mt="4"
                fontSize={{ base: "md", xl: "md" }}
                w="100%"
              >
                Terms
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Box mx={5}>
          <Divider />
        </Box>
        <Flex
          minWidth="max-content"
          gap={2}
          m={5}
          pb={7}
          alignItems="start"
          flexDirection="column"
        >
          <Flex alignItems="center">
            <Link mr="6">
              <FbLogo />
            </Link>
            <Link mr="6">
              <TwitLogo />
            </Link>
            <Link mr="6">
              <GoogleLogo />
            </Link>
          </Flex>

          <Text
            as="span"
            mt="4"
            fontSize={{ base: "md", xl: "md" }}
            w="100%"
            color="grey.100"
          >
            © 2020 Workflow, Inc. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
