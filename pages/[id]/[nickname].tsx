import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import ViewAthleteProfile from "@/modules/fan-dashboard/components/ViewAthleteProfile";
import { getEnvVariables } from "@/utils/env";
import { converter, useAthleteProfile } from "@/libs/dtl/athleteProfile";
import { auth, db } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";
import { collectionPath } from "@/libs/dtl/constant";
import { AthleteProfile } from "@/libs/dtl";

interface Props {
  athleteProfile: Partial<AthleteProfile>
}
const GuestViewAthleteProfile = ({athleteProfile}: Props) => {
  const [user, loading] = useAuthState(auth);
  const { query, push } = useRouter();
  const { NEXTAUTH_URL } = getEnvVariables();
  const { asPath } = useRouter();
  const cleanPath = asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${NEXTAUTH_URL}` + (asPath === "/" ? "" : cleanPath);
  const athleteProfileSuscription = useAthleteProfile(athleteProfile.id);

  useEffect(() => {
    if (!user?.uid) return;
    const isAthlete = user?.uid === query.id;
    if (isAthlete) {
      push(RoutePath.ATHLETE_PROFILE);
    } else {
      if (!query.id) return;
      push(RoutePath.FAN_VIEW_ATHLETE_PROFILE(query.id as string));
    }
  }, [user?.uid, query?.id]);

  if (loading || !query.id) {
    return <></>;
  }

  return (
    <Box bg="white" pb={6}>
      <Head>
        <title>{`${athleteProfile.nickName} | Profile | Heros`}</title>
        <meta
          property="og:title"
          content={`${athleteProfile.nickName} | Profile | Heros`}
          key="title"
        />
        <meta
          property="description"
          content={
            athleteProfile.story ??
            "We are a membership club of athletes and fans committed to inspiring and investing in each other"
          }
          key="description"
        />
        <meta
          property="image"
          content={
            athleteProfile.avatar ??
            "https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
          }
          key="image"
        />
        <meta
          property="og:image"
          content={
            athleteProfile.avatar ??
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
          athleteProfile={athleteProfileSuscription}
        />
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const athleteProfileDoc = await getDoc(doc(db, collectionPath.ATHLETE_PROFILE, context.params.id))
  const athleteProfile = athleteProfileDoc.data()

  if (athleteProfile !== undefined){
    delete athleteProfile.dateOfBirth
    delete athleteProfile.createdAt
  }

  return {
    props: {
      athleteProfile
    },
  };
}

export default GuestViewAthleteProfile;
