import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import FindHeros from "@components/ui/FindHeros";
import AthletesLike from "@components/ui/AthletesLike";
import FanStayUpToDate from "@components/ui/FanStayupToDate";
import {
  useGetListAthleteMightLikeQuery,
  useGetListAthleteUpToDateQuery,
} from "@/api/fan";

const FanAthleteInteraction = () => {
  const router = useRouter();
  const { data: dataRecommended } = useGetListAthleteMightLikeQuery("");
  const { data: dataUpToDate } = useGetListAthleteUpToDateQuery("");

  const handleSeeAthleteUptoDate = (id: string) => {
    router.push(`/fan/athlete-profile/${id}?current=1`);
  };
  const handleSeeAthlete = (id: string) => {
    router.push(`/fan/athlete-profile/${id}`);
  };

  return (
    <Box as="section" bg="primary" minH="100vh" w="100%">
      <Box
        pl={{ base: "10px", lg: 0 }}
        pr={{ base: "20px", lg: 0 }}
        mb={{ lg: "40px" }}
      >
        <FindHeros />
      </Box>
      <FanStayUpToDate
        data={dataUpToDate?.data || []}
        onClick={handleSeeAthleteUptoDate}
      />
      <Box mt={{ lg: "20px" }} pb={{ base: "80px", lg: "50px" }}>
        <AthletesLike
          data={dataRecommended || []}
          title="Athletes You Might Also Like:"
          onClick={handleSeeAthlete}
        />
      </Box>
    </Box>
  );
};

export default FanAthleteInteraction;
