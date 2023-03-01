import {
  Avatar,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { If, Then } from "react-if";
import {
  useGetBasicInformationQuery,
  useGetCareerJourneyQuery,
  useGetPageInformationQuery,
  useGetSportProfileQuery,
} from "@/api/athlete";
import { useGetAthleteTierMembershipQuery } from "@/api/fan";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { Setting } from "@/components/svg/Setting";
import BronzeTier from "@/components/ui/Bronze";
import { IMembershipTier } from "@/types/membership/types";
import CareerJourney from "./career-journey";
import { Profile } from "./profile";
import { Interaction } from "./Interaction";

const TABS = ["Profile", "Interaction", "Career Journey", "Membership"];

const AthleteProfile = () => {
  const { data: session } = useSession();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { data: pageInfo } = useGetPageInformationQuery("");
  const { data: basicInfo } = useGetBasicInformationQuery("");
  const { data: sportProfile } = useGetSportProfileQuery("");
  const { data: careerJourneyData } = useGetCareerJourneyQuery("");
  const { data: tierMembershipList } = useGetAthleteTierMembershipQuery({});

  return (
    <Box as="section" bg="primary" minH="100vh">
      <Flex as="header" alignItems="center" gap="5" position="relative" p={5}>
        <Avatar size="xl" src={session?.user?.avatar || ""} w="60px" h="60px" />
        <Box w="full">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="10ch"
                as="p"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="3xl"
                mr={2}
              >
                {session?.user.firstName} {session?.user.lastName}
              </Text>
              {currentTab === 0 && <EditIcon color="white" cursor="pointer" />}
            </Flex>
            <Link href="/athlete/my-profile/settings">
              <Setting />
            </Link>
          </Flex>
          <Text color="white">{pageInfo?.tagLine}</Text>
        </Box>
      </Flex>
      <Tabs onChange={setCurrentTab} isLazy={true} lazyBehavior="keepMounted">
        <TabList
          overflowX="scroll"
          overflowY="hidden"
          maxW="100vw"
          className="tabHorizontal"
          border={"none"}
        >
          {TABS.map((tab, index) => (
            <Tab
              color="white"
              key={tab}
              whiteSpace="nowrap"
              position="relative"
              pb="4"
              border={"none"}
              fontSize={{ base: "sm", lg: "lg" }}
              _selected={{ color: "acccent.3" }}
              _before={{
                content: '""',
                display: "inline-block",
                mr: "5px",
                bgColor: currentTab === index ? "acccent.3" : "white",
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
            <Profile isEdit basicInfo={basicInfo} sportProfile={sportProfile} />
          </TabPanel>
          <TabPanel p={{ base: "4px", xl: "0" }}>
            <Interaction />
          </TabPanel>
          <TabPanel p={{ base: 5, lg: 0 }}>
            <CareerJourney data={careerJourneyData} />
          </TabPanel>
          <TabPanel px={{ base: 5, lg: 0 }} py={{ base: 0, lg: 2 }}>
            <Text
              fontSize={{ base: "xs", lg: "md" }}
              fontWeight="normal"
              mt={{ base: 2 }}
            >
              Here you’ll see the membership tiers you are offering and the
              number of active fans.
            </Text>
            <Link href="/athlete/membership/listing">
              <Text
                py={{ base: 4, lg: 7 }}
                color="secondary"
                textDecoration="underline"
                fontSize={{ base: "sm", lg: "lg" }}
              >
                Edit Tiers
              </Text>
            </Link>
            <If condition={tierMembershipList?.data?.length}>
              <Then>
                <BronzeTier
                  title="Bronze"
                  checked={false}
                  data={tierMembershipList?.data?.[0] as IMembershipTier}
                />
              </Then>
            </If>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AthleteProfile;
