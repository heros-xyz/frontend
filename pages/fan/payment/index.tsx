import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import {
  getPaymentInfo,
  getRunningQueriesThunk,
  useGetPaymentInfoQuery,
} from "@/api/fan";
import PaymentWallet from "@/modules/athlete-dashboard/components/PaymentWallet";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";

const PaymentInfo = () => {
  const router = useRouter();
  const { data: paymentInfoList } = useGetPaymentInfoQuery("");

  const handleAdd = () => {
    router.push("/fan/payment/update");
  };

  const handleBack = () => {
    router.push("/fan/my-profile");
  };

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Fan | Payment Information</title>
      </Head>
      <Container
        py={{ base: 5, lg: 12 }}
        size={["base", "sm", "md", "lg", "500px"]}
      >
        <PaymentWallet
          onSubmit={handleAdd}
          onBack={handleBack}
          paymentData={
            paymentInfoList && paymentInfoList.length
              ? paymentInfoList[0]
              : undefined
          }
        />
      </Container>
    </Box>
  );
};
export default PaymentInfo;

PaymentInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setContext(context);
    store.dispatch(getPaymentInfo.initiate(""));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
