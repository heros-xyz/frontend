import { Box, Button, Container, Flex, Link } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <Box bg="primary" w="100vw" h="100vh">
      <Head>
        <title>404 Not Found.</title>
      </Head>

      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
        >
          <Box>
            <Button
              variant="secondary"
              mb={5}
              h="48px"
              w="full"
              textTransform="uppercase"
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight={700}
            >
              Oops!!! 404 Page Not Found.
            </Button>

            <Link
              as={NextLink}
              href="/"
              w={{ base: "full", lg: "fit-content" }}
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="secondaryOutline"
                h="48px"
                w="full"
                textTransform="uppercase"
                fontSize={{ base: "md", lg: "lg" }}
                fontWeight={700}
              >
                Back To Home Page
              </Button>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
