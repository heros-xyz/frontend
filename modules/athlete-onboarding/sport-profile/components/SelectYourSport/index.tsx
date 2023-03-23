import { Box, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import Select from "@/components/common/Select";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import { useGetSportListQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { InterestedSport } from "@/components/svg/InterestedSportFanOnBoarding";
interface IProps {
  sportId?: string;
  setStepValue?: (value: object) => void;
  onSubmit: (value: object) => void;
}

const SelectYourSport: React.FC<IProps> = ({
  sportId,
  onSubmit,
  setStepValue,
}) => {
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
      onSubmit({ sportId: values.sports.value });
    },
  });

  useEffect(() => {
    if (sportId && sportId) {
      const sport = sportsList?.find((sport) => sport.value === sportId);
      formik.setFieldValue("sports", sport);
    }
  }, [sportsList]);

  return (
    <HerosOnboardingWrapperNew
      Icon={
        <InterestedSport
          w={{ base: "57px", xl: "91px" }}
          h={{ base: "90px", xl: "144px" }}
          color={{ base: "#FFFAE8", xl: "accent.2" }}
        />
      }
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="Sport profile"
      onSubmit={formik.handleSubmit}
      bgIconColor="accent.2"
    >
      <Box mb={4}>
        <Box mb={3.5}>
          <Text
            as="span"
            fontWeight="bold"
            color="primary"
            fontSize={{ base: "md", xl: "xl" }}
          >
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
          onChange={(value) => {
            formik.setFieldValue("sports", value);
            setStepValue && setStepValue({ sportId: value.value });
          }}
          errorMessage={formik.errors.sports?.value}
          isInvalid={Boolean(formik.errors.sports?.value)}
          filterSelectOptions={filterSelectOptions}
          isDarkTheme
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default SelectYourSport;
