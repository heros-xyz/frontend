import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormikContext } from "formik";
import { ArrowRight } from "@/components/svg/ArrowRight";
import Select from "@/components/common/Select";
import { NationalityIcon } from "@/components/svg/NationalityIcon";
import { useGetNationalityQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { useGetNationalities } from "@/libs/dtl/nationalities";
import { IValuesTypes } from "../../hooks";

interface SelectNationalityProps {
  onSubmit: () => void;
}

const SelectNationality: React.FC<SelectNationalityProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const { values, errors, handleSubmit, setFieldValue } =
    useFormikContext<IValuesTypes>();

  const { nationalitiesMapped: nationalityList } = useGetNationalities();

  const submitForm = () => {
    setSubmitted(true);
    handleSubmit();

    if (!errors.nationality && values.nationality) {
      onSubmit();
    }
  };

  return (
    <HerosOnboardingWrapperNew
      Icon={
        <NationalityIcon
          w={{ base: "88px", xl: "140px" }}
          h={{ base: "75px", xl: "118px" }}
          color={{ base: "#FFFAE8", xl: "accent.1" }}
        />
      }
      textButton="Proceed"
      IconButton={<ArrowRight />}
      onSubmit={submitForm}
      title="Basic information"
      bgIconColor="accent.1"
    >
      <Box mb={{ base: 4, lg: 20 }} color="primary">
        <Box fontSize={{ lg: "xl" }} fontWeight="bold" mb={3}>
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
            isDarkTheme
          />
        </Box>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default SelectNationality;
