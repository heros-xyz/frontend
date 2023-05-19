import { Box, Container } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import SearchResult from "@/components/ui/SearchResult";
import FindHeros from "@/components/ui/FindHeros";
import { wrapper } from "@/store";
import { IGuards } from "@/types/globals/types";
import { IAthleteSearchProfile } from "@/types/athlete/types";
import { setTokenToStore } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";

const AllResult = () => {
  const router = useRouter();
  const { isFan } = useUser();
  const TAKE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<IAthleteSearchProfile[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string>(
    (router?.query["searchValue"] as string) || ""
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const onChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
  };

  const { data: searchData } = {
    data: { data: [], meta: { hasNextPage: false } },
  };

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
      setCurrentData((prev) => [...prev, ...searchData?.data]);
      setHasNextPage(searchData.meta.hasNextPage);
    }
  }, [searchData]);

  useEffect(() => {
    setCurrentData([]);
  }, [defaultValue]);

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
