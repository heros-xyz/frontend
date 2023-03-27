import { ReactElement, useMemo } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useGetCareerJourneyQuery } from "@/api/athlete";
import TimeLineJourney, { ITimeLineInfo } from "@/components/ui/Timeline";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const EditJourney = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: careerJourneyData } = useGetCareerJourneyQuery(
    session?.user.id as string,
    { skip: typeof session?.user.id !== "string" }
  );

  const sortData = useMemo(() => {
    if (careerJourneyData) {
      const newArr = [...careerJourneyData];
      return newArr?.sort(function (a, b) {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }
    return [];
  }, [careerJourneyData]);
  const handleClickAdd = () => {
    router.push("edit-journey/edit-milestone/0");
  };
  const handleClickEdit = (item: ITimeLineInfo) => {
    router.push(`edit-journey/edit-milestone/${item.id ?? "0"}`);
  };

  return (
    <Box
      px={{ base: 5, lg: 0 }}
      bg="white"
      minH="100vh"
      pb={{ base: 16, xl: 8 }}
    >
      <Head>
        <title>Athlete | Edit Journey</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Box>
          <Box
            w="full"
            fontWeight="bold"
            pt={{ base: 5, xl: "3.75rem" }}
            mb={{ base: 5, lg: 8 }}
          >
            <ArrowLeft
              verticalAlign=""
              w={{ base: "14px", xl: "18px" }}
              h={{ base: "14px", xl: "18px" }}
              cursor="pointer"
              onClick={() => router.push("/athlete/my-profile?current=2")}
            />
            <Text
              as="span"
              ml="6"
              color="primary"
              fontSize={{ base: "xl", xl: "2xl" }}
            >
              Edit Career Journey
            </Text>
          </Box>
          <TimeLineJourney
            items={sortData || []}
            isAddJourney
            bgColor="primary"
            canEdit
            handleClickEdit={handleClickEdit}
            handleClickAdd={handleClickAdd}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default EditJourney;

EditJourney.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
