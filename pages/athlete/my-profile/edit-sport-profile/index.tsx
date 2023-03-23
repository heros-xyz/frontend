import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { If, Then } from "react-if";
import * as Yup from "yup";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import Select from "@/components/common/Select";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useGetSportListQuery } from "@/api/global";
import {
  useGetSportProfileQuery,
  usePutSportProfileMutation,
} from "@/api/athlete";

const EditSportProfile = () => {
  const router = useRouter();
  const { data: sportsList } = useGetSportListQuery("");
  const [putProfileSport, { isSuccess: successEdit, isLoading }] =
    usePutSportProfileMutation();

  const { data: sportProfile } = useGetSportProfileQuery("");
  useEffect(() => {
    if (sportProfile) {
      formik.setFieldValue("sports", {
        value: sportProfile?.data.sportProfilesItems[0].sportId,
        label: sportProfile?.data.sportProfilesItems[0].sportName,
      });
      formik.setFieldValue("currentTeam", sportProfile.data.currentTeam);
      formik.setFieldValue("goal", sportProfile.data.goal);
    }
  }, [sportProfile]);

  const validationSchema = Yup.object().shape({
    sports: Yup.object().shape({
      label: Yup.string().required("This is a required field!"),
    }),
    currentTeam: Yup.string()
      .required("This is a required field!")
      .max(100, "Current team/ association/ club cannot exceed 100 characters"),
    goal: Yup.string()
      .required("This is a required field!")
      .max(500, "My goal cannot exceed 500 characters"),
  });

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      sports: {
        value: "",
        label: "",
      },
      currentTeam: "",
      goal: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newValues = {
        sportId: values.sports.value,
        currentTeam: values.currentTeam,
        goal: values.goal,
      };
      putProfileSport({ data: newValues, id: sportProfile?.data?.id ?? "" });
    },
  });

  return (
    <Box px={{ base: 5, lg: 0 }} minH="100vh" pb={{ base: 16, xl: 8 }}>
      <Head>
        <title>Athlete | Edit Journey</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]} color="primary">
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              w="full"
              fontWeight="bold"
              pt={{ base: 5, xl: "3.75rem" }}
              mb={{ base: 5, lg: 8 }}
            >
              <ArrowLeft
                verticalAlign=""
                w={{ base: "14px", xl: "18px" }}
                h={{ base: "14px", xl: "18px" }}
                cursor="pointer"
                onClick={() => router.push("/athlete/my-profile")}
              />
              <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
                Edit Sport Profile
              </Text>
            </Box>
            <Box mb="50px">
              <Box mb={{ base: 5, xl: 8 }}>
                <Text
                  fontSize={{ base: "sm", xl: "md" }}
                  fontWeight="medium"
                  marginBottom={{ base: "10px", xl: "15px" }}
                >
                  <Text as="span" color="black.primary">
                    {" "}
                    Sport
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Text>
                <Select
                  isDarkTheme={true}
                  options={sportsList || []}
                  optionCount={5}
                  value={formik.values.sports}
                  onChange={(value) => formik.setFieldValue("sports", value)}
                  errorMessage={formik.errors.sports?.value}
                />
              </Box>
              <Box mb={{ base: 5, xl: 8 }}>
                <Text
                  marginBottom={{ base: "10px", xl: "15px" }}
                  fontSize={{ base: "sm", xl: "md" }}
                  fontWeight="medium"
                  color="black.primary"
                >
                  Current team/Association/Club
                </Text>
                <Input
                  variant="flushed"
                  placeholder="Tell Your Story"
                  borderColor="grey.200"
                  name="currentTeam"
                  fontSize={{ base: "sm", xl: "lg" }}
                  value={formik.values?.currentTeam}
                  onChange={formik.handleChange}
                  fontWeight="medium"
                  _focusVisible={{
                    borderColor: "grey.200",
                    boxShadow: "none",
                  }}
                />
                <ErrorMessage
                  condition={
                    formik.errors.currentTeam && formik.touched.currentTeam
                  }
                  errorMessage={formik.errors.currentTeam}
                />
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "sm", xl: "md" }}
                  fontWeight="medium"
                  marginBottom={{ base: "10px", xl: "15px" }}
                >
                  <Text as="span" color="black.primary">
                    {" "}
                    My Goal
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Text>
                <Textarea
                  resize="none"
                  variant="flushed"
                  placeholder="Your goal"
                  borderColor="grey.200"
                  name="goal"
                  fontSize={{ base: "sm", xl: "lg" }}
                  onChange={(el) =>
                    formik.setFieldValue("goal", el.target.value)
                  }
                  className="postComment"
                  value={formik.values?.goal}
                  fontWeight="medium"
                  _focusVisible={{
                    borderColor: "grey.200",
                    boxShadow: "none",
                  }}
                />
                <ErrorMessage
                  condition={formik.errors.goal && formik.touched.goal}
                  errorMessage={formik.errors.goal}
                />
              </Box>
            </Box>
            <Box textAlign={{ base: "center", xl: "right" }}>
              <Button
                w={{ base: "full", xl: "110px" }}
                bg="secondary"
                color="primary"
                type="submit"
                fontSize={{ base: "md", xl: "xl" }}
                isLoading={isLoading}
              >
                Save
              </Button>
              <If condition={successEdit}>
                <Then>
                  <Box
                    color="#65D169"
                    mt={{ base: 2.5, xl: 4 }}
                    fontSize={{ base: "xs", xl: "md" }}
                  >
                    Changes Saved
                  </Box>
                </Then>
              </If>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default EditSportProfile;

EditSportProfile.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
