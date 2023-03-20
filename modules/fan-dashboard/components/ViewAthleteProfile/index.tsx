import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { LegacyRef } from "react";
import FindHeros from "@components/ui/FindHeros";
import { IAthleteProfileResponse } from "@/types/athlete/types";
import { Profile } from "@/modules/athlete-profile/profile";
import Interactions from "@/modules/athlete-profile/interactions";
import BasicInfoAthlete from "@/modules/athlete-profile/banner-info";
import MembershipSubscribe from "@/modules/athlete-profile/membership";
import CareerJourney from "@/modules/athlete-profile/career-journey";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";

interface IFanAthleteProfileProps {
  athleteProfile: IAthleteProfileResponse | undefined;
}

const TABS = ["Profile", "Interactions", "Career Journey", "Memberships"];

const FanAthleteProfile: React.FC<IFanAthleteProfileProps> = ({
  athleteProfile,
}) => {
  const {
    basicInfo,
    currentTab,
    tierMembershipList,
    totalSubData,
    validateIsFan,
    journeyData,
    navigationBarRef,
    sportProfile,
    handleSubscribe,
    setCurrentTab,
  } = useAthleteProfile();

  const onClickDownButton = () => {
    if (navigationBarRef && navigationBarRef.current) {
      navigationBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box as="section" bg="white" minH="100vh" w="100%">
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
        minH="100vh"
      >
        <TabList
          overflowX="scroll"
          overflowY="hidden"
          maxW="100vw"
          className="tabHorizontal"
          border={"none"}
          position="sticky"
          zIndex={8}
          top={"-3px"}
          bg="white"
          px={{ base: 5, lg: 0 }}
          pt={{ base: 3, lg: 4 }}
        >
          {TABS.map((tab, index) => (
            <Tab
              color="primary"
              key={tab}
              whiteSpace="nowrap"
              position="relative"
              pb="5"
              w="full"
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
              athleteNickname={basicInfo?.nickName ?? ""}
              onGoToTag={onClickDownButton}
            />
          </TabPanel>
          <TabPanel p="unset" px={{ base: 5, xl: "unset" }}>
            <CareerJourney data={journeyData} isEdit={false} />
          </TabPanel>
          <TabPanel p={{ xl: "unset" }} px={{ base: 5, xl: "unset" }}>
            <MembershipSubscribe
              listMembershipTiers={tierMembershipList?.data || []}
              validateIsFan={validateIsFan ?? false}
              athleteNickname={basicInfo?.nickName ?? ""}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FanAthleteProfile;
