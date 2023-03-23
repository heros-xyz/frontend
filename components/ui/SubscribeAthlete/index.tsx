import { Box, Button, Center, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AlertIcon } from "@/components/svg/Alert";

const SubscribeAthlete = () => {
  const router = useRouter();

  return (
    <Box bg="white" minH={50} borderRadius={8} zIndex="1" pb={6}>
      <Center mb={3}>
        <Center
          bg="#FEE2E2"
          w={{ base: "12", xl: "20" }}
          h={{ base: "12", xl: "20" }}
          borderRadius="full"
        >
          <AlertIcon
            w={{ base: "20px", xl: "30px" }}
            h={{ base: "18px", xl: "26px" }}
          />
        </Center>
      </Center>
      <Center mb={{ base: 4, lg: 6 }}>
        <Text
          fontSize={{ base: "lg", lg: "2xl" }}
          fontWeight={{ base: 400, lg: 500 }}
        >
          You have to sign in to subscribe.
        </Text>
      </Center>
      <Center mb={{ base: 4, lg: 6 }}>
        <Button
          w={{ base: "full", lg: "fit-content" }}
          variant="primary"
          size="lg"
          onClick={() => {
            router.push({
              pathname: "/sign-in",
            });
          }}
        >
          Sign In
        </Button>
      </Center>
      <Center>
        <Text mr={2} color="primary" fontWeight={500}>
          Or
        </Text>{" "}
        <Link
          as={NextLink}
          href={`/joining-as`}
          color="secondary"
          textDecoration="underline"
        >
          Sign up here
        </Link>
      </Center>
    </Box>
  );
};

export default SubscribeAthlete;
