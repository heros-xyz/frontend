import { Box, useToast, useUpdateEffect } from "@chakra-ui/react";
import { useState } from "react";
import { Case, Else, If, Switch, Then } from "react-if";
import Head from "next/head";
import Step from "@/components/ui/Step";
import AddTag from "@/modules/athlete-onboarding/page-information/components/AddTag";
import TagLine from "@/modules/athlete-onboarding/page-information/components/TagLine";
import { IOnboardingPageInfoParams } from "@/types/users/types";
import AthleteUpdatedSuccessfully from "@/components/ui/AthleteUpdatedSuccessfully";
import { useAuthContext } from "@/context/AuthContext";
import useUpdateDoc from "@/hooks/useUpdateDoc";

const PageInformation = () => {
  const TOTAL_STEP = 2;
  const toast = useToast();
  const { userProfile } = useAuthContext();
  const { updateDocument, isUpdating: isLoading } = useUpdateDoc();
  const [step, setStep] = useState(1);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [formValues, setFormValues] = useState<IOnboardingPageInfoParams>({
    id: userProfile?.uid || "",
    tagLine: "",
    tags: [],
  });

  useUpdateEffect(() => {
    if (isError) {
      toast({
        title: "Oops! Something went wrong",
        status: "error",
      });
      return;
    }
  }, [isError]);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };

  const handleSubmit = async (tags: string[]) => {
    try {
      const params = {
        tagline: formValues.tagLine,
        tags,
      };
      await updateDocument(`athleteProfile/${userProfile?.uid}`, params);
      setStep((prev) => prev + 1);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Box minHeight="100vh" overflowY="auto" bg="white">
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
              <AddTag isLoading={isLoading} onSubmit={handleSubmit} setValue={setValue} />
            </Case>
          </Switch>
          <Box
            position="absolute"
            top={{ lg: step === 2 ? "64%" : "59%" }}
            bottom={{ base: 5, lg: "unset" }}
            left={{ lg: step === 2 && value ? value : "130px" }}
            w={{ base: "100%", lg: "unset" }}
            textAlign="center"
          >
            <Step
              activeStep={step}
              totalStep={TOTAL_STEP}
              onChangeStep={handleChangeStep}
            />
          </Box>
        </Then>
        <Else>
          <AthleteUpdatedSuccessfully title="Page Information" />
        </Else>
      </If>
    </Box>
  );
};

export default PageInformation;
