import { Box, Container } from "@chakra-ui/react";
import { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import SearchResult from "@/components/ui/SearchResult";
import FindHeros from "@/components/ui/FindHeros";
import { IAthleteSearchProfile } from "@/types/athlete/types";
import { useUser } from "@/hooks/useUser";
import { filterAthletesSearch } from "@/utils/functions";
import { useAllAthletes } from "@/libs/dtl/athleteProfile";
import { useGetMySubscriptions } from "@/libs/dtl/subscription";

const AllResult = () => {
  const router = useRouter();
  const { isFan } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteSearchProfile[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string>(
    (router?.query["searchValue"] as string) || ""
  );
  const { data: mySubscriptions, loading: loadingMySubscriptions } =
    useGetMySubscriptions();
  const [searchValue, setSearchValue] = useState<string>("");
  const onChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value.trim());
  };
  const { data: allAthletes, loading: loadingAllAthletes } = useAllAthletes({
    limitAmount: 100,
  });

  const searchData = useMemo(() => {
    return allAthletes
      ?.filter((athlete) => {
        if (defaultValue === "") return false;
        return filterAthletesSearch(athlete, defaultValue);
      })
      .map((result) => {
        const currentSubscription = mySubscriptions?.find(
          (sub) => sub.maker === result?.id
        );

        return {
          ...result,
          membershipTier: {
            name: currentSubscription?.membershipName,
          },
          totalFan: result?.totalSubCount,
          totalInteractions: result?.totalInteractionCount,
          isCurrentUserSubscribed: Boolean(currentSubscription),
        };
      });
  }, [allAthletes, defaultValue, router?.query["searchValue"]]);


  const onLoadMore = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSeeAll = (el: string) => {
    setDefaultValue(el);
    setHasNextPage(false);
    setCurrentPage(1);
    setSearchValue("");
  };

  useEffect(() => {
    if (searchData) {
      setCurrentData(searchData as unknown as IAthleteSearchProfile[]);
    }
  }, [searchData]);

  useEffect(() => {
    setCurrentData([]);
  }, [defaultValue]);

  if (loadingAllAthletes || loadingMySubscriptions) {
    return <></>;
  }

  return (
    <Container>
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | All Results`}</title>
      </Head>
      <Box m="0 auto" minH="100vh" maxW="500px">
        <Box position="relative">
          <FindHeros
            value={searchValue}
            onChange={onChange}
            onSeeAll={onSeeAll}
          />
          {currentData && (
            <SearchResult
              searchValue={defaultValue}
              data={currentData ?? []}
              mt={{ base: 4, xl: 6 }}
              title={"Search Results"}
              onLoadMore={onLoadMore}
              hasNextPage={hasNextPage}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AllResult;

AllResult.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
