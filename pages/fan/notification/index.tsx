import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import NotificationFan from "@/components/ui/Fan/Notification";
import FindHeros from "@/components/ui/FindHeros";
import { wrapper } from "@/store";

import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import { ADMIN_ROLE } from "@/utils/constants";
import { RoutePath } from "@/utils/route";
import { setTokenToStore } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";

const FanNotification = () => {
  const { isFan } = useUser();
  return (
    <Box bg="white" minHeight="100vh">
      <Head>
        <title>{`${isFan ? "Fan" : "Admin"} | Notifications`}</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <FindHeros />
      </Container>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <NotificationFan />
      </Container>
    </Box>
  );
};

export default FanNotification;

FanNotification.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => (context) => {
    setTokenToStore(store, context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      if (session?.user.role === ADMIN_ROLE) {
        return {
          redirect: {
            destination: RoutePath.HOME,
            permanent: false,
          },
        };
      }

      return {
        props: {
          session,
        },
      };
    });
  }
);
