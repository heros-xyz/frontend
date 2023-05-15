import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "react-use";
import FindHeros from "@components/ui/FindHeros";
import AthletesLike from "@components/ui/AthletesLike";
import FanStayUpToDate from "@components/ui/FanStayupToDate";
import {
  useGetListAthleteMightLikeQuery,
  useGetListAthleteUpToDateQuery,
  useUpdateAthleteUpToDateMutation,
} from "@/api/fan";
import { IAthleteUpToDate } from "@/types/athlete/types";
import { useUser } from "@/hooks/useUser";

const FanAthleteInteraction = () => {
  const router = useRouter();
  const { isFan } = useUser();
  const [idUpToDate, setIdUpToDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteUpToDate[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const { data: dataRecommended } = useGetListAthleteMightLikeQuery("", {
    skip: !isFan,
  });
  const { data: dataUpToDate } = useGetListAthleteUpToDateQuery({
    page: currentPage,
    take: 10,
  });

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

  useEffect(() => {
    if (dataUpToDate) {
      setCurrentData((prev) => [...prev, ...dataUpToDate.data]);
      setHasNextPage(dataUpToDate.meta.hasNextPage);
    }
  }, [dataUpToDate]);
  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentData([]);
    setCurrentPage(1);
  }, []);

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
          <FanStayUpToDate
            data={currentData || []}
            onClick={handleSeeAthleteUptoDate}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
          />
        </Then>
      </If>

      <If condition={isFan}>
        <Then>
          <Box mt={{ lg: "20px" }} pb={{ base: 2, lg: 5 }}>
            <AthletesLike
              data={dataRecommended || []}
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
