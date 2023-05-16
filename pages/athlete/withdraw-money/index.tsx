import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import WithdrawMoney from "@/components/payment/WithdrawMoney";
import { wrapper } from "@/store";

import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";
import { setTokenToStore } from "@/utils/auth";

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setTokenToStore(store, context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
