import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Input,
  Text,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";
import dayjs from "dayjs";
import { If, Then } from "react-if";
import * as Yup from "yup";
import {
  useRef,
  MutableRefObject,
  useState,
  useEffect,
  ReactElement,
} from "react";
import ErrorMessage from "@/components/common/ErrorMessage";
import Select from "@/components/common/Select";
import DateSelect from "@/components/ui/DateSelect";
import SelectGender from "@/components/ui/SelectGender";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { isValidDate } from "@/utils/time";
import { IconEdit } from "@/components/svg/IconEdit";
import {
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
  LARGE_SIZE_MESSAGE,
  MAX_SIZE,
} from "@/utils/inputRules";
import BackButton from "@/components/ui/BackButton";
import { useAuthContext } from "@/context/AuthContext";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { useUser } from "@/hooks/useUser";
import { useMyUserProfile, useSports, useUploadAvatarToUser } from "@/libs/dtl";
import { useFanProfile } from "@/libs/dtl/fanProfile";
import { filterSelectOptions, isValidString } from "@/utils/functions";

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  sports: [],
  avatar: "",
  isAdmin: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, "First name cannot exceed 20 characters")
    .test(
      "invalid-first-name",
      "This field contains text only",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    )
    .required("This is a required field"),
  lastName: Yup.string()
    .max(20, "Last name cannot exceed 20 characters")
    .test(
      "invalid-last-name",
      "This field contains text only",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    )
    .required("This is a required field"),
  dateOfBirth: Yup.string()
    .required("This is a required field")
    .test("valid-date", "Invalid date", (value) => {
      return isValidDate(value);
    }),
  gender: Yup.string().required("This is a required field"),
  sports: Yup.array().when("isAdmin", {
    is: false,
    then: Yup.array().min(1, "This is a required field"),
  }),
  isAdmin: Yup.boolean(),
});

const EditAccountInfo = () => {
  const { sportsMapped: sportsList } = useSports();
  const { isAdmin, isFan } = useUser();
  const { data: userProfile } = useMyUserProfile();
  const { data: fanData } = useFanProfile();
  const { updateDocument, isUpdating, success } = useUpdateDoc();
  const upload = useRef() as MutableRefObject<HTMLInputElement>;
  const [fileSubmit, setFileSubmit] = useState<File>();
  const { uploadAvatar, isLoading } = useUploadAvatarToUser();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      if (!!userProfile?.id) {
        const paramsUser = {
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: dayjs(values?.dateOfBirth).toDate(), // TODO check this
          gender: +values.gender,
        };

        const sports = await values.sports.map((entry: any) => ({
          key: entry?.value,
          label: entry?.label,
        }));

        const paramsFanProfile = {
          dateOfBirth: paramsUser.dateOfBirth,
          sports: sports,
        };

        if (!!fileSubmit) {
          const avatarUrl = await uploadAvatar(fileSubmit);
          await updateDocument(`user/${userProfile?.id}`, {
            avatar: avatarUrl,
          });
        }

        await updateDocument(`user/${userProfile?.id}`, paramsUser);
        await updateDocument(`fanProfile/${userProfile?.id}`, paramsFanProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (userProfile) {
      const dateOfBirth = dayjs(userProfile.dateOfBirth).format("YYYY-MM-DD");

      formik.setFieldValue("firstName", userProfile.firstName);
      formik.setFieldValue("lastName", userProfile.lastName);
      formik.setFieldValue("dateOfBirth", dateOfBirth);
      formik.setFieldValue("gender", userProfile.gender);
      formik.setFieldValue("avatar", userProfile.avatar);
      formik.setFieldValue("isAdmin", isAdmin);

      // Hay que convertir el array de deportes en un array que entienda el componente Select
      if (fanData && fanData.sports) {
        const userSport = fanData?.sports.map((sport) => ({
          value: sport.key,
          label: sport.label,
        }));
        formik.setFieldValue("sports", userSport);
      }
    }
  }, [userProfile, fanData, isAdmin]);

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
    setFileSubmit(selectedFile);
    setErrorMessage(null);
  };

  return (
    <Box bg="white" color="white" pt={{ base: 5, lg: 0 }} minH="100vh">
      <Head>
        <title>
          {`${isAdmin ? "Admin" : "Fan"} | Edit Account Information`}
        </title>
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
            <BackButton
              href="/fan/my-profile"
              title="Edit Account Information"
            />
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
                  fontWeight={500}
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
                  fontWeight={500}
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
                      src={formik.values.avatar}
                      alt="user-avatar"
                      objectFit="cover"
                      rounded="full"
                      fallbackSrc="/images/DefaultAvaCircle.png"
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
              <If condition={isFan}>
                <Then>
                  <Box mb={7}>
                    <Box fontWeight="medium" mb={2}>
                      Interested Sport{" "}
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
                        onChange={(value) =>
                          formik.setFieldValue("sports", value)
                        }
                        errorMessage={formik.errors.sports}
                        isInvalid={Boolean(formik.errors.sports)}
                        filterSelectOptions={filterSelectOptions}
                      />
                    </Box>
                  </Box>
                </Then>
              </If>
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
                  isLoading={isUpdating || isLoading}
                  fontSize={{ base: "md", xl: "xl" }}
                >
                  SAVE
                </Button>
                {success && (
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

export default EditAccountInfo;

EditAccountInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
