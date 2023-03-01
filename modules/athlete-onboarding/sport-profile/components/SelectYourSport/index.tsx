import { Box, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SelectSportIcon } from "@/components/svg/SelectSportIcon";
import Select from "@/components/common/Select";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import HerosOnboardingWrapper from "@/components/ui/HerosOnboardingWrapper";
import { useGetSportListQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
interface IProps {
  onSubmit: (value: object) => void;
}

const SelectYourSport: React.FC<IProps> = ({ onSubmit }) => {
  const { data: sportsList } = useGetSportListQuery("");

  const validationSchema = Yup.object().shape({
    sports: Yup.object().shape({
      value: Yup.string().required("This is a required field!"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      sports: {
        value: "",
        label: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ sportsId: values.sports.value });
    },
  });

  return (
    <HerosOnboardingWrapper
      Icon={<SelectSportIcon w="full" h="full" />}
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="SPORT PROFILE"
      onSubmit={formik.handleSubmit}
    >
      <Box mb={4}>
        <Box mb={3.5}>
          <Text as="span" fontWeight="600">
            Select Your Sport
          </Text>
          <Text as="span" color={"red"} ml={1}>
            *
          </Text>
        </Box>
        <Select
          placeHolder="Sport"
          options={sportsList || []}
          optionCount={5}
          value={formik.values.sports}
          onChange={(value) => formik.setFieldValue("sports", value)}
          errorMessage={formik.errors.sports?.value}
          isInvalid={Boolean(formik.errors.sports?.value)}
          filterSelectOptions={filterSelectOptions}
        />
      </Box>
    </HerosOnboardingWrapper>
  );
};

export default SelectYourSport;
