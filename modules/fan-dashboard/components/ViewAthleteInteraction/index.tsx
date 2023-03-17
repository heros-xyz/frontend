import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import FindHeros from "@components/ui/FindHeros";
import AthletesLike from "@components/ui/AthletesLike";
import FanStayUpToDate from "@components/ui/FanStayupToDate";
import {
  useGetListAthleteMightLikeQuery,
  useGetListAthleteUpToDateQuery,
  useUpdateAthleteUpToDateMutation,
} from "@/api/fan";

const FanAthleteInteraction = () => {
  const router = useRouter();
  const [idUpToDate, setIdUpToDate] = useState<string>("");
  const { data: dataRecommended } = useGetListAthleteMightLikeQuery("");
  const { data: dataUpToDate } = useGetListAthleteUpToDateQuery("");
  const [updateUpToDate, { isSuccess: successUpToDate }] =
    useUpdateAthleteUpToDateMutation();
  const handleSeeAthleteUptoDate = (id: string) => {
    updateUpToDate(id);
    setIdUpToDate(id);
  };
  const handleSeeAthlete = (id: string) => {
    router.push(`/fan/athlete-profile/${id}`);
  };
  useUpdateEffect(() => {
    if (successUpToDate && idUpToDate) {
      router.push(`/fan/athlete-profile/${idUpToDate}?current=1`);
    }
  }, [successUpToDate]);
  return (
    <Box as="section" bg="primary" minH="100vh" w="100%">
      <Box
        pl={{ base: "10px", lg: 0 }}
        pr={{ base: "20px", lg: 0 }}
        mb={{ lg: "40px" }}
      >
        <FindHeros />
      </Box>
      <If condition={dataUpToDate?.data?.length}>
        <Then>
          <FanStayUpToDate
            data={dataUpToDate?.data || []}
            onClick={handleSeeAthleteUptoDate}
          />
        </Then>
      </If>

      <Box mt={{ lg: "20px" }} pb={{ base: 2, lg: 5 }}>
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
