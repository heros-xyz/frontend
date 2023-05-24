import { Box, Button, Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Logo } from "@/components/svg/Logo";
import { useAuthContext } from "@/context/AuthContext";
import { RoutePath } from "@/utils/route";
import { db } from "@/libs/firebase";
import { User } from "@/libs/dtl";
import { ATHLETE_ROLE, FAN_ROLE } from "@/utils/constants";

const JoinPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [whoLoading, setWhoLoading] = useState({
    FAN: false,
    ATHLETE: false,
  });

  const handleUpdateDocument = async (profileType: "FAN" | "ATHLETE") => {
    try {
      setWhoLoading((c) => ({ ...c, [profileType]: true }));

      const docRef = doc(db, `user/${user?.uid}`);
      await updateDoc(docRef, {
        profileType,
      });
      const userData = (await getDoc(docRef)).data() as User;

      if (profileType === FAN_ROLE) {
        await router.push(
          userData?.isFinishOnboarding
            ? RoutePath.FAN
            : RoutePath.FAN_ONBOARDING
        );
      }

      if (profileType === ATHLETE_ROLE) {
        await router.push(
          userData?.isFinishOnboarding
            ? RoutePath.ATHLETE
            : RoutePath.ATHLETE_SETUP_ACCOUNT
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" bg="primary" height="100vh">
      <Center w={{ base: "full", xl: "500px" }}>
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
              {!!user?.uid ? (
                <Button
                  w="100%"
                  h="inherit"
                  variant="secondaryOutline"
                  justifyContent="flex-start"
                  px="5"
                  py={{ base: "2", xl: "5" }}
                  fontSize={{ base: "sm", xl: "32px" }}
                  onClick={async () => await handleUpdateDocument("FAN")}
                  isLoading={whoLoading.FAN}
                >
                  Fan
                </Button>
              ) : (
                <Link href="/fan/sign-up">
                  <Button
                    w="100%"
                    h="inherit"
                    variant="secondaryOutline"
                    justifyContent="flex-start"
                    px="5"
                    py={{ base: "2", xl: "5" }}
                    fontSize={{ base: "sm", xl: "32px" }}
                  >
                    Fan
                  </Button>
                </Link>
              )}
              <Text
                fontSize={{ base: "xs", xl: "md" }}
                pt={{ base: "1", xl: "3.5" }}
                pb={{ base: "2.5", xl: "7" }}
              >
                As a fan you can follow & support your favorite athlete(s)
                directly.
              </Text>
              {!!user?.uid ? (
                <Button
                  width="100%"
                  h="inherit"
                  variant="secondaryOutline"
                  justifyContent="flex-start"
                  px="5"
                  py={{ base: "2", xl: "5" }}
                  fontSize={{ base: "sm", xl: "32px" }}
                  isLoading={whoLoading.ATHLETE}
                  onClick={async () => await handleUpdateDocument("ATHLETE")}
                >
                  Athlete
                </Button>
              ) : (
                <Link href="/athlete/sign-up">
                  <Button
                    width="100%"
                    h="inherit"
                    variant="secondaryOutline"
                    justifyContent="flex-start"
                    px="5"
                    py={{ base: "2", xl: "5" }}
                    fontSize={{ base: "sm", xl: "32px" }}
                  >
                    Athlete
                  </Button>
                </Link>
              )}
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
