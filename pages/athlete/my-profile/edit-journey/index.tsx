import { ReactElement, useMemo } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import TimeLineJourney, { ITimeLineInfo } from "@/components/ui/Timeline";

import BackButton from "@/components/ui/BackButton";
import { useCareerJourneys } from "@/libs/dtl/careerJourney";

const EditJourney = () => {
  const router = useRouter();
  const { journeys: careerJourneyData } = useCareerJourneys();

  const sortData = useMemo(() => {
    if (careerJourneyData) {
      const newArr = [...careerJourneyData];
      return newArr?.sort(function (a, b) {
        return (
          new Date(b?.startDate).getTime() - new Date(a?.startDate).getTime()
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
            <BackButton
              href="/athlete/my-profile?current=2"
              title="Edit Career Journey"
            />
          </Box>

          <TimeLineJourney
            items={(sortData as any) || []}
            isAddJourney
            bgColor="primary"
            canEdit
            handleClickEdit={handleClickEdit}
            handleClickAdd={handleClickAdd}
            message="You can add as many as you like to tell your journey"
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
