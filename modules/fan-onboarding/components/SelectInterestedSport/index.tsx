import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InterestedSport } from "@/components/svg/InterestedSportFanOnBoarding";
import Select from "@/components/common/Select";
import FanOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import { useGetSportListQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
interface IProp {
  onSubmit: (values: string) => void;
}
interface IItemSelect {
  label: string;
  value: string;
}
const EnterInterestedSport: React.FC<IProp> = ({ onSubmit }) => {
  const { data: sportsList } = useGetSportListQuery("");

  const validationSchema = Yup.object().shape({
    sports: Yup.array().required("Required at least 1 sport!"),
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
    <FanOnboardingWrapper
      Icon={<InterestedSport />}
      textButton="Submit"
      onSubmit={formik.handleSubmit}
    >
      <Box mb={{ base: 4, lg: 20 }} color="black.ish">
        <Box mb={{ base: 5, lg: 8 }}>
          <Box fontSize={{ lg: "xl" }} fontWeight="500">
            Select Your Interested Sport(s)
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
          />
        </Box>
      </Box>
    </FanOnboardingWrapper>
  );
};

export default EnterInterestedSport;
