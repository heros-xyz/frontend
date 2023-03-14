import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Session } from "next-auth";
import JoinPage from "@/components/ui/JoinPage";
import { wrapper } from "@/store";
import { loggedInGuard } from "@/middleware/loggedInGuard";

const JoiningAs = () => {
  return (
    <Box>
      <Head>
        <title>Joining As</title>
      </Head>
      <JoinPage />
    </Box>
  );
};

export default JoiningAs;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    return loggedInGuard(context, (session: Session | null) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
