import { Box, Button, Text, Container, Link } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

export default function Custom404() {
  return (
    <Box py={20}>
      <Head>
        <title>Not Found Page</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Text mb={6} fontWeight={600} fontSize={{ base: "sm", lg: "lg" }}>
          Oops! We can’t seem to find the page you’re looking for.
        </Text>

        <Link as={NextLink} href="/">
          <Button variant="primary">Back to HOME PAGE</Button>
        </Link>
      </Container>
    </Box>
  );
}
