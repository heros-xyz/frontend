import { useFormikContext } from "formik";
import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { IconNickName } from "@/components/svg/IconNickName";
import { NextIcon } from "@/components/svg/NextIcon";
import { IValuesTypes } from "@/modules/athlete-setup-account/hooks/useSetupAccountPage";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import Label from "./components/Label";
interface IProp {
  onSubmit: () => void;
}
const AthleteNickNameStep: React.FC<IProp> = ({ onSubmit }) => {
  const { values, errors, handleSubmit, handleChange } =
    useFormikContext<IValuesTypes>();
  const [submitted, setSubmitted] = useState(false);

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();
    if (!errors.nickName && values.nickName) {
      onSubmit();
    }
  };

  return (
    <HerosOnboardingWrapper
      Icon={<IconNickName w="full" h="full" />}
      textButton="Proceed"
      IconButton={<NextIcon />}
      onSubmit={submitForm}
    >
      <Label
        title="Enter Your Nickname"
        description="Your nickname is how fans will find and know you in this platform. You
          can change it at any time."
      />
      <Box mb={3}>
        <Input
          variant="flushed"
          placeholder="Nickname"
          borderColor="primary"
          name="nickName"
          fontSize={{ base: "sm", lg: "32px" }}
          isInvalid={Boolean(errors.nickName && submitted)}
          value={values?.nickName}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={errors.nickName && submitted}
          errorMessage={errors.nickName}
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default AthleteNickNameStep;
