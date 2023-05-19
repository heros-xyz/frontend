import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC,useEffect, useMemo } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Progress from "@/components/common/Progress";
import { ArrowRight } from "@/components/svg/ArrowRight";
import Checklist, { ChecklistProps } from "@/components/ui/Checklist";
import { useAuthContext } from "@/context/AuthContext";
import { useGetCareerJourneyCount } from "@/libs/dtl/careerJourney";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";
import useUpdateDoc from "@/hooks/useUpdateDoc";

const CHECK_LIST: ChecklistProps[] = [
  {
    title: "Personal Information",
    description: "Help your fan & followers know you better personally.",
    type: "basic",
    checked: false,
    responseType: "hasBasicInformation",
    link: "basic-information",
  },
  {
    title: "Page Information",
    description:
      "Make sure you paint a compelling picture of how they can join you on this journey.",
    type: "page",
    checked: false,
    responseType: "hasPageInformation",
    link: "page-information",
  },
  {
    title: "Sport Profile",
    description:
      "Fan will appreciate more if they know how hard you trained & worked to be the best!",
    type: "sport",
    checked: false,
    responseType: "hasSportProfile",
    link: "sport-profile",
  },
  {
    title: "Career Journey",
    description: "Share with fan the incredible achievements you have.",
    type: "career",
    checked: false,
    responseType: "hasCareerJourney",
    link: "career-journey",
  },
];

function useOnboardingInformation() {
  const { userProfile: user } = useAuthContext();
  const { athleteProfile, loading } = useGetAthleteProfile();
  // Basic Information
  // If has User(nationality,gender,birthday | dateOfBirth) user/${uid}
  // AthleteProfile (story) => athleteProfile/{uid}
  const hasBasicInformation = Boolean(
    !!user?.nationality &&
      user?.gender &&
      user?.dateOfBirth &&
      athleteProfile?.story
  );

  // Page Information
  // AthleteProfile (tagline, tags) => athleteProfile/{uid}
  const hasPageInformation = Boolean(
    athleteProfile?.tagline && athleteProfile?.tags
  );

  // Sport Profile
  // AthleteProfile (sport, currentTeam, goal) => athleteProfile/{uid}
  const hasSportProfile = Boolean(
    athleteProfile?.sport && athleteProfile?.goal && athleteProfile?.currentTeam
  );

  // Career Journey
  // at least one career journey careerJourneys/{_id} where careerJourney.uid == user.uid
  const hasCareerJourney = Boolean(useGetCareerJourneyCount());

  return {
    data: {
      hasBasicInformation,
      hasCareerJourney,
      hasPageInformation,
      hasSportProfile,
    },
    isLoading: loading,
  };
}

const AthleteChecklist: FC = () => {
  const {
    data: onboardingInformation,
    isLoading: isGettingOnboardingInformation,
  } = useOnboardingInformation();
  const { userProfile } = useAuthContext();
  const { updateDocument } = useUpdateDoc();

  const PROGRESS_POINT = useMemo(() => {
    if (!onboardingInformation) return 0;
    const obj = Object.values(onboardingInformation);
    return (obj.filter(Boolean).length / obj.length) * 100;
  }, [onboardingInformation]);

  const renderProgressMessage = () => {
    switch (PROGRESS_POINT) {
      case 0:
        return "Let's get started!";
      case 25:
        return "Keep it up!";
      case 50:
        return "Almost there!";
      case 75:
        return "One more step!";
      case 100:
        return "Congratulations!";
      default:
        return;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (Object.values(onboardingInformation).every(Boolean)) {
          await updateDocument(`user/${userProfile?.uid}`, {
            isFinishOnboarding: true,
          });
        }
      } catch (error) {}
    })();
  }, [onboardingInformation]);

  return (
    <Box as="section" bg="white" minH="100vh">
      <Head>
        <title>Athlete | Checklist</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "xl"]}>
        <Flex flexDirection="column">
          <Stack
            my={{ base: "30px", xl: "60px" }}
            direction={["column", "row-reverse"]}
            justifyContent={{ xl: "space-between" }}
          >
            <Flex
              as="header"
              alignItems="center"
              gap="20px"
              flexDirection={{ xl: "row-reverse" }}
            >
              <Image
                src={userProfile?.avatar ?? ""}
                w="60px"
                h="60px"
                alt="avatar"
                rounded="full"
                objectFit="cover"
                fallbackSrc="/images/DefaultAvaCircle.png"
              />
              <Text
                as="p"
                color="primary"
                fontWeight={700}
                fontSize="1.25rem"
                lineHeight="1.75rem"
              >
                {userProfile?.nickname ?? ""}
              </Text>
            </Flex>
            <Text
              as="p"
              fontWeight={800}
              fontSize={{ base: "md", xl: "3xl" }}
              alignSelf={{ xl: "end" }}
              lineHeight="22px"
              color="primary"
            >
              Share your story with your followers!
            </Text>
          </Stack>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(4, 1fr)" }}
            gap="20px"
          >
            {CHECK_LIST.map((props) => (
              <Box
                key={props.type}
                order={onboardingInformation?.[props.responseType] ? 2 : 1}
              >
                <Checklist
                  {...props}
                  checked={!!onboardingInformation?.[props.responseType]}
                />
              </Box>
            ))}
          </Grid>
          <Progress
            isIndeterminate={isGettingOnboardingInformation}
            mt={{ base: "50px", xl: "60px" }}
            mb={{ base: "15px", xl: "20px" }}
            value={PROGRESS_POINT}
          />
          <Text
            fontWeight={500}
            fontSize={{ base: "sm", xl: 14 }}
            mb={{ base: "50px" }}
            lineHeight="16px"
            textAlign="center"
            as="p"
            color="primary"
            display={isGettingOnboardingInformation ? "none" : "block"}
          >
            {`${PROGRESS_POINT}% completion. ${renderProgressMessage()}`}
          </Text>
          {PROGRESS_POINT === 100 && (
            <Link
              href="/athlete"
              w="100%"
              as={NextLink}
              textAlign={{ xl: "center" }}
            >
              <Button
                variant="primary"
                w={{ base: "100%", xl: "240px" }}
                placeSelf={{ xl: "center" }}
              >
                Go to homepage <ArrowRight w={8} />
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default AthleteChecklist;
