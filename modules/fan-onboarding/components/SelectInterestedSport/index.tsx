import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "@/components/common/Select";
import { useGetSportListQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { InterestedSport } from "@/components/svg/InterestedSportFanOnBoarding";
interface IProp {
  isLoading: boolean;
  onSubmit: (values: string) => void;
}
interface IItemSelect {
  label: string;
  value: string;
}
const EnterInterestedSport: React.FC<IProp> = ({ isLoading, onSubmit }) => {
  const { data: sportsList } = useGetSportListQuery("");

  const validationSchema = Yup.object().shape({
    sports: Yup.array().min(1, "This is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      sports: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const mapValues = values.sports.map((item: IItemSelect) => item.value);
      onSubmit(mapValues.toString());
    },
  });

  return (
    <HerosOnboardingWrapperNew
      Icon={
        <InterestedSport
          w={{ base: "57px", xl: "91px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "accent.2" }}
        />
      }
      textButton="Submit"
      submitLoading={isLoading}
      onSubmit={formik.handleSubmit}
      bgIconColor="accent.2"
      display="flex"
      alignItems="center"
    >
      <Box mb={{ base: 4, lg: 20 }} color="primary">
        <Box mb={{ base: 5, lg: 8 }}>
          <Box fontSize={{ lg: "xl" }} fontWeight="bold">
            Select Your Interested Sport(s)
            <Text as="span" color="error.dark">
              {" "}
              *
            </Text>
          </Box>
        </Box>
        <Box fontSize={{ base: "sm", lg: "3xl" }}>
          <Select
            isMulti
            options={sportsList}
            placeHolder="Sport(s)"
            optionCount={5}
            value={formik.values.sports}
            onChange={(value) => formik.setFieldValue("sports", value)}
            errorMessage={formik.errors.sports}
            isInvalid={Boolean(formik.errors.sports)}
            filterSelectOptions={filterSelectOptions}
            isDarkTheme
          />
        </Box>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default EnterInterestedSport;
