import {
  Box,
  Container,
  SkeletonCircle,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { ReactElement, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { If, Then } from "react-if";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import SearchFan from "@components/ui/SearchFan/index";
import YourAthletesList from "@/components/ui/FanOfAthletes/List/index";
import useDebounce from "@/hooks/useDebounce";
import SearchFanSuggestionsList from "@/components/ui/SearchFanSuggestions/List";
import FanOfAthleteProfile from "@/components/ui/FanOfAthletes/Profile";
import { IFanInfo } from "@/types/athlete/types";
import { useGetMyFans } from "@/libs/dtl/subscription";

const MyFan = () => {
  const router = useRouter();
  const refSearch = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [showAllValue, setShowAllValue] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IFanInfo>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
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

  const { loading, data } = useGetMyFans();
  const athleteList = data?.map((subscription) => ({
    avatar: subscription?.takerData?.avatar,
    email: subscription?.takerData?.email,
    fullName: subscription?.takerData?.name,
    athleteId: subscription?.maker,
    expiredDate: new Date(subscription?.expiredDate * 1000),
    id: subscription?.id,
    joinedDate: new Date(subscription?.stripeSubscription?.created * 1000),
  })) as IFanInfo[];
  const athleteSearchList = useMemo(() => {
    return athleteList?.filter((fan) =>
      fan?.fullName.toLowerCase().includes(searchValueDebounced.toLowerCase())
    );
  }, [searchValueDebounced, athleteList, searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  };

  const onFocus = () => setFocusSearch(true);

  const onShowAllResult = () => {
    setCurrentPage(1);
    setHasNextPage(false);
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

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <SkeletonCircle />;
  }

  return (
    <Box minH={{ base: "95vh", lg: "100vh" }}>
      <Head>
        <title>Athlete | My Fans</title>
      </Head>
      <Container
        size={["base", "sm", "md", "lg", "500px"]}
        pt={{ base: "10px", lg: "32px" }}
      >
        <Box top={0} zIndex={10}>
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
          <If condition={athleteList?.length !== 0}>
            <Then>
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
            </Then>
          </If>
        </Box>
        <YourAthletesList
          w="100%"
          athleteList={athleteList || []}
          role="ATHLETE"
          onSelectedItem={onShowFanProfile}
          isSearching={isSearching}
          onLoadMore={onLoadMore}
          hasNextPage={hasNextPage}
          total={athleteList?.length ?? 0}
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
