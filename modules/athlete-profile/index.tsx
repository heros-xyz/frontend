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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Else, If, Then } from "react-if";
import { useEffect, useState } from "react";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";
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
import { ITimeLineInfo } from "@/components/ui/Timeline";
import { getImageLink } from "@/utils/link";
import CareerJourney from "./career-journey";

import { Interaction } from "./interactions/Interaction";
import { Profile } from "./profile";

const TABS = ["Profile", "Interactions", "Career Journey", "Memberships"];

const AthleteProfile = () => {
  const { data: session } = useSession();
  const [journeyData, setJourneyData] = useState<ITimeLineInfo[]>([]);
  const { data: pageInfo } = useGetPageInformationQuery("");
  const { data: basicInfo } = useGetBasicInformationQuery("");
  const { data: sportProfile } = useGetSportProfileQuery("");
  const { data: careerJourneyData } = useGetCareerJourneyQuery(
    session?.user?.id as string,
    { skip: typeof session?.user?.id !== "string" }
  );
  const { data: tierMembershipList } = useGetAthleteTierMembershipQuery({});

  const [currentTab, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );

  useEffect(() => {
    if (careerJourneyData) {
      setJourneyData(careerJourneyData);
    }
  }, [careerJourneyData]);

  return (
    <Box as="section" bg="white" minH="100vh">
      <Flex as="header" alignItems="center" gap="5" position="relative" p={5}>
        <Image
          src={getImageLink(session?.user?.avatar)}
          w="60px"
          h="60px"
          alt="user-avatar"
          rounded="full"
          fallbackSrc="https://via.placeholder.com/50"
          objectFit="cover"
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
                {basicInfo?.nickName}
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
            {pageInfo?.tagLine}
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
          overflowX="scroll"
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
            <Profile isEdit basicInfo={basicInfo} sportProfile={sportProfile} />
          </TabPanel>
          <TabPanel p={{ base: "4px", xl: "0" }}>
            <Interaction />
          </TabPanel>
          <TabPanel p={{ base: 5, lg: 0 }}>
            <CareerJourney data={journeyData} />
          </TabPanel>
          <TabPanel px={{ base: 5, lg: 0 }} py={{ base: 0, lg: 2 }}>
            <If condition={!tierMembershipList?.data?.length}>
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

                <BronzeTier
                  title="Bronze"
                  checked={false}
                  data={tierMembershipList?.data?.[0] as IMembershipTier}
                />
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
