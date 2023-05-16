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

import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import { setTokenToStore } from "@/utils/auth";

const PaymentInfo = () => {
  const router = useRouter();
  // const { data: paymentInfoList } = useGetPaymentInfoQuery("");

  const handleAdd = () => {
    router.push("/fan/payment/update");
  };

  const handleBack = () => {
    router.push("/fan/my-profile");
  };

  const fakePaymentMethod = {
    id: "1",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
    nameOnCard: "yoadsofij",
    cardNumber: "1234567891234567",
    expiredDate: "09/21",
    cvv: "123",
    country: "afghanistan",
    postCode: "123456",
    cardType: "visa",
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
          paymentData={undefined}
        />
      </Container>
    </Box>
  );
};
export default PaymentInfo;

PaymentInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
