import Head from "next/head";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Box, Center, Text, Container } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import {
  DocumentSnapshot,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import FindHeros from "@/components/ui/FindHeros";
import FanDashboardLayout from "@/layouts/FanDashboard";
import FanInteractions from "@/components/ui/FanLatestInteractions";
import { wrapper } from "@/store";
import { setContext, setToken } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import MyAthletes from "@/modules/fan-dashboard/components/MyAthletes";
import {
  getLatestInteraction,
  getRunningQueriesThunk,
  useGetLatestInteractionQuery,
} from "@/api/fan";
import { db } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
interface IFanDashboardProps {
  isFirstLogin: boolean;
  data: any[];
}

const FanDashboard = ({ isFirstLogin, data }: IFanDashboardProps) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const onChange = useCallback((el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
  }, []);

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Fan | Homepage</title>
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
      </Container>
    </Box>
  );
};

export default FanDashboard;

FanDashboard.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};

/* export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setContext(context);

    const access_token = getCookie("_Auth.access-token", {
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

    // query from the users collection the doc that have field role === "ATHLETE"

    const users = collection(db, "users");
    const queryRef = query(users, where("role", "==", "ATHLETE"));
    const docs = (await getDocs(queryRef))?.docs?.map?.(
      (doc: DocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
          isFirstLogin: isFirstLogin ?? false,
          data: docs,
        },
      };
    });
  }
); */
