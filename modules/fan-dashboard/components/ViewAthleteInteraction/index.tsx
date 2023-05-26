import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import FindHeros from "@components/ui/FindHeros";
import AthletesLike from "@components/ui/AthletesLike";
import FanStayUpToDate from "@components/ui/FanStayupToDate";
import { useUser } from "@/hooks/useUser";
import {
  useGetListAthleteRecommended,
  useGetNotificationsFromAthletes,
} from "@/libs/dtl/athleteProfile";

const FanAthleteInteraction = () => {
  const router = useRouter();
  const { isFan } = useUser();
  const { data: currentData, loading } = useGetNotificationsFromAthletes();
  const { data } = useGetListAthleteRecommended({
    limitAmount: 6,
  });

  const dataRecommended = data?.filter(
    (item) => !currentData.map((i) => i.id)?.includes(item.id)
  );

  const handleSeeAthlete = (id: string) => {
    router.push(`/fan/athlete-profile/${id}`);
  };

  if (loading) {
    return <></>;
  }

  return (
    <Box as="section" bg="white" minH="100vh" w="100%">
      <Box
        pl={{ base: "10px", lg: 0 }}
        pr={{ base: "20px", lg: 0 }}
        mb={{ lg: "40px" }}
      >
        <FindHeros />
      </Box>
      <If condition={currentData?.length}>
        <Then>
          <FanStayUpToDate data={currentData} onClick={handleSeeAthlete} />
        </Then>
      </If>
      <If condition={isFan}>
        <Then>
          <Box mt={{ lg: "20px" }} pb={{ base: 2, lg: 5 }}>
            <AthletesLike
              data={
                dataRecommended?.map((item) => ({
                  ...item,
                  sportName: item.sport.label,
                })) || []
              }
              title="Athletes You Might Also Like:"
              onClick={handleSeeAthlete}
            />
          </Box>
        </Then>
      </If>
    </Box>
  );
};

export default FanAthleteInteraction;
