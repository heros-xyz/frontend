import Head from "next/head";
import { ReactElement, useCallback, useState } from "react";
import { Box, Center, Text, Container } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import FindHeros from "@/components/ui/FindHeros";
import FanDashboardLayout from "@/layouts/FanDashboard";
import FanInteractions from "@/components/ui/FanLatestInteractions";
import { wrapper } from "@/store";
import { setToken } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import MyAthletes from "@/modules/fan-dashboard/components/MyAthletes";
import {
  getLatestInteraction,
  getRunningQueriesThunk,
  useGetLatestInteractionQuery,
} from "@/api/fan";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { setTokenToStore } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";
interface IFanDashboardProps {
  isFirstLogin: boolean;
}

const FanDashboard = ({ isFirstLogin }: IFanDashboardProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { isFan } = useUser();
  const onChange = useCallback((el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
  }, []);
  const { data: latestInteraction, isLoading } = useGetLatestInteractionQuery({
    page: 1,
    take: 3,
  });

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | Homepage`}</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box position="relative">
          <FindHeros value={searchValue} onChange={onChange} />
        </Box>
      </Container>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Center
          h="160px"
          bg="linear-gradient(137.89deg, #1E16C1 15.14%, #298ADA 49.2%, #33EFEF 88.63%)"
          color="primary"
          mt={{ xl: 8 }}
          mb={{ xl: 4 }}
          borderRadius={{ lg: "12px" }}
        >
          <Text
            fontSize="xl"
            color="white"
            fontFamily="heading"
            fontWeight={700}
          >
            {isFirstLogin ? "Hello, heros" : "Welcome back, heros"}
          </Text>
        </Center>
      </Container>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box py={5} mb={{ xl: 3 }}>
          <MyAthletes />
        </Box>
        <FanInteractions
          isLoading={isLoading}
          titleHeading="Latest Interactions"
          items={latestInteraction?.data ?? []}
          actionText="View All"
        />
      </Container>
    </Box>
  );
};

export default FanDashboard;

FanDashboard.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setTokenToStore(store, context);
    const access_token = getCookie(ACCESS_TOKEN_KEY, {
      res: context.res,
      req: context.req,
      path: "/",
    }) as string;

    const isFirstLogin = getCookie("_FirstLogin", {
      res: context.res,
      req: context.req,
      path: "/",
    });

    setToken(access_token);

    store.dispatch(
      getLatestInteraction.initiate({
        page: 1,
        take: 3,
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
          isFirstLogin: isFirstLogin ?? false,
        },
      };
    });
  }
);
