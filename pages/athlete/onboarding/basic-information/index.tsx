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

const BasicInformation = () => {
  const { formik, step, totalStep, setStep, submitLoading } = useBasicInfo();

  return (
    <FormikContext.Provider value={formik}>
      <Box minHeight="100vh" overflowY="auto" bg="white">
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
                <InputYourStory submitLoading={submitLoading} />
              </Case>
            </Switch>
            <Box
              position="absolute"
              top={{ lg: "59%" }}
              bottom={{ base: 5, lg: "unset" }}
              left={{ lg: "130px" }}
              w={{ base: "100%", lg: "unset" }}
              textAlign="center"
            >
              <Step
                activeStep={step}
                totalStep={totalStep}
                onChangeStep={setStep}
              />
            </Box>
          </Then>
          <Else>
            <AthleteUpdatedSuccessfully title="Basic information" />
          </Else>
        </If>
      </Box>
    </FormikContext.Provider>
  );
};

export default BasicInformation;

