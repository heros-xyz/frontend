import { Box } from "@chakra-ui/react";
import { Case, Else, If, Switch, Then } from "react-if";
import Head from "next/head";
import EnterFullName from "@/modules/fan-onboarding/components/EnterFullName";
import Step from "@/components/ui/Step";
import EnterBirthday from "@/modules/fan-onboarding/components/SelectBirthday";
import EnterGender from "@/modules/fan-onboarding/components/SelectGender";
import UploadProfileImage from "@/modules/fan-onboarding/components/SelectProfileImage";
import EnterInterestedSport from "@/modules/fan-onboarding/components/SelectInterestedSport";
import FinishOnboarding from "@/modules/fan-onboarding/components/FinishOnboarding";
import { useFanOnboarding } from "@/modules/fan-onboarding/hooks/setup-account";
import { setContext } from "@/libs/axiosInstance";
import { wrapper } from "@/store";
import { fanSetupAccountGuard } from "@/middleware/fanSetupAccount";
import { IGuards } from "@/types/globals/types";

const FanOnboarding = () => {
  const {
    avatar,
    dateOfBirth,
    gender,
    step,
    fullNameState,
    isLoading,
    handleChangeAvatar,
    handleChangeDateOfBirth,
    handleChangeFullName,
    handleChangeGender,
    handleChangeSport,
    handleChangeStep,
  } = useFanOnboarding();

  return (
    <Box bg="white" minHeight="100vh" overflowY="auto">
      <Head>
        <title>Fan | Onboarding</title>
      </Head>
      <If condition={step <= 6}>
        <Then>
          <Box>
            <Switch>
              <Case condition={step === 1}>
                <EnterFullName
                  initialValues={fullNameState}
                  onSubmit={handleChangeFullName}
                />
              </Case>
              <Case condition={step === 2}>
                <EnterBirthday
                  initialValues={{ dateOfBirth }}
                  onSubmit={handleChangeDateOfBirth}
                />
              </Case>
              <Case condition={step === 3}>
                <EnterGender gender={gender} onSubmit={handleChangeGender} />
              </Case>
              <Case condition={step === 4}>
                <UploadProfileImage
                  avatar={avatar ? avatar : null}
                  onSubmit={handleChangeAvatar}
                />
              </Case>
              <Case condition={step === 5 || step === 6}>
                <EnterInterestedSport
                  isLoading={isLoading}
                  onSubmit={handleChangeSport}
                />
              </Case>
            </Switch>
          </Box>
          <Box
            position="absolute"
            top={{ lg: step == 1 ? "63%" : step == 4 ? "55%" : "58%" }}
            bottom={{ base: 5, lg: "unset" }}
            left={{ lg: "130px" }}
            w={{ base: "100%", lg: "unset" }}
            textAlign="center"
          >
            <Step
              activeStep={step}
              totalStep={5}
              onChangeStep={handleChangeStep}
            />
          </Box>
        </Then>
        <Else>
          <FinishOnboarding />
        </Else>
      </If>
    </Box>
  );
};

export default FanOnboarding;

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    setContext(context);

    return fanSetupAccountGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
