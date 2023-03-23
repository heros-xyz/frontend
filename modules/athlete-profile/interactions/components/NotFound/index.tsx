import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      bg="secondary"
      px={{ base: 15 }}
      overscrollY="none"
      py="unset"
    >
      <Flex fontSize="8xl" fontWeight={800} flexDirection="column">
        <Text>Interaction </Text>
        <Text>has been deleted 🙁</Text>
        <Button onClick={router.back} mt="16" bg="primary" color="white">
          Go back
        </Button>
      </Flex>
    </Flex>
  );
}
