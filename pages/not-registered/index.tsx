import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const RegisteredEmail = () => {
  return (
    <Box bg="primary" minH="100vh" color="white">
      <Head>
        <title>Facebook/Gmail account has not been registered to heros</title>
      </Head>

      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
        >
          <Heading mb={8} fontSize={{ base: "36px", lg: "48px" }}>
            Oops!
          </Heading>
          <Text as="p" textAlign="center" mb={6} fontSize="md" fontWeight={400}>
            We are sorry, your Facebook/Gmail account has not been registered to
            heros.
          </Text>

          <Link
            as={NextLink}
            href="/joining-as"
            w={{ base: "full", lg: "fit-content" }}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="secondary"
              mb={5}
              h="48px"
              w="full"
              textTransform="uppercase"
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight={700}
            >
              Sign up
            </Button>
          </Link>

          <Link
            as={NextLink}
            href="/sign-in"
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
              Sign in
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default RegisteredEmail;
