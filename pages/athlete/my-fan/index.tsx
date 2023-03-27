import { Box, Container, Text, useOutsideClick } from "@chakra-ui/react";
import { ReactElement, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import SearchFan from "@components/ui/SearchFan/index";
import YourAthletesList from "@/components/ui/FanOfAthletes/List/index";
import useDebounce from "@/hooks/useDebounce";
import SearchFanSuggestionsList from "@/components/ui/SearchFanSuggestions/List";
import FanOfAthleteProfile from "@/components/ui/FanOfAthletes/Profile";
import { useGetListFansQuery } from "@/api/athlete";
import { IFanInfo } from "@/types/athlete/types";
import { setContext } from "@/libs/axiosInstance";
import { wrapper } from "@/store";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const MyFan = () => {
  const router = useRouter();
  const refSearch = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [showAllValue, setShowAllValue] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IFanInfo>();
  const [isOpenFanProfile, setIsOpenFanProfile] = useState(false);
  const searchValueDebounced = useDebounce(searchValue, 500);

  useOutsideClick({
    ref: refSearch,
    handler: () => {
      if (!isOpenFanProfile) {
        setFocusSearch(false);
      }
    },
  });

  const isSearching = useMemo(() => {
    return Boolean(showAllValue);
  }, [showAllValue]);

  const { data: athleteList } = useGetListFansQuery({
    page: 1,
    fanName: showAllValue?.toLocaleLowerCase(),
  });

  const { data: athleteSearchList } = useGetListFansQuery(
    {
      page: 1,
      take: 5,
      fanName: searchValueDebounced?.toLocaleLowerCase(),
    },
    { skip: searchValue.length <= 1, refetchOnMountOrArgChange: false }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  };

  const onFocus = () => setFocusSearch(true);

  const onShowAllResult = () => {
    setShowAllValue(searchValue);
    setFocusSearch(false);
  };

  const onShowFanProfile = (item: IFanInfo) => {
    router.push(`/athlete/my-fan?id=${item.id}`);
    setSelectedItem(item);
    setIsOpenFanProfile(true);
  };

  useUpdateEffect(() => {
    if (!router.query?.id) {
      setIsOpenFanProfile(false);
    }
  }, [router.query]);

  return (
    <Box minH={{ base: "95vh", lg: "100vh" }}>
      <Head>
        <title>Athlete | My Fans</title>
      </Head>
      <Container
        size={["base", "sm", "md", "lg", "500px"]}
        pt={{ base: "10px", lg: "32px" }}
      >
        <Box position="sticky" top={0} zIndex={10}>
          <Text
            pt={{ base: "10px", lg: "32px" }}
            fontFamily="heading"
            fontWeight="bold"
            fontSize={{ base: "20px", lg: "24px" }}
            color="primary"
            lineHeight="28px"
            textTransform="capitalize"
          >
            My Fans
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            ref={refSearch}
          >
            <SearchFan
              w="full"
              placeholder="Search Fans"
              handleChange={handleChange}
              onFocus={onFocus}
              onKeyUp={(e) => {
                if (e.key === "Enter" && searchValue.length > 1) {
                  onShowAllResult();
                  return;
                }
                onFocus();
              }}
            />
            <Box w="full" position="relative">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  {searchValue.length > 1 && focusSearch && (
                    <SearchFanSuggestionsList
                      w="full"
                      zIndex={15}
                      top={{ base: 5, lg: 8 }}
                      position="absolute"
                      buttonName={"See all results"}
                      searchKeyword={searchValue}
                      items={athleteSearchList || []}
                      onShowAllResult={onShowAllResult}
                      onSelectedItem={onShowFanProfile}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </Box>
            <Box w="full" position="relative">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  {searchValue.length > 1 &&
                    focusSearch &&
                    !athleteSearchList?.length && (
                      <Box
                        w="full"
                        zIndex={15}
                        top={{ base: 5, lg: 8 }}
                        position="absolute"
                        bg="acccent.4"
                        p="3"
                        borderRadius="base"
                        textAlign={"center"}
                        fontWeight="bold"
                        cursor="pointer"
                        fontSize={{ base: "sm", lg: "md" }}
                        onClick={onShowAllResult}
                        shadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                        background="white"
                      >
                        No Result Found
                      </Box>
                    )}
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
        <YourAthletesList
          w="100%"
          athleteList={athleteList || []}
          role="ATHLETE"
          onSelectedItem={onShowFanProfile}
          isSearching={isSearching}
        />
        <FanOfAthleteProfile
          fanInfo={selectedItem}
          isOpen={isOpenFanProfile}
          onClose={() => {
            setIsOpenFanProfile(false);
            router.push("/athlete/my-fan");
          }}
        />
      </Container>
    </Box>
  );
};

export default MyFan;

MyFan.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
