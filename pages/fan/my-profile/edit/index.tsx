import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Input,
  Link,
  Text,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Head from "next/head";
import { useFormik } from "formik";
import NextLink from "next/link";
import { If, Then } from "react-if";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { useGetSportListQuery } from "@/api/global";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import ErrorMessage from "@/components/common/ErrorMessage";
import DateSelect from "@/components/ui/DateSelect";
import SelectGender from "@/components/ui/SelectGender";
import Select from "@/components/common/Select";
import {
  filterSelectOptions,
  isValidDate,
  isValidString,
} from "@/utils/functions";
import { getImageLink } from "@/utils/link";
import { IconEdit } from "@/components/svg/IconEdit";
import {
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
  LARGE_SIZE_MESSAGE,
  MAX_SIZE,
} from "@/utils/inputRules";
import { useEditFanInfoMutation, useGetFanSettingQuery } from "@/api/fan";
import { updateSession } from "@/utils/auth";

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  sports: [],
  avatar: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, "First name cannot exceed 20 characters")
    .test(
      "invalid-first-name",
      "First name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return false;
      }
    )
    .required("This is a required field"),
  lastName: Yup.string()
    .max(20, "Last name cannot exceed 20 characters")
    .test(
      "invalid-last-name",
      "Last name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return false;
      }
    )
    .required("This is a required field"),
  dateOfBirth: Yup.string()
    .required("This is a required field")
    .test("valid-date", "Invalid date", (value) => {
      return isValidDate(value);
    }),
  gender: Yup.string().required("This is a required field"),
  sports: Yup.array().min(1, "This is a required field"),
});

