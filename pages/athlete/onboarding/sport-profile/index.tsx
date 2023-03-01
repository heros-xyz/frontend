import { Box, useToast } from "@chakra-ui/react";
import { Case, Else, If, Switch, Then } from "react-if";
import { useEffect, useState } from "react";
import Head from "next/head";
import SelectYourSport from "@/modules/athlete-onboarding/sport-profile/components/SelectYourSport";
import InputCurrentTeam from "@/modules/athlete-onboarding/sport-profile/components/InputCurrentTeam";
import InputYourGoal from "@/modules/athlete-onboarding/sport-profile/components/InputYourGoal";
import Step from "@/components/ui/Step";
import { useOnboardingSportProfileMutation } from "@/api/athlete";
import { IOnboardingSportProfileParams } from "@/types/users/types";
import AthleteUpdatedSuccessfully from "@/components/ui/AthleteUpdatedSuccessfully";
import { wrapper } from "@/store";
import { athleteOnboardingGuard } from "@/middleware/athleteOnboardingGuard";
import { setContext } from "@/libs/axiosInstance";
import { IGuards } from "@/types/globals/types";
import { updateSession } from "@/utils/auth";

const SportProfile = () => {
  const totalStep = 3;
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [finalValue, setFinalValue] = useState<IOnboardingSportProfileParams>({
    sportsId: "",
    currentTeam: "",
    goal: "",
  });
  const [submitSportProfile, { data: sportProfileData, error }] =
    useOnboardingSportProfileMutation();

  const handleChangeStep = (step: number) => {
    setStep(step);
  };
  const setValueByStep = (value: object) => {
    if (step === 3) {
      submitSportProfile({
        ...finalValue,
        ...value,
      });
      return;
    }

    setFinalValue({
      ...finalValue,
      ...value,
    });
    setStep(step + 1);
  };

  useEffect(() => {
    if (sportProfileData) {
      setStep((step) => step + 1);
      updateSession();
    }
  }, [sportProfileData]);

  useEffect(() => {
    if (error) {
      toast({
        title: (error as any)?.data?.message || "Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  return (
    <Box minHeight="100vh" overflowY="scroll" bg="secondary">
      <Head>
        <title>Athele | Sport Profile</title>
      </Head>
      <If condition={step <= totalStep}>
        <Then>
          <Switch>
            <Case condition={step === 1}>
              <SelectYourSport onSubmit={setValueByStep} />
            </Case>
            <Case condition={step === 2}>
              <InputCurrentTeam onSubmit={setValueByStep} />
            </Case>
            <Case condition={step === 3}>
              <InputYourGoal onSubmit={setValueByStep} />
            </Case>
          </Switch>
          <Box position="absolute" bottom={5} w="100%" textAlign="center">
            <Step
              activeStep={step}
              totalStep={totalStep}
              onChangeStep={handleChangeStep}
            />
          </Box>
        </Then>
        <Else>
          <AthleteUpdatedSuccessfully />
        </Else>
      </If>
    </Box>
  );
};

export default SportProfile;

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
