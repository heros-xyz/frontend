import {
  Box,
  Button,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { LegacyRef, useEffect } from "react";
import { If, Then } from "react-if";
import { useRouter } from "next/router";
import FindHeros from "@components/ui/FindHeros";
import { Profile } from "@/modules/athlete-profile/profile";
import Interactions from "@/modules/athlete-profile/interactions";
import BasicInfoAthlete from "@/modules/athlete-profile/banner-info";
import MembershipSubscribe from "@/modules/athlete-profile/membership";
import CareerJourney from "@/modules/athlete-profile/career-journey";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import FanOnlyModal from "@/components/modal/FanOnlyModal";
import { useUser } from "@/hooks/useUser";
import { AthleteProfile } from "@/libs/dtl/athleteProfile";

interface IFanAthleteProfileProps {
  showFindHeros?: boolean;
  athleteProfile: AthleteProfile | undefined;
}

const TABS = ["Profile", "Interactions", "Career Journey", "Subscribe"];

const FanAthleteProfile: React.FC<IFanAthleteProfileProps> = ({
  showFindHeros = true,
  athleteProfile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { isAdmin, user } = useUser();
  const { query, pathname } = router;
  const {
    basicInfo,
    currentTab,
    tierMembershipList,
    totalSubData,
    validateIsFan,
    journeyData,
    navigationBarRef,
    sportProfile,
    athleteId,
    handleSubscribe,
    setCurrentTab,
    loadingJourneys,
    loadingAthleteProfile,
    loadingMemberships,
  } = useAthleteProfile();

  const onClickDownButton = () => {
    if (navigationBarRef && navigationBarRef.current) {
      navigationBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  useEffect(() => {
    if (query.showJoinNow) {
      onOpen();
      router.push({
        pathname,
        query: {
          id: athleteId,
          current: query.current,
        },
      });
    }
  }, []);

  const onSubscribe = () => {
    handleSubscribe();
    onClickDownButton();
  };

  useEffect(() => {
    if (currentTab === 3 && !isAdmin) {
      onClickDownButton();
    }
  }, [query, isAdmin]);

  if (loadingJourneys || loadingAthleteProfile || loadingMemberships) {
    return <></>;
  }

  console.log({
    basicInfo,
    tierMembershipList,
    journeyData,
    sportProfile,
  });

  return (
    <Box
      as="section"
      bg="white"
      minH="100vh"
      w="100%"
      mt={{ lg: showFindHeros ? 0 : 4 }}
    >
      <If condition={showFindHeros}>
        <Then>
          <Box px={{ base: "20px", lg: 0 }} mb={{ lg: "30px" }}>
            <FindHeros />
          </Box>
        </Then>
      </If>
      <BasicInfoAthlete
        image={athleteProfile?.avatar ?? ""}
        nickname={basicInfo?.nickName ?? ""}
        fans={totalSubData?.total ?? 0}
        tagline={athleteProfile?.tagline ?? ""}
        countryCode={basicInfo?.nationality?.twoLetterCode ?? ""}
        sport={athleteProfile?.sport.label ?? ""}
        onClickDownButton={onClickDownButton}
        onSubscribe={!validateIsFan ? onSubscribe : undefined}
        role={user?.profileType}
      />
      <Tabs
        onChange={setCurrentTab}
        isLazy={true}
        lazyBehavior="keepMounted"
        ref={navigationBarRef as LegacyRef<HTMLDivElement> | undefined}
        index={currentTab}
        minH="90vh"
      >
        <TabList
          overflowX="auto"
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
              isEdit={false}
              basicInfo={basicInfo}
              sportProfile={sportProfile ?? null}
              athleteId={athleteId ?? ""}
              athleteNickname={basicInfo?.nickName ?? ""}
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
            <If condition={!validateIsFan && !isAdmin}>
              <Then>
                <Center w="full" justifyContent={{ xl: "right" }}>
                  <Button
                    bg="secondary"
                    color="primary"
                    w={{ base: "full", xl: "auto" }}
                    onClick={onSubscribe}
                    _hover={{}}
                    fontSize={{ xl: "xl" }}
                  >
                    Subscribe
                  </Button>
                </Center>
              </Then>
            </If>
          </TabPanel>
          <TabPanel p={{ xl: "unset" }} px={{ base: 5, xl: "unset" }}>
            <MembershipSubscribe
              listMembershipTiers={tierMembershipList || []}
              validateIsFan={validateIsFan ?? false}
              athleteNickname={basicInfo?.nickName ?? ""}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FanOnlyModal
        isOpen={isOpen}
        onClose={onClose}
        onClickDownButton={onClickDownButton}
      />
    </Box>
  );
};

export default FanAthleteProfile;
