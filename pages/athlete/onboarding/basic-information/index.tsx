import { Box } from "@chakra-ui/react";
import { Case, Else, If, Switch, Then } from "react-if";
import Head from "next/head";
import { FormikContext } from "formik";
import Step from "@/components/ui/Step";
import SelectDateOfBirth from "@/modules/athlete-onboarding/basic-information/components/SelectDateOfBirth";
import SelectNationality from "@/modules/athlete-onboarding/basic-information/components/SelectNationality";
import InputYourStory from "@/modules/athlete-onboarding/basic-information/components/InputYourStory";
import SelectGender from "@/modules/athlete-onboarding/basic-information/components/AthleteSelectGender";
import { useBasicInfo } from "@/modules/athlete-onboarding/basic-information/hooks";
import AthleteUpdatedSuccessfully from "@/components/ui/AthleteUpdatedSuccessfully";
import { wrapper } from "@/store";
import { athleteOnboardingGuard } from "@/middleware/athleteOnboardingGuard";
import { setContext } from "@/libs/axiosInstance";
import { IGuards } from "@/types/globals/types";

const BasicInformation = () => {
  const { formik, step, totalStep, setStep } = useBasicInfo();

  return (
    <FormikContext.Provider value={formik}>
      <Box minHeight="100vh" overflowY="scroll" bg="secondary">
        <Head>
          <title>Athlete | Basic Information</title>
        </Head>
        <If condition={step <= totalStep}>
          <Then>
            <Switch>
              <Case condition={step === 1}>
                <SelectDateOfBirth onSubmit={() => setStep(step + 1)} />
              </Case>
              <Case condition={step === 2}>
                <SelectGender onSubmit={() => setStep(step + 1)} />
              </Case>
              <Case condition={step === 3}>
                <SelectNationality onSubmit={() => setStep(step + 1)} />
              </Case>
              <Case condition={step === 4}>
                <InputYourStory />
              </Case>
            </Switch>
            <Box position="absolute" bottom={5} w="100%" textAlign="center">
              <Step
                activeStep={step}
                totalStep={totalStep}
                onChangeStep={setStep}
              />
            </Box>
          </Then>
          <Else>
            <AthleteUpdatedSuccessfully />
          </Else>
        </If>
      </Box>
    </FormikContext.Provider>
  );
};

export default BasicInformation;

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
