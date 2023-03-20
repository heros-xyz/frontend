import { Box, Container } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import Head from "next/head";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { useRouter } from "next/router";
import useDebounce from "@/hooks/useDebounce";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { useSearchAthleteProfileQuery } from "@/api/athlete";
import SearchResult from "@/components/ui/SearchResult";
import FindHeros from "@/components/ui/FindHeros";

const AllResult = () => {
  const router = useRouter();

  const LIMIT = 5;

  const defaultValue: string = (router?.query["searchValue"] as string) || "";
  const [showAllValue, setShowAllValue] = useState(
    (router?.query["searchValue"] as string) || ""
  );
  const [searchValue, setSearchValue] = useQueryParam(
    "searchValue",
    withDefault(StringParam, defaultValue)
  );

  const searchValueDebounced = useDebounce(searchValue, 500);
  const onChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
  };

  const { data } = useSearchAthleteProfileQuery(
    {
      searching: searchValueDebounced?.toLocaleLowerCase(),
      limit: LIMIT,
    },
    { skip: searchValue.length <= 1 }
  );

  const { data: searchData } = useSearchAthleteProfileQuery(
    {
      searching: showAllValue?.toLocaleLowerCase(),
      page: 1,
      limit: 100,
    },
    {
      skip: showAllValue.length <= 1,
    }
  );

  const onSeeAll = () => {
    setShowAllValue(searchValue);
  };

  return (
    <Container>
      <Head>
        <title>Fan | All Results</title>
      </Head>
      <Box m="0 auto" minH="100vh" maxW="500px">
        <Box position="relative">
          <FindHeros
            value={searchValue}
            onChange={onChange}
            onSeeAll={onSeeAll}
          />
          {data && (
            <SearchResult
              searchValue={searchValueDebounced}
              data={searchData ?? []}
              mt={{ base: 4, xl: 6 }}
              title={"Search Results"}
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
