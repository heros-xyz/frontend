import { Box, Button, Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "@/components/svg/Logo";

const JoinPage = () => {
  return (
    <Box display="flex" justifyContent="center" bg="primary" height="100vh">
      <Center>
        <Box px={5}>
          <Logo
            w={{ base: "161px", xl: "323px" }}
            height={{ base: "32px", xl: "64px" }}
          />

          <Box mt={{ base: "12", xl: "20" }}>
            <Text
              fontSize={{ base: "md", xl: "xl" }}
              color="white"
              pb={{ base: "2.5", xl: "6" }}
            >
              Are you joining as a fan or an athlete?
            </Text>
            <Box color="secondary" mt={4}>
              <Link href="/fan/sign-up">
                <Button
                  w="100%"
                  h="inherit"
                  variant="secondaryOutline"
                  justifyContent="flex-start"
                  px="5"
                  py={{ base: "2", xl: "3" }}
                >
                  Fan
                </Button>
              </Link>
              <Text
                fontSize={{ base: "xs", xl: "md" }}
                pt={{ base: "1", xl: "3.5" }}
                pb={{ base: "2.5", xl: "7" }}
              >
                As a fan you can follow & support your favorite athlete(s)
                directly.
              </Text>
              <Link href="/athlete/sign-up">
                <Button
                  width="100%"
                  h="inherit"
                  variant="secondaryOutline"
                  justifyContent="flex-start"
                  px="5"
                  py={{ base: "2", xl: "3" }}
                >
                  Athlete
                </Button>
              </Link>
              <Text
                fontSize={{ base: "xs", xl: "md" }}
                pt={{ base: "1", xl: "3.5" }}
              >
                As an athlete you can share your stories, thoughts,... with your
                fans and earn money while doing so.
              </Text>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default JoinPage;
