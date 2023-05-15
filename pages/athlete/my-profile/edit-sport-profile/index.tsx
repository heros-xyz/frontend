import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { If, Then } from "react-if";
import * as Yup from "yup";
import TextareaAutoSize from "react-textarea-autosize";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import Select from "@/components/common/Select";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IHerosError } from "@/types/globals/types";
import { colors } from "@/styles/themes/colors";
import { useDevice } from "@/hooks/useDevice";
import BackButton from "@/components/ui/BackButton";
import { useSports } from "@/libs/dtl";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";
import useUpdateDoc from "@/hooks/useUpdateDoc";

const EditSportProfile = () => {
  const toast = useToast();
  const { isDesktop } = useDevice();
  const { sportsMapped: sportsList } = useSports();
  const {
    updateDocument: updateSportProfile,
    success: successEdit,
    isUpdating: isLoading,
    error,
  } = useUpdateDoc();

  const { athleteProfile: sportProfile } = useGetAthleteProfile();
  useEffect(() => {
    if (sportProfile) {
      formik.setFieldValue("sports", {
        value: sportProfile?.sport?.key,
        label: sportProfile?.sport?.label,
      });
      formik.setFieldValue("currentTeam", sportProfile?.currentTeam);
      formik.setFieldValue("goal", sportProfile?.goal);
    }
  }, [
    sportProfile?.currentTeam,
    sportProfile?.goal,
    sportProfile?.sport?.key,
    sportProfile?.sport?.label,
  ]);

  const validationSchema = Yup.object().shape({
    sports: Yup.object().shape({
      label: Yup.string().required("This is a required field!"),
    }),
    currentTeam: Yup.string().max(
      100,
      "Current team/ association/ club cannot exceed 100 characters"
    ),
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
    onSubmit: async (values) => {
      const newValues = {
        sport: {
          label: values.sports.label,
          key: values.sports.value,
        },
        currentTeam: values.currentTeam,
        goal: values.goal,
      };

      try {
        updateSportProfile(`athleteProfile/${sportProfile?.id}`, newValues);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  if (!sportProfile) {
    return <></>;
  }

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
              <BackButton
                href="/athlete/my-profile"
                title="Edit Sport Profile"
              />
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
                  placeholder="Current Team/ association/ Club"
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
                <TextareaAutoSize
                  id="goal"
                  name="goal"
                  className="postComment"
                  placeholder="Tell Your Goal"
                  style={{
                    width: "100%",
                    borderBottom: `1px solid ${colors.grey[200]}`,
                    outline: "none",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: 0,
                    borderRadius: 0,
                    fontWeight: 500,
                    fontSize: isDesktop ? "18px" : "14px",
                    lineHeight: isDesktop ? "28px" : "22px",
                    borderColor: Boolean(
                      formik.errors.goal && formik.touched.goal
                    )
                      ? colors.error.dark
                      : colors.grey[200],
                  }}
                  minRows={2}
                  maxRows={10}
                  value={formik.values?.goal}
                  onChange={(el) =>
                    formik.setFieldValue("goal", el.target.value)
                  }
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
                _hover={{}}
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
