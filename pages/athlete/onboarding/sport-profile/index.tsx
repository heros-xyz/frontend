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
import { IGuards, IHerosError } from "@/types/globals/types";
import { updateSession } from "@/utils/auth";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { useAuthContext } from "@/context/AuthContext";

const SportProfile = () => {
  const totalStep = 3;
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [value, setValue] = useState<number>(0);
  const { user } = useAuthContext();
  const [finalValue, setFinalValue] = useState<IOnboardingSportProfileParams>({
    sportId: "",
    currentTeam: "",
    goal: "",
  });
  const { updateDocument, isUpdating: submitLoading } = useUpdateDoc();
  const [error, setError] = useState(null);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };

  const submitSportProfile = async (value: object) => {
    if (!user?.uid) return;
    try {
      const { currentTeam, goal, sports } = {
        ...finalValue,
        ...value,
      };
      const params = {
        currentTeam,
        goal,
        sport: { label: sports?.label, key: sports?.value },
      };
      await updateDocument(`athleteProfile/${user.uid}`, params);
      return;
    } catch (error) {
      setError(error);
    }
  };

  const setValueByStep = async (value: object) => {
    if (step === totalStep) {
      await submitSportProfile(value);
    }
    setFinalValue({
      ...finalValue,
      ...value,
    });
    setStep(step + 1);
  };

  const setStepValue = (value: object) => {
    setFinalValue({
      ...finalValue,
      ...value,
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.message || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  return (
    <Box minHeight="100vh" overflowY="auto" bg="white">
      <Head>
        <title>Athlete | Sport Profile</title>
      </Head>
      <If condition={step <= totalStep}>
        <Then>
          <Switch>
            <Case condition={step === 1}>
              <SelectYourSport
                sportId={finalValue.sportId}
                setStepValue={setStepValue}
                onSubmit={setValueByStep}
              />
            </Case>
            <Case condition={step === 2}>
              <InputCurrentTeam
                currentTeam={finalValue.currentTeam}
                onSubmit={setValueByStep}
                setStepValue={setStepValue}
                setValue={setValue}
              />
            </Case>
            <Case condition={step === 3}>
              <InputYourGoal
                goal={finalValue.goal}
                setStepValue={setStepValue}
                onSubmit={setValueByStep}
                submitLoading={submitLoading}
              />
            </Case>
          </Switch>
          <Box
            position="absolute"
            top={{ lg: "59%" }}
            bottom={{ base: 5, lg: "unset" }}
            left={{ lg: step === 2 && value ? value : "130px" }}
            w={{ base: "100%", lg: "unset" }}
            textAlign="center"
          >
            <Step
              activeStep={step}
              totalStep={totalStep}
              onChangeStep={handleChangeStep}
            />
          </Box>
        </Then>
        <Else>
          <AthleteUpdatedSuccessfully title="Sport profile" />
        </Else>
      </If>
    </Box>
  );
};

export default SportProfile;
