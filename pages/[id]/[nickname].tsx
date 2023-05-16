import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { wrapper } from "@/store";

import {
  getAthleteProfile,
  getPaymentInfo,
  getRunningQueriesThunk,
  useGetAthleteProfileQuery,
} from "@/api/fan";
import { getValidateIsFan } from "@/api/athlete";
import { getImageLink } from "@/utils/link";
import { guestGuard } from "@/middleware/guestGuard";
import { getEnvVariables } from "@/utils/env";
import { setTokenToStore } from "@/utils/auth";

const GuestViewAthleteProfile = () => {
  const { query, push } = useRouter();
  const { data: athleteProfile, error } = useGetAthleteProfileQuery(
    query.id as string,
    {
      skip: typeof query.id !== "string",
    }
  );

  const { NEXTAUTH_URL } = getEnvVariables();
  const { asPath } = useRouter();
  const cleanPath = asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${NEXTAUTH_URL}` + (asPath === "/" ? "" : cleanPath);

  if (error) {
    push("/sign-in");
  }

  return (
    <Box bg="white" pb={6}>
      <Head>
        <title>{`${athleteProfile?.nickName} | Profile | Heros`}</title>
        <meta
          property="og:title"
          content={`${athleteProfile?.nickName} | Profile | Heros`}
          key="title"
        />
        <meta
          property="description"
          content={
            athleteProfile?.story ??
            "We are a membership club of athletes and fans committed to inspiring and investing in each other"
          }
          key="description"
        />
        <meta
          property="image"
          content={
            getImageLink(athleteProfile?.avatar) ??
            "https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
          }
          key="image"
        />
        <meta
          property="og:image"
          content={
            getImageLink(athleteProfile?.avatar) ??
            "https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
          }
          key="image"
        />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
        <meta property="og:type" content="website" key="type" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <ViewAthleteProfile
          showFindHeros={false}
          athleteProfile={athleteProfile}
        />
      </Container>
    </Box>
  );
};

export default GuestViewAthleteProfile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setTokenToStore(store, context);
    const athleteId = context.params?.id;

    if (typeof athleteId === "string") {
      store.dispatch(getAthleteProfile.initiate(athleteId));
      store.dispatch(getValidateIsFan.initiate(athleteId));
      store.dispatch(getPaymentInfo.initiate(""));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return guestGuard(context, () => {
      return {
        props: {},
      };
    });
  }
);
