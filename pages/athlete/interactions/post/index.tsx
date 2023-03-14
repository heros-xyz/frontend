import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { FormikContext } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import InteractionsPost from "@/modules/athlete-interaction/components/post";
import { useInteractionInfo } from "@/modules/athlete-interaction/hooks";

function InteractionsPostPage() {
  const { formik, isLoading, handleSubmit } = useInteractionInfo();
  const router = useRouter();

  return (
    <FormikContext.Provider value={formik}>
      <Head>
        <title>Athlete | Post Interaction</title>
      </Head>
      <Box bg="primary" minHeight="100vh">
        <Container
          position="relative"
          size={["base", "sm", "md", "lg", "500px"]}
        >
          <InteractionsPost
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            onBack={() => router.push("/athlete/interactions")}
          />
        </Container>
      </Box>
    </FormikContext.Provider>
  );
}

export default InteractionsPostPage;
