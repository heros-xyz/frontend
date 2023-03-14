import { Box, useToast, useUpdateEffect } from "@chakra-ui/react";
import { useState } from "react";
import { Case, Else, If, Switch, Then } from "react-if";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Step from "@/components/ui/Step";
import AddTag from "@/modules/athlete-onboarding/page-information/components/AddTag";
import TagLine from "@/modules/athlete-onboarding/page-information/components/TagLine";
import { useOnboardingPageInformationMutation } from "@/api/athlete";
import { IOnboardingPageInfoParams } from "@/types/users/types";
import AthleteUpdatedSuccessfully from "@/components/ui/AthleteUpdatedSuccessfully";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteOnboardingGuard } from "@/middleware/athleteOnboardingGuard";
import { IGuards } from "@/types/globals/types";
import { updateSession } from "@/utils/auth";

const PageInformation = () => {
  const TOTAL_STEP = 2;
  const toast = useToast();

  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const [request, { data: pageInfo, isError }] =
    useOnboardingPageInformationMutation();

  const [formValues, setFormValues] = useState<IOnboardingPageInfoParams>({
    id: session?.user.id || "",
    tagLine: "",
    tags: [],
  });

  useUpdateEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong",
        status: "error",
      });
      return;
    }
  }, [isError]);

  useUpdateEffect(() => {
    if (pageInfo) {
      setStep(TOTAL_STEP + 1);
      updateSession();
    }
  }, [pageInfo]);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };

  return (
    <Box minHeight="100vh" overflowY="scroll" bg="secondary">
      <Head>
        <title>Athele | Page Information</title>
      </Head>
      <If condition={step <= TOTAL_STEP}>
        <Then>
          <Switch>
            <Case condition={step === 1}>
              <TagLine
                value={formValues.tagLine}
                onSubmit={(tagLine) => {
                  setStep((prev) => prev + 1);
                  setFormValues((prev) => ({ ...prev, tagLine }));
                }}
              />
            </Case>
            <Case condition={step === 2}>
              <AddTag
                onSubmit={(tags) => {
                  request({
                    ...formValues,
                    tags,
                  });
                }}
              />
            </Case>
          </Switch>
          <Box position="absolute" bottom={5} w="100%" textAlign="center">
            <Step
              activeStep={step}
              totalStep={TOTAL_STEP}
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

export default PageInformation;

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