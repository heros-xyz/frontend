import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";

import { useFormik } from "formik";
import { ReactElement, useEffect, useMemo } from "react";
import { If, Then } from "react-if";
import TextareaAutoSize from "react-textarea-autosize";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import DateSelect from "@/components/ui/DateSelect";
import Select from "@/components/common/Select";
import ErrorMessage from "@/components/common/ErrorMessage";
import { filterSelectOptions } from "@/utils/functions";
import SelectGender from "@/components/ui/SelectGender";
import {
  initialBasicValues,
  validationSchema,
} from "@/modules/athlete-profile/EditBasicInfo/constants";
import { colors } from "@/styles/themes/colors";
import { useDevice } from "@/hooks/useDevice";
import BackButton from "@/components/ui/BackButton";
import { Nationality, useGetNationalities } from "@/libs/dtl/nationalities";
import { useAuthContext } from "@/context/AuthContext";
import {
  AthleteProfile,
  useMyAthleteProfile,
} from "@/libs/dtl/athleteProfile";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { useMyUserProfile, User } from "@/libs/dtl";
import { IHerosError } from "@/types/globals/types";

const EditBasicInfo = () => {
  const toast = useToast();
  const { isDesktop } = useDevice();
  const myUserProfile = useMyUserProfile();
  const myAthleteProfile = useMyAthleteProfile();
  const loading = useMemo(() => {
    return myUserProfile.loading || myAthleteProfile.loading
  }, [myUserProfile, myAthleteProfile]);
  const { nationalitiesMapped: nationalityList } = useGetNationalities();
  const {
    updateDocument,
    success: isSuccess,
    isUpdating: isLoading,
    error,
  } = useUpdateDoc();

  const formik = useFormik({
    initialValues: initialBasicValues,
    validationSchema,
    onSubmit: async (values) => {
      const updateUserParams: Partial<User> = {
        dateOfBirth: values?.dateOfBirth as unknown as Date, // TODO check this
        firstName: values?.firstName,
        middleName: values?.middleName,
        gender: Number(values.gender),
        nationality:
          values?.nationality.label !== myUserProfile.data?.nationality?.name
            ? (values?.nationality as unknown as Nationality)
            : undefined,
      };

      const updateAthleteProfileParams: Partial<AthleteProfile> = {
        story: values?.story,
        nationality: updateUserParams.nationality,
        gender: String(updateUserParams?.gender),
        firstName: updateUserParams?.firstName,
        dateOfBirth: updateUserParams.dateOfBirth,
      };

      try {
        await myUserProfile.update(updateUserParams)
        await myAthleteProfile.update(updateAthleteProfileParams);
      } catch (error) {
        console.warn(error);
      }
    },
  });

  useEffect(() => {
    if (!loading && myAthleteProfile.data) {
      formik.setFieldValue("firstName", myAthleteProfile.data?.firstName);
      formik.setFieldValue("lastName", myAthleteProfile.data?.lastName);
      formik.setFieldValue("middleName", myAthleteProfile.data?.middleName || "");
      formik.setFieldValue("dateOfBirth", myAthleteProfile.data?.dateOfBirth);
      formik.setFieldValue("gender", myAthleteProfile.data?.gender?.toString?.());
      formik.setFieldValue("nationality", {
        value: myAthleteProfile.data?.nationality?.twoLetterCode,
        label: myAthleteProfile.data?.nationality?.name,
      });
      formik.setFieldValue("story", myAthleteProfile.data?.story);
    }
  }, [
    myAthleteProfile.data,
  ]);

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  if (loading) {
    return <></>;
  }

  return (
    <Box pt={{ base: 5, lg: 0 }} minH="100vh">
      <Head>
        <title>Athlete | Edit Personal Information</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box
          w="auto"
          minH="100vh"
          fontSize={{ base: "sm", xl: "xl" }}
          color="primary"
          alignItems="baseline"
        >
          <Box
            w="full"
            pt={{ base: 0, xl: "4rem" }}
            fontWeight="bold"
            fontSize={{ base: "xs", xl: "xl" }}
          >
            <BackButton
              href="/athlete/my-profile"
              title="Edit Personal Information"
            />
          </Box>
          <Box fontSize={{ base: "sm", lg: "xl" }}>
            <form onSubmit={formik.handleSubmit}>
              <Box my={7}>
                <Box fontWeight="medium">
                  <Text as="span" color="black.primary">
                    {" "}
                    Legal First Name
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Box>
                <Input
                  placeholder="First name *"
                  _placeholder={{ color: "grey.200" }}
                  variant="flushed"
                  w="full"
                  id="firstName"
                  name="firstName"
                  fontWeight={500}
                  fontSize={{ base: "sm", lg: "lg" }}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  isInvalid={Boolean(
                    formik.errors.firstName && formik.touched.firstName
                  )}
                  borderColor="grey.200"
                  _focusVisible={{
                    borderColor: "grey.200",
                    boxShadow: "none",
                  }}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={
                    formik.errors.firstName && formik.touched.firstName
                  }
                  errorMessage={formik.errors.firstName}
                />
              </Box>
              <Box my={7}>
                <Box fontWeight="medium" color="black.primary">
                  Legal Middle Name (Optional)
                </Box>
                <Input
                  placeholder="Middle name"
                  _placeholder={{ color: "grey.200" }}
                  variant="flushed"
                  w="full"
                  id="middleName"
                  name="middleName"
                  fontWeight={500}
                  fontSize={{ base: "sm", lg: "lg" }}
                  onChange={formik.handleChange}
                  value={formik.values.middleName}
                  isInvalid={Boolean(
                    formik.errors.middleName && formik.touched.middleName
                  )}
                  borderColor="grey.200"
                  _focusVisible={{
                    borderColor: "grey.200",
                    boxShadow: "none",
                  }}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={
                    formik.errors.middleName && formik.touched.middleName
                  }
                  errorMessage={formik.errors.middleName}
                />
              </Box>
              <Box mb={7}>
                <Box fontWeight="medium">
                  <Text as="span" color="black.primary">
                    {" "}
                    Legal Last Name
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Box>
                <Input
                  placeholder="Last name *"
                  _placeholder={{ color: "grey.200" }}
                  variant="flushed"
                  w="full"
                  id="lastName"
                  name="lastName"
                  fontWeight={500}
                  fontSize={{ base: "sm", lg: "lg" }}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  isInvalid={Boolean(
                    formik.errors.lastName && formik.touched.lastName
                  )}
                  borderColor="grey.200"
                  _focusVisible={{
                    borderColor: "grey.200",
                    boxShadow: "none",
                  }}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={formik.errors.lastName && formik.touched.lastName}
                  errorMessage={formik.errors.lastName}
                />
              </Box>
              <If condition={formik.values?.dateOfBirth}>
                <Then>
                  <Box mb={7} color="primary">
                    <Box fontWeight="medium" mt={7}>
                      <Text as="span" color="black.primary">
                        {" "}
                        Date of Birth
                      </Text>
                      <Text as="span" color="error.dark">
                        {" *"}
                      </Text>
                    </Box>
                    <Flex
                      justifyContent="space-between"
                      gap={{ base: 3, lg: 8 }}
                      color="secondary"
                    >
                      <DateSelect
                        date={formik.values?.dateOfBirth || ""}
                        onChange={(value) =>
                          formik.setFieldValue("dateOfBirth", value)
                        }
                        submitted={!!formik.submitCount}
                        zIndex={20}
                        isDarkTheme={true}
                      />
                    </Flex>
                    <ErrorMessage
                      mt={0.5}
                      condition={Boolean(
                        formik.submitCount && formik.errors?.dateOfBirth
                      )}
                      errorMessage={formik.errors?.dateOfBirth}
                    />
                  </Box>
                </Then>
              </If>

              <If condition={formik.values.gender}>
                <Then>
                  <Box mb={7}>
                    <Box fontWeight="medium" mb={2}>
                      <Text as="span" color="black.primary">
                        {" "}
                        Gender
                      </Text>
                      <Text as="span" color="error.dark">
                        {" *"}
                      </Text>
                    </Box>
                    <SelectGender
                      value={`${formik.values.gender}`}
                      flexRow
                      bgColor="primary"
                      onChange={(value) => {
                        formik.setFieldValue(
                          "gender",
                          value !== "undefined" ? value : formik.values.gender
                        );
                      }}
                      errorMessage={
                        formik.errors.gender && formik.touched.gender
                          ? "This is a required field"
                          : ""
                      }
                    />
                  </Box>
                </Then>
              </If>
              <Box mb={7}>
                <Box fontWeight="medium">
                  <Text as="span" color="black.primary">
                    Nationality
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Box>
                <Box mt={{ base: "2", xl: "4" }}>
                  <Select
                    isDarkTheme
                    optionCount={5}
                    value={formik.values.nationality}
                    options={nationalityList}
                    filterSelectOptions={filterSelectOptions}
                    onChange={(el: { value: string; label: string }) => {
                      formik.setFieldValue("nationality", el);
                    }}
                    errorMessage={"This is a required field"}
                    isInvalid={Boolean(formik?.errors.nationality)}
                  />
                </Box>
              </Box>
              <Box mb={7}>
                <Box fontWeight="medium">
                  <Text as="span" color="black.primary">
                    {" "}
                    My Story
                  </Text>
                  <Text as="span" color="error.dark">
                    {" *"}
                  </Text>
                </Box>
                <Text
                  as="span"
                  color="grey.200"
                  fontSize={{ base: "xs", xl: "md" }}
                  mb={1}
                >
                  Tell your fans your amazing story. This is important as your
                  fans are looking for the inspiration and the connection to
                  invest in you.
                  <br />
                  Your story can include a <b>background</b>, your{" "}
                  <b>life journey</b>, your <b>struggles & wins</b>, the{" "}
                  <b>love for your sport</b> and what you want to <b>achieve</b>
                  .
                </Text>
                <TextareaAutoSize
                  id="story"
                  name="story"
                  className="postComment"
                  placeholder="Tell Your Story"
                  style={{
                    resize: "none",
                    width: "100%",
                    borderBottom: `1px solid`,
                    outline: "none",
                    paddingTop: "10px",
                    paddingLeft: 0,
                    borderRadius: 0,
                    fontWeight: 500,
                    paddingBottom: "10px",
                    fontSize: isDesktop ? "18px" : "14px",
                    lineHeight: isDesktop ? "28px" : "22px",
                    borderColor: Boolean(
                      formik.errors.story && formik.touched.story
                    )
                      ? colors.error.dark
                      : colors.grey[200],
                  }}
                  minRows={2}
                  maxRows={10}
                  value={formik.values.story}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  mb={8}
                  condition={formik.errors.story && formik.touched.story}
                  errorMessage={formik.errors.story}
                />
              </Box>
              <Box
                display="flex"
                alignItems={{ base: "center", lg: "end" }}
                flexDirection="column"
              >
                <Button
                  variant="secondary"
                  w={{ base: "100%", xl: "auto" }}
                  mt={2}
                  mb={2}
                  type="submit"
                  isLoading={isLoading}
                >
                  SAVE
                </Button>
                {isSuccess && (
                  <Text color={"#65D169"} fontSize={["xs", "md"]}>
                    Changes Saved
                  </Text>
                )}
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditBasicInfo;

EditBasicInfo.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
