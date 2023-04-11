import { Box, Container } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { useSearchAthleteProfileQuery } from "@/api/athlete";
import SearchResult from "@/components/ui/SearchResult";
import FindHeros from "@/components/ui/FindHeros";
import { wrapper } from "@/store";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { setContext } from "@/libs/axiosInstance";
import { IGuards } from "@/types/globals/types";
import { IAthleteSearchProfile } from "@/types/athlete/types";

const AllResult = () => {
  const router = useRouter();

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

  const { data: searchData } = useSearchAthleteProfileQuery({
    searching: defaultValue?.toLocaleLowerCase(),
    page: currentPage,
    take: TAKE,
  });

  useEffect(() => {
    if (searchData) {
      setCurrentData((prev) => [...prev, ...searchData?.data]);
      setHasNextPage(searchData.meta.hasNextPage);
    }
  }, [searchData]);

  useEffect(() => {
    setCurrentData([]);
  }, [defaultValue]);
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
