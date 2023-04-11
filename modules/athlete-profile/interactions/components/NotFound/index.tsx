import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Container size={["base", "sm", "md", "lg", "500px"]}>
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        w="full"
        overscrollY="none"
      >
        <Flex
          fontSize={{ base: "sm", lg: "lg" }}
          fontWeight={500}
          flexDirection="column"
          w="full"
        >
          <Text>
            Oops!!! We can’t seem to find the interaction you’re looking for.!
          </Text>
          <Button onClick={router.back} mt="4" bg="primary" color="white">
            Go back
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
