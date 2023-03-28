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
        <Flex fontSize="xl" fontWeight={700} flexDirection="column" w="full">
          <Text>Oops!!! This interaction has been deleted!</Text>
          <Button onClick={router.back} mt="8" bg="primary" color="white">
            Go back
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
