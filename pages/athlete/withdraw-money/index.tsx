import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import WithdrawMoney from "@/components/payment/WithdrawMoney";

const WalletWithdrawMoney = () => {
  const onsubmit = () => {};
  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Athlete | Withdraw Money</title>
      </Head>
      <WithdrawMoney onSubmit={onsubmit}></WithdrawMoney>
    </Box>
  );
};

export default WalletWithdrawMoney;

WalletWithdrawMoney.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
