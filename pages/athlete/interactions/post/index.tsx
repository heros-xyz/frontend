import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { FormikContext } from "formik";
import Head from "next/head";
import InteractionsPost from "@/modules/athlete-interaction/components/post";
import { useInteractionInfo } from "@/modules/athlete-interaction/hooks";

function InteractionsPostPage() {
  const { formik, isLoading, handleSubmit } = useInteractionInfo();

  return (
    <FormikContext.Provider value={formik}>
      <Head>
        <title>Athlete | Post Interactions</title>
      </Head>
      <Box bg="primary" minHeight="100vh">
        <Container
          position="relative"
          size={["base", "sm", "md", "lg", "500px"]}
        >
          <InteractionsPost isLoading={isLoading} handleSubmit={handleSubmit} />
        </Container>
      </Box>
    </FormikContext.Provider>
  );
}

export default InteractionsPostPage;
