import { Box, Container } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";

import PaymentWallet from "@/modules/athlete-dashboard/components/PaymentWallet";

const PaymentInfo = () => {
  const router = useRouter();

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
        <PaymentWallet onSubmit={handleAdd} onBack={handleBack} />
      </Container>
    </Box>
  );
};
export default PaymentInfo;

PaymentInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
