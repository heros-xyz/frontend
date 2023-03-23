import { Form, FormikContext } from "formik";
import { Case, Else, If, Switch, Then } from "react-if";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Step from "@/components/ui/Step";
import {
  LegalNameStep,
  NickNameStep,
  ProfileImageStep,
  SuccessStep,
} from "@/modules/athlete-setup-account";
import useSetupAccountPage from "@/modules/athlete-setup-account/hooks/useSetupAccountPage";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteSetupAccountGuard } from "@/middleware/athleteSetupAccount";
import { IGuards } from "@/types/globals/types";

const AthleteSetupAccount = () => {
  const { formik, step, totalStep, isLoading, setStep } = useSetupAccountPage();

  return (
    <FormikContext.Provider value={formik}>
      <Box minHeight="100vh" overflowY="auto">
        <Head>
          <title>Athlete | Setup Account</title>
        </Head>
        <Form>
          <If condition={step <= totalStep}>
            <Then>
              <Switch>
                <Case condition={step === 1}>
                  <LegalNameStep onSubmit={() => setStep(step + 1)} />
                </Case>
                <Case condition={step === 2}>
                  <NickNameStep onSubmit={() => setStep(step + 1)} />
                </Case>
                <Case condition={step === 3}>
                  <ProfileImageStep
                    isLoading={isLoading}
                    onSubmit={() => setStep(step + 1)}
                  />
                </Case>
              </Switch>
              <Box
                position="absolute"
                bottom={5}
                w="100%"
                textAlign="center"
                className="step"
              >
                <Step
                  activeStep={step}
                  totalStep={totalStep}
                  onChangeStep={setStep}
                />
              </Box>
            </Then>
            <Else>
              <SuccessStep />
            </Else>
          </If>
        </Form>
      </Box>
    </FormikContext.Provider>
  );
};

export default AthleteSetupAccount;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return athleteSetupAccountGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
