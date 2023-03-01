import { Box, Container, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Case, Switch } from "react-if";
import dayjs from "dayjs";
import AddFirstMilestone from "@/modules/athlete-onboarding/career-journey/components/AddFirstMilestone";
import AddMilestone from "@/modules/athlete-onboarding/career-journey/components/AddMilestone";
import MilestoneTimeline from "@/modules/athlete-onboarding/career-journey/components/MilestoneTimeline";
import TimeLineJourney, { ITimeLineInfo } from "@/components/ui/Timeline";
import { IMilestone } from "@/modules/athlete-onboarding/career-journey/constants";
import AthleteUpdatedSuccessfully from "@/components/ui/AthleteUpdatedSuccessfully";
import { wrapper } from "@/store";
import { athleteOnboardingGuard } from "@/middleware/athleteOnboardingGuard";
import { setContext } from "@/libs/axiosInstance";
import { IGuards } from "@/types/globals/types";
import { useOnboardingCareerJourneyMutation } from "@/api/athlete";
import { updateSession } from "@/utils/auth";

const CareerJourney = () => {
  const toast = useToast();
  const [step, setStep] = useState<
    "firstAdd" | "addingForm" | "showTimeline" | "successfully"
  >("firstAdd");
  const [milestones, setMilestone] = useState<ITimeLineInfo[]>([]);
  const [submitMilestones, { data: milestonesData, error, isLoading }] =
    useOnboardingCareerJourneyMutation();

  const handleSaveMilestone = (values: IMilestone) => {
    setStep("showTimeline");
    const data = {
      title: values.name,
      description: values.description,
      from: values.startDate,
      to: values.endDate,
      isArchive: !!values.icon,
      isCurrent: !milestones.length,
      icon: values.icon,
    };
    setMilestone((prevArr) => [...prevArr, data]);
  };

  const handleSubmit = () => {
    const payload = milestones.map((item) => ({
      startTime: dayjs(item.from).format("YYYY-MM-DD"),
      endTime: item.to ? dayjs(item.to).format("YYYY-MM-DD") : null,
      title: item.title,
      description: item.description,
      icon: item.icon as string,
    }));

    submitMilestones(payload);
  };

  useEffect(() => {
    if (milestonesData) {
      setStep("successfully");
      updateSession();
    }
  }, [milestonesData]);

  useEffect(() => {
    if (error) {
      toast({
        title: (error as any)?.data?.error || "Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  return (
    <Box minHeight="100vh" overflowY="scroll" bg="secondary">
      <Head>
        <title>Athelete | Career Journey</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "xl"]}>
        <Switch>
          <Case condition={step === "firstAdd"}>
            <AddFirstMilestone
              handleAddMilestone={() => setStep("addingForm")}
            />
          </Case>
          <Case condition={step === "showTimeline"}>
            <MilestoneTimeline isLoading={isLoading} onSubmit={handleSubmit}>
              <TimeLineJourney
                w="100%"
                bgColor={"secondary"}
                isAddJourney={true}
                items={milestones}
                handleClickAdd={() => setStep("addingForm")}
              />
            </MilestoneTimeline>
          </Case>
          <Case condition={step === "addingForm"}>
            <Box w={{ xl: "720px" }} m="0 auto">
              <AddMilestone onSubmit={handleSaveMilestone} />
            </Box>
          </Case>
          <Case condition={step === "successfully"}>
            <AthleteUpdatedSuccessfully />
          </Case>
        </Switch>
      </Container>
    </Box>
  );
};

export default CareerJourney;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return athleteOnboardingGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
