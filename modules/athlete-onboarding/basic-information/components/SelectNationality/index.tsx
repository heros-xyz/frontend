import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import Select from "@/components/common/Select";
import { NationalityIcon } from "@/components/svg/NationalityIcon";
import { useGetNationalityQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
import { IValuesTypes } from "../../hooks";

interface SelectNationalityProps {
  onSubmit: () => void;
}

const SelectNationality: React.FC<SelectNationalityProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const { values, errors, handleSubmit, setFieldValue } =
    useFormikContext<IValuesTypes>();

  const { data: nationalityList } = useGetNationalityQuery("");

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();

    if (!errors.nationality && values.nationality) {
      onSubmit();
    }
  };

  return (
    <FanOnboardingWrapper
      Icon={<NationalityIcon w="full" h="full" />}
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={submitForm}
      title="BASIC INFORMATION"
    >
      <Box mb={{ base: 4, lg: 20 }} color="black.ish">
        <Box fontSize={{ lg: "xl" }} fontWeight="500" mb={3}>
          Select Nationality
          <Text as="span" color="error.dark">
            {" "}
            *
          </Text>
        </Box>
        <Box>
          <Select
            placeHolder="Nationality"
            value={values?.nationality}
            optionCount={5}
            options={nationalityList}
            onChange={(value) => setFieldValue("nationality", value)}
            errorMessage={"This is a required field"}
            isInvalid={Boolean(submitted && errors.nationality)}
            filterSelectOptions={filterSelectOptions}
          />
        </Box>
      </Box>
    </FanOnboardingWrapper>
  );
};

export default SelectNationality;
