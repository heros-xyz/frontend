import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { withDefault, NumberParam, useQueryParam } from "use-query-params";
import {
  useGetCareerJourneyQuery,
  useGetTotalSubscriptionQuery,
  useGetValidateIsFanQuery,
} from "@/api/athlete";
import {
  useGetAthleteBasicInfoQuery,
  useGetAthleteSportProfileQuery,
  useGetAthleteTierMembershipQuery,
} from "@/api/fan";
import { ITimeLineInfo } from "@/components/ui/Timeline";

export const useAthleteProfile = () => {
  const { query } = useRouter();
  const navigationBarRef = useRef<null | HTMLElement>(null);
  const [journeyData, setJourneyData] = useState<ITimeLineInfo[]>([]);
  const [currentTab, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );

  const { data: careerJourneyData } = useGetCareerJourneyQuery(
    query.id as string,
    { skip: typeof query.id !== "string" }
  );
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

  useEffect(() => {
    if (careerJourneyData) {
      setJourneyData(careerJourneyData);
    }
  }, [careerJourneyData]);

  const handleSubscribe = () => {
    setCurrentTab(3);
  };

  return {
    navigationBarRef,
    validateIsFan,
    totalSubData,
    tierMembershipList,
    sportProfile,
    basicInfo,
    journeyData,
    currentTab,
    athleteId: query.id as string,
    handleSubscribe,
    setCurrentTab,
  };
};
