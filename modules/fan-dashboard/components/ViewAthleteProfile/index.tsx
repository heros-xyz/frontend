import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LegacyRef, useRef } from "react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import FindHeros from "@components/ui/FindHeros";
import { IAthleteProfileResponse } from "@/types/athlete/types";
import { Profile } from "@/modules/athlete-profile/profile";
import Interactions from "@/modules/athlete-profile/interactions";
import {
  useGetAthleteBasicInfoQuery,
  useGetAthleteSportProfileQuery,
  useGetAthleteTierMembershipQuery,
} from "@/api/fan";
import BasicInfoAthlete from "@/modules/athlete-profile/banner-info";
import MembershipSubscribe from "@/modules/athlete-profile/membership";
import {
  useGetTotalSubscriptionQuery,
  useGetValidateIsFanQuery,
} from "@/api/athlete";

interface IFanAthleteProfileProps {
  athleteProfile: IAthleteProfileResponse | undefined;
}

const TABS = ["Profile", "Interactions", "Career Journey", "Membership"];

const FanAthleteProfile: React.FC<IFanAthleteProfileProps> = ({
  athleteProfile,
}) => {
  const { query } = useRouter();
  const navigationBarRef = useRef<null | HTMLElement>(null);
  const [currentTab, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );

  // const { data: careerJourneyData } = useGetCareerJourneyQuery("");
  const { data: basicInfo } = useGetAthleteBasicInfoQuery(query.id as string, {
    skip: typeof query.id !== "string",
  });
  const { data: sportProfile } = useGetAthleteSportProfileQuery(
    query.id as string,
    {
      skip: typeof query.id !== "string",
    }
  );
  const { data: tierMembershipList } = useGetAthleteTierMembershipQuery(
    {
      page: 1,
      take: 10,
      userId: query.id as string,
    },
    {
      skip: typeof query.id !== "string",
    }
  );

  const onClickDownButton = () => {
    if (navigationBarRef && navigationBarRef.current) {
      navigationBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const { data: totalSubData } = useGetTotalSubscriptionQuery(
    query.id as string,
    {
      skip: typeof query.id !== "string",
    }
  );
  const { data: validateIsFan } = useGetValidateIsFanQuery(query.id as string, {
    skip: typeof query.id !== "string",
    refetchOnMountOrArgChange: true,
  });

  const handleSubscribe = () => {
    setCurrentTab(3);
  };

  return (
    <Box as="section" bg="primary" minH="100vh" w="100%">
      <Box px={{ base: "20px", lg: 0 }} mb={{ lg: "30px" }}>
        <FindHeros />
      </Box>
      <BasicInfoAthlete
        image={athleteProfile?.avatar ?? ""}
        nickname={basicInfo?.nickName ?? ""}
        fans={totalSubData?.total ?? 0}
        tagline={athleteProfile?.tagLine ?? ""}
        countryCode={basicInfo?.nationality?.twoLetterCode ?? ""}
        sport={athleteProfile?.sport ?? ""}
        onClickDownButton={onClickDownButton}
      />
      <Tabs
        onChange={setCurrentTab}
        isLazy={true}
        lazyBehavior="keepMounted"
        ref={navigationBarRef as LegacyRef<HTMLDivElement> | undefined}
        index={currentTab}
      >
        <TabList
          overflowX="scroll"
          overflowY="hidden"
          maxW="100vw"
          className="tabHorizontal"
          border={"none"}
          position="sticky"
          zIndex={8}
          top={0}
          bg="primary"
          px={{ base: 5, lg: 0 }}
          pt={{ base: 3, lg: 4 }}
        >
          {TABS.map((tab, index) => (
            <Tab
              color="white"
              key={tab}
              whiteSpace="nowrap"
              position="relative"
              pb="5"
              w="full"
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
            <Profile
              isEdit={false}
              basicInfo={basicInfo}
              sportProfile={sportProfile}
            />
          </TabPanel>
          <TabPanel p={{ xl: "unset" }} px={{ base: 5, xl: "unset" }}>
            <Interactions
              onSubscribe={handleSubscribe}
              validateIsFan={validateIsFan}
            />
          </TabPanel>
          <TabPanel p="unset" px={{ base: 5, xl: "unset" }}>
            Todo: Sprint 3
            {/* <CareerJourney data={careerJourneyData} isEdit={false} /> */}
          </TabPanel>
          <TabPanel p={{ xl: "unset" }} px={{ base: 5, xl: "unset" }}>
            <MembershipSubscribe
              listMembershipTiers={tierMembershipList?.data || []}
              validateIsFan={validateIsFan ?? false}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FanAthleteProfile;