const EditAccountInfo = () => {
  const { data: sportsList } = useGetSportListQuery("");
  const { data: fanProfile, refetch } = useGetFanSettingQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const initialRef: any = null;
  const upload = useRef(initialRef);
  const [image, setImage] = useState("");
  const [fileSubmit, setFileSubmit] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editFanInfo, { isLoading, isSuccess }] = useEditFanInfoMutation();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { dateOfBirth, gender, sports, ...newValues } = values;
      const sportSubmit = sports
        .map((el: { value: string }) => el?.value)
        .join();
      editFanInfo({
        ...newValues,
        dateOfBirth: dateOfBirth + "T00:00:00Z",
        gender: parseInt(gender),
        avatar: fileSubmit,
        sportIds: sportSubmit,
      });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      refetch();
      updateSession();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (fanProfile) {
      formik.setFieldValue("firstName", fanProfile.firstName);
      formik.setFieldValue("lastName", fanProfile.lastName);
      formik.setFieldValue("dateOfBirth", fanProfile.dateOfBirth);
      formik.setFieldValue("gender", fanProfile.gender.toString());
      formik.setFieldValue("avatar", fanProfile.avatar);
      const userSport = fanProfile?.fanInformation?.fanSports.map((el) => {
        return {
          label: el?.sport?.name,
          value: el?.sport?.id,
        };
      });
      if (userSport) {
        formik.setFieldValue("sports", userSport);
      }
    }
  }, [fanProfile]);

  const onClickUploadImage = () => {
    upload?.current?.click();
  };

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    if (selectedFile.size > MAX_SIZE) {
      setErrorMessage(LARGE_SIZE_MESSAGE);
      return;
    }
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage(FILE_FORMAT_MESSAGE);
      return;
    }
    formik.setFieldValue("avatar", URL.createObjectURL(selectedFile));
    setImage(URL.createObjectURL(selectedFile));
    setFileSubmit(selectedFile);
    setErrorMessage(null);
  };

  return (
    <Box bg="white" color="white" pt={5} minH="100vh">
      <Head>
        <title>Fan | Edit Account Information</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]}>
        <Box
          w="auto"
          bg="white"
          minH="100vh"
          fontSize={{ base: "sm", xl: "xl" }}
          color="primary"
          alignItems="baseline"
          mb={{ base: 30, xl: 20 }}
        >
          <Box
            w="full"
            pt={{ base: 0, xl: "4rem" }}
            fontWeight="bold"
            fontSize={{ base: "xs", xl: "xl" }}
          >
            <Link as={NextLink} href={"/fan/my-profile"}>
              <ArrowLeft
                verticalAlign=""
                w={{ base: "14px", xl: "18px" }}
                h={{ base: "14px", xl: "18px" }}
              />
            </Link>
            <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
              Edit Account Information
            </Text>
          </Box>
          <Box fontSize={{ base: "sm", lg: "md" }} color="black">
            <form onSubmit={formik.handleSubmit}>
              <Box my={{ base: 5, lg: 7 }}>
                <Box fontWeight="medium">
                  First Name
                  <Text as="span" color="error.dark">
                    *
                  </Text>
                </Box>
                <Input
                  color="primary"
                  placeholder="First name"
                  autoComplete="off"
                  variant="flushed"
                  w="full"
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  isInvalid={Boolean(
                    formik.errors.firstName && formik.touched.firstName
                  )}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={
                    formik.errors.firstName && formik.touched.firstName
                  }
                  errorMessage={formik.errors.firstName}
                />
              </Box>
              <Box mb={{ base: 5, lg: 7 }}>
                <Box fontWeight="medium">
                  Last name
                  <Text as="span" color="error.dark">
                    *
                  </Text>
                </Box>
                <Input
                  color="primary"
                  placeholder="Last name"
                  autoComplete="off"
                  variant="flushed"
                  w="full"
                  id="lastName"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  isInvalid={Boolean(
                    formik.errors.lastName && formik.touched.lastName
                  )}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={formik.errors.lastName && formik.touched.lastName}
                  errorMessage={formik.errors.lastName}
                />
              </Box>
              <If condition={formik.values?.dateOfBirth}>
                <Then>
                  <Box mb={{ base: 5, lg: 7 }}>
                    <Box fontWeight="medium">
                      Date of Birth
                      <Text as="span" color="error.dark">
                        *
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
              <If condition={formik.values?.gender}>
                <Then>
                  <Box mb={{ base: 5, lg: 7 }}>
                    <Box fontWeight="medium" mb={2}>
                      Gender
                      <Text as="span" color="error.dark">
                        *
                      </Text>
                    </Box>
                    <SelectGender
                      value={`${formik.values.gender}`}
                      flexRow
                      bgColor="primary"
                      onChange={(value) => {
                        formik.setFieldValue("gender", value);
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
              <Box mb={{ base: 5, lg: 7 }}>
                <Box fontWeight="medium" mb={2}>
                  Your profile pic
                </Box>

                <Center>
                  <Box
                    position="relative"
                    cursor="pointer"
                    onClick={onClickUploadImage}
                  >
                    <Image
                      w={{ base: "120px", xl: "160px" }}
                      h={{ base: "120px", xl: "160px" }}
                      src={image || getImageLink(formik.values.avatar)}
                      alt="user-avatar"
                      objectFit="cover"
                      rounded="full"
                      fallbackSrc="https://via.placeholder.com/50"
                    />
                    <Center
                      position="absolute"
                      w={{ base: "120px", xl: "160px" }}
                      h={{ base: "120px", xl: "160px" }}
                      top="0"
                      left="0"
                      rounded="full"
                      bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))"
                    >
                      <IconEdit color="primary" />
                    </Center>
                  </Box>
                </Center>
                <Center>
                  {errorMessage && (
                    <Box
                      mt={2}
                      color="error.dark"
                      data-testid="error-message"
                      fontSize="xs"
                    >
                      {errorMessage}
                    </Box>
                  )}
                </Center>
                <VisuallyHiddenInput
                  ref={upload}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={onChangeAvatar}
                />
              </Box>
              <Box mb={7}>
                <Box fontWeight="medium" mb={2}>
                  Interested Sport
                  <Text as="span" color="error.dark">
                    *
                  </Text>
                </Box>
                <Box fontSize={{ base: "sm", xl: "lg" }}>
                  <Select
                    isDarkTheme
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
              <Box
                display="flex"
                alignItems={{ base: "center", xl: "end" }}
                flexDirection="column"
              >
                <Button
                  variant="secondary"
                  w={{ base: "100%", xl: "auto" }}
                  mt={2}
                  mb={2}
                  type="submit"
                  isDisabled={!!errorMessage}
                  isLoading={isLoading}
                  fontSize={{ base: "md", xl: "xl" }}
                >
                  SAVE
                </Button>
                {isSuccess && (
                  <Text color={"#65D169"} fontSize={["xs", "md"]}>
                    Changes saved!
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

export default EditAccountInfo;

EditAccountInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
