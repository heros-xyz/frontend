import { useRouter } from "next/router";
import { useRef } from "react";
import { withDefault, NumberParam, useQueryParam } from "use-query-params";
import { useCareerJourneysFromAthlete } from "@/libs/dtl/careerJourney";
import { useMembershipsFromAthlete } from "@/libs/dtl/membershipTiers";
import { useGetAthleteProfileByUid } from "@/libs/dtl/athleteProfile";
import { IBasicInfo } from "@/types/athlete/types";
import { useValidateIsFan } from "@/libs/dtl/suscription";

export const useAthleteProfile = () => {
  const { query } = useRouter();
  const navigationBarRef = useRef<null | HTMLElement>(null);
  const [currentTab, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );

  const { data: journeyData, loading: loadingJourneys } = useCareerJourneysFromAthlete(query.id as string)
  const { data: athleteProfile, loading } = useGetAthleteProfileByUid(query.id as string)

  const basicInfo: IBasicInfo = {
    firstName: athleteProfile?.firstName ?? "",
    gender: athleteProfile?.gender ?? 0,
    lastName: athleteProfile?.lastName ?? "",
    middleName: athleteProfile?.middleName ?? "",
    nickName: athleteProfile?.nickName ?? "",
    story: athleteProfile?.story,
  }

  const sportProfile = {
    currentTeam: athleteProfile?.currentTeam ?? "",
    goal: athleteProfile?.goal,
    sport: athleteProfile?.sport,
  }

  const { data: tierMembershipList, loading: loadingMemberships } = useMembershipsFromAthlete(query.id as string)
  const validateIsFan = useValidateIsFan(query.id as string)
  const totalSubCount = athleteProfile?.totalSubCount ?? 0;


  const handleSubscribe = () => {
    setCurrentTab(3);
  };

  return {
    navigationBarRef,
    validateIsFan,
    totalSubCount,
    tierMembershipList: tierMembershipList?.map(tier => ({ ...tier, benefits: tier.benefits.map(i => ({ value: i.key, label: i.label })) })),
    sportProfile,
    basicInfo,
    journeyData,
    currentTab,
    athleteId: query.id as string,
    handleSubscribe,
    setCurrentTab,
    loadingJourneys,
    loadingAthleteProfile: loading,
    loadingMemberships
  };
};
