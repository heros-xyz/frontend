import { useFormikContext } from "formik";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { NextIcon } from "@/components/svg/NextIcon";
import { IconLegalName } from "@/components/svg/IconLegalName";
import { IValuesTypes } from "@/modules/athlete-setup-account/hooks/useSetupAccountPage";
import ErrorMessage from "@/components/common/ErrorMessage";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import Label from "./components/Label";
interface IProp {
  onSubmit: () => void;
}
const AthleteLegalNameStep: React.FC<IProp> = ({ onSubmit }) => {
  const { values, handleChange, errors, handleSubmit } =
    useFormikContext<IValuesTypes>();
  const [submitted, setSubmitted] = useState(false);
  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();
    if (
      !errors.firstName &&
      values.firstName &&
      !errors.lastName &&
      values.lastName
    ) {
      onSubmit();
    }
  };
  return (
    <HerosOnboardingWrapper
      Icon={<IconLegalName w="full" h="full" />}
      textButton="Proceed"
      IconButton={<NextIcon />}
      onSubmit={submitForm}
    >
      <Label
        title="Enter Your Legal Name"
        description={`We need this for tax and payout purposes so you can get paid. We'll
          never show it publicly.`}
      />
      <Box mb={{ base: 5, xl: 10 }}>
        <Input
          variant="flushed"
          placeholder="First Name"
          borderColor="primary"
          name="firstName"
          fontSize={{ base: "sm", lg: "3xl" }}
          isInvalid={Boolean(errors.firstName && submitted)}
          value={values?.firstName}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={errors.firstName && submitted}
          errorMessage={errors.firstName}
        />
      </Box>
      <Box mb={{ base: 5, xl: 10 }}>
        <Input
          variant="flushed"
          placeholder="Middle Name (Optional)"
          borderColor="primary"
          name="middleName"
          fontSize={{ base: "sm", lg: "3xl" }}
          isInvalid={Boolean(errors.middleName && submitted)}
          value={values?.middleName}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={errors.middleName && submitted}
          errorMessage={errors.middleName}
        />
      </Box>
      <Box mb={3}>
        <Input
          variant="flushed"
          placeholder="Last Name"
          borderColor="primary"
          name="lastName"
          fontSize={{ base: "sm", lg: "3xl" }}
          isInvalid={Boolean(errors.lastName && submitted)}
          value={values?.lastName}
          onChange={handleChange}
        />
        <ErrorMessage
          condition={errors.lastName && submitted}
          errorMessage={errors.lastName}
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};
export default AthleteLegalNameStep;
