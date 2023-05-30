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

  const title = `${athleteProfile.nickName} | Profile | Heros`
  const description =
    athleteProfile.story ||
    "We are a membership club of athletes and fans committed to inspiring and investing in each other"
  const avatar = athleteProfile.avatar ||
    "https://heros-media-dev.s3.ap-southeast-1.amazonaws.com/Inspiring_Humans_2d6e5c3419.png"
  const canonicalUrl = `https://heroz.xyz/${athleteProfile.id}/${athleteProfile.nickName}`

  return (
    <Box bg="white" pb={6}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} key="description" />
        <meta property="og:image" content={avatar} key="image" />
        <meta property="og:image" content={avatar} key="image" />
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
  const athleteProfile = athleteProfileDoc.data() as Partial<AthleteProfile>

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
