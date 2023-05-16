import {
  Box,
  Button,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Else, If, Then } from "react-if";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { Setting } from "@/components/svg/Setting";
import BronzeTier from "@/components/ui/Bronze";
import { useAuthContext } from "@/context/AuthContext";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";
import { useCareerJourneys } from "@/libs/dtl/careerJourney";
import { useMembershipTiersAsMaker } from "@/libs/dtl/membershipTiers";
import CareerJourney from "./career-journey";

import { Interaction } from "./interactions/Interaction";
import { Profile } from "./profile";

const TABS = ["Profile", "Interactions", "Career Journey", "Subscribe"];

const AthleteProfile = () => {
  const { userProfile } = useAuthContext();
  const { athleteProfile } = useGetAthleteProfile();
  const basicInfo = {
    nickName: athleteProfile?.nickName,
    dateOfBirth: userProfile?.dateOfBirth,
    firstName: userProfile?.firstName,
    gender: userProfile?.gender,
    lastName: userProfile?.lastName,
    middleName: userProfile?.middleName,
    nationality: userProfile?.nationality,
    story: athleteProfile?.story,
  };
  const sportProfile = {
    currentTeam: athleteProfile?.currentTeam,
    goal: athleteProfile?.goal,
    sport: athleteProfile?.sport,
  };
  const { journeys: journeyData } = useCareerJourneys();
  const { data: tierMembershipList, loading: loadingMemberships } =
    useMembershipTiersAsMaker();
  const [currentTab, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );

  if (loadingMemberships) {
    return <></>;
  }

  return (
    <Box as="section" bg="white" minH="100vh">
      <Flex as="header" alignItems="center" gap="5" position="relative" p={5}>
        <Image
          src={userProfile?.avatar}
          w="60px"
          h="60px"
          alt="user-avatar"
          rounded="full"
          objectFit="cover"
          fallbackSrc="/images/DefaultAvaCircle.png"
        />
        <Box w="full" flex={1}>
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="10ch"
                as="p"
                color="primary"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="3xl"
                mr={2}
              >
                {athleteProfile?.nickName}
              </Text>
              {currentTab === 0 && (
                <Link href={"/athlete/my-profile/edit-page-info"}>
                  <EditIcon color="primary" cursor="pointer" mb="6px" />
                </Link>
              )}
            </Flex>
            <Link href="/athlete/my-profile/settings">
              <Setting color="primary" w="20px" h="20px" />
            </Link>
          </Flex>
          <Text color="primary" wordBreak="break-word">
            {athleteProfile?.tagline}
          </Text>
        </Box>
      </Flex>
      <Tabs
        onChange={setCurrentTab}
        isLazy={true}
        lazyBehavior="keepMounted"
        index={currentTab}
      >
        <TabList
          overflowX="auto"
          overflowY="hidden"
          maxW="100vw"
          className="tabHorizontal"
          border={"none"}
        >
          {TABS.map((tab, index) => (
            <Tab
              color="primary"
              key={tab}
              whiteSpace="nowrap"
              position="relative"
              pb="4"
              border={"none"}
              fontSize={{ base: "sm", lg: "lg" }}
              fontWeight="medium"
              _selected={{ color: "secondary", fontWeight: "bold" }}
              _before={{
                content: '""',
                display: "inline-block",
                mr: "5px",
                bgColor: currentTab === index ? "secondary" : "primary",
                w: "101%",
                h: "4px",
                position: "absolute",
                bottom: 0,
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt="5" color="white">
          <TabPanel p="unset">
            <Profile
              isEdit
              basicInfo={basicInfo}
              sportProfile={sportProfile}
              athleteId={userProfile?.uid ?? ""}
              athleteNickname={athleteProfile?.nickName ?? ""}
            />
          </TabPanel>
          <TabPanel p={{ base: "4px", xl: "0" }}>
            <Interaction />
          </TabPanel>
          <TabPanel p={{ base: 5, lg: 0 }}>
            <CareerJourney data={journeyData ?? []} />
          </TabPanel>
          <TabPanel px={{ base: 5, lg: 0 }} py={{ base: 0, lg: 2 }}>
            <If condition={tierMembershipList?.length}>
              <Then>
                <Text
                  fontSize={{ base: "xs", lg: "md" }}
                  fontWeight="normal"
                  mt={{ base: 2 }}
                  color="primary"
                >
                  Here you&apos;ll see the membership tiers you are offering and
                  the number of active fans.
                </Text>
                <Link href="/athlete/membership/listing">
                  <Text
                    py={{ base: 4, lg: 7 }}
                    color="grey.200"
                    textDecoration="underline"
                    fontSize={{ base: "sm", lg: "lg" }}
                  >
                    Edit Tiers
                  </Text>
                </Link>
                {!!tierMembershipList && (
                  <BronzeTier
                    title="Bronze"
                    checked={false}
                    data={tierMembershipList?.[0]}
                  />
                )}
              </Then>
              <Else>
                <Box textAlign={{ base: "left", lg: "center" }}>
                  <Text
                    mb={{ base: 4, lg: 12 }}
                    fontSize={{ base: "xs", lg: "md" }}
                    color="primary"
                  >
                    You have not had any membership tiers.
                  </Text>
                  <Link href="/athlete/membership/add">
                    <Button
                      variant="secondary"
                      size={"lg"}
                      w={{ base: "full", lg: "fit-content" }}
                    >
                      Add Tier
                    </Button>
                  </Link>
                </Box>
              </Else>
            </If>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AthleteProfile;
