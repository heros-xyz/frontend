import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import InteractionDetail from "@/modules/athlete-interaction/components/detail";

const InteractionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box bg="white" minHeight="100vh" pb={8}>
      <Head>
        <title>Athlete | Interaction Details</title>
      </Head>
      <InteractionDetail id={id as string} isDetailPage />
    </Box>
  );
};

export default InteractionDetailPage;
