import { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { If, Then } from "react-if";
import { useUpdateEffect } from "react-use";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import {
  useDeleteMilestoneMutation,
  useEditMilestoneMutation,
  useGetMilestoneQuery,
} from "@/api/athlete";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import { SPORT_ICONS_MOCK } from "@/utils/mock-icon";
import { TrashIcon } from "@/components/svg/TrashIcon";
import DeleteSubscription from "@/components/ui/DeleteSubscription";
import { styles } from "@/modules/athlete-dashboard/components/AddPayment/styles";
import {
  initialValues,
  validationSchema,
} from "@/modules/athlete-onboarding/career-journey/constants";

const EditMilestone = () => {
  const router = useRouter();
  const [iconCheck, setIconCheck] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: milestoneData } = useGetMilestoneQuery(
    router.query.id as string,
    { skip: typeof router.query.id !== "string" || router.query.id === "0" }
  );
  const [editMilestone, { isLoading: loadingEdit, isSuccess: successEdit }] =
    useEditMilestoneMutation();
  const [
    deleteMilestone,
    { isLoading: loadingDelete, isSuccess: successDelete },
  ] = useDeleteMilestoneMutation();
  const formik = useFormik({
    initialValues: milestoneData ?? initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!loadingEdit && !successEdit) {
        const editData = {
          isPeriodDate: values.isPeriodDate,
          startDate: values.startDate,
          endDate: values.isPeriodDate ? values.endDate : "",
          icon: values.icon,
          title: values.title,
          description: values.description,
        };
        if (router.query.id === "0") {
          editMilestone(editData);
        } else {
          editMilestone({ id: router.query.id as string, ...editData });
        }
      }
    },
  });
  useUpdateEffect(() => {
    if (router.query.id === "0" && successEdit) {
      router.push("/athlete/my-profile/edit-journey");
    }
  }, [successEdit]);

  useEffect(() => {
    setIconCheck(milestoneData?.icon ?? null);
    formik.setFieldValue("icon", milestoneData?.icon);
    formik.setFieldValue("title", milestoneData?.title);
    formik.setFieldValue("endDate", milestoneData?.endDate ?? "");
    formik.setFieldValue("description", milestoneData?.description);
    formik.setFieldValue("startDate", milestoneData?.startDate);
    formik.setFieldValue("isPeriodDate", milestoneData?.endDate ? true : false);
  }, [milestoneData]);

  const handleClickIcon = (value: string, iconCheck: string | null) => {
    setIconCheck(value !== iconCheck ? value : "");
    formik.setFieldValue("icon", value === iconCheck ? null : value);
  };

  const handleDelete = () => {
    if (!loadingDelete) {
      deleteMilestone(router.query.id as string);
    }
  };
  useUpdateEffect(() => {
    if (successDelete) {
      router.push("/athlete/my-profile/edit-journey");
    }
  }, [successDelete]);
  return (
    <Box px={{ base: 5, lg: 0 }} bg="white" minH="100vh" position="relative">
      <Head>
        <title>Athlete | Edit Journey</title>
      </Head>
      <Container size={["full", "sm", "md", "lg", "500px"]}>
        <Box pb={{ base: 16, xl: 8 }}>
          <Flex
            w="full"
            fontWeight="bold"
            pt={{ base: 5, xl: "3.75rem" }}
            mb={{ base: 5, lg: 8 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <ArrowLeft
                verticalAlign=""
                w={{ base: "14px", xl: "18px" }}
                h={{ base: "14px", xl: "18px" }}
                cursor="pointer"
                onClick={() => router.push("/athlete/my-profile/edit-journey")}
              />
              <Text
                as="span"
                ml="6"
                color="primary"
                fontSize={{ base: "xl", xl: "2xl" }}
              >
                {router.query.id && router.query.id !== "0" ? "Edit" : "Add"}{" "}
                Milestone
              </Text>
            </Box>
            <If condition={router.query.id && router.query.id !== "0"}>
              <Then>
                <TrashIcon
                  w={{ base: "16px", xl: "20px" }}
                  h={{ base: "18px", xl: "24px" }}
                  color="primary"
                  cursor="pointer"
                  onClick={onOpen}
                />
              </Then>
            </If>
          </Flex>
          <Box fontSize={{ base: "sm", lg: "md" }} color="primary">
            <form onSubmit={formik.handleSubmit}>
              <Flex mt={4}>
                <Checkbox
                  id="isPeriodDate"
                  name="isPeriodDate"
                  onChange={formik.handleChange}
                  isChecked={formik.values.isPeriodDate}
                  colorScheme="#FFC0F0"
                  iconColor="black"
                  sx={{
                    _checked: {
                      span: {
                        bg: "accent.4",
                      },
                    },
                    span: {
                      borderRadius: 4,
                    },
                  }}
                />
                <Text
                  ml="2.5"
                  fontSize={{ base: "xs", lg: "md" }}
                  fontWeight="medium"
                >
                  I want this to be a period of time
                </Text>
              </Flex>
              <If
                condition={router.query.id === "0" || formik.values.startDate}
              >
                <Then>
                  <Box mb={7}>
                    <Box fontWeight="medium" mt={7}>
                      Enter Date
                      <Text as="span" color="error.dark">
                        {" "}
                        *
                      </Text>
                    </Box>
                    <Flex
                      justifyContent="space-between"
                      gap={{ base: 3, lg: 8 }}
                    >
                      <DateSelect
                        date={formik.values.startDate}
                        onChange={(value) => {
                          formik.setFieldValue("startDate", value);
                        }}
                        submitted={!!formik.submitCount}
                        zIndex={20}
                        isDarkTheme
                      />
                    </Flex>
                    <ErrorMessage
                      mt={0.5}
                      condition={Boolean(
                        formik.submitCount && formik.errors?.startDate
                      )}
                      errorMessage={formik.errors?.startDate}
                    />
                  </Box>
                </Then>
              </If>

              <If condition={formik.values.isPeriodDate}>
                <Then>
                  <Box mb={7}>
                    <Box fontWeight="medium" mt={7}>
                      End Date
                      <Text as="span" color="error.dark">
                        {" "}
                        *
                      </Text>
                    </Box>
                    <Flex
                      justifyContent="space-between"
                      gap={{ base: 3, lg: 8 }}
                    >
                      <DateSelect
                        date={formik.values?.endDate ?? ""}
                        onChange={(value) =>
                          formik.setFieldValue("endDate", value)
                        }
                        submitted={!!formik.submitCount}
                        isDarkTheme
                      />
                    </Flex>
                    <ErrorMessage
                      mt={0.5}
                      condition={Boolean(
                        formik.submitCount && formik.errors?.endDate
                      )}
                      errorMessage={formik.errors?.endDate}
                    />
                  </Box>
                </Then>
              </If>

              <Box mb={7}>
                <Box fontWeight="medium">
                  Enter Name/Title
                  <Text as="span" color="error.dark">
                    {" "}
                    *
                  </Text>
                </Box>
                <Textarea
                  id="title"
                  name="title"
                  variant="flushed"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="It can be name of Medal/Certificate/Prize or anything that important to you"
                  resize={"none"}
                  size={{ base: "sm", xl: "md" }}
                  minH={16}
                  style={styles.textarea}
                  isInvalid={Boolean(
                    formik.errors.title && formik.touched.title
                  )}
                />
                <ErrorMessage
                  mt={0.5}
                  condition={formik.errors.title && formik.touched.title}
                  errorMessage={formik.errors.title}
                />
              </Box>

              <Box mb={7}>
                <Box fontWeight="medium">Enter Description/Subtitle</Box>
                <Textarea
                  id="description"
                  name="description"
                  variant="flushed"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="Describe further for your fan to understand (Where did it happen/ How...)"
                  resize={"none"}
                  size={{ base: "sm", xl: "md" }}
                  minH={16}
                  style={styles.textarea}
                  isInvalid={Boolean(
                    formik.errors.description && formik.touched.description
                  )}
                />
                <ErrorMessage
                  mb={8}
                  condition={
                    formik.errors.description && formik.touched.description
                  }
                  errorMessage={formik.errors.description}
                />
              </Box>

              <Box mb={8}>
                <Box fontWeight="medium" mb={3}>
                  Choose an icon to represent the milestone
                </Box>
                <Box
                  fontWeight="normal"
                  fontSize={{ base: "xs", lg: "md" }}
                  mb={4}
                  color="grey.200"
                >
                  Make your milestone even more interesting!
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                  {SPORT_ICONS_MOCK.map((el) => {
                    return (
                      <GridItem key={el.value} w="100%" pb="2">
                        <Flex>
                          <Button
                            w={{ base: "50px", xl: "70px" }}
                            h={{ base: "50px", xl: "70px" }}
                            borderRadius="full"
                            bg={el.value === iconCheck ? "primary" : "accent.3"}
                            color={
                              el.value === iconCheck ? "accent.3" : "primary"
                            }
                            onClick={() => handleClickIcon(el.value, iconCheck)}
                            _hover={{}}
                            _active={{}}
                          >
                            {el.Icon}
                          </Button>
                          <Text
                            display="flex"
                            alignItems="center"
                            ml={{ base: 1, xl: 2 }}
                            fontSize={{ base: "xs", xl: "md" }}
                          >
                            {el.name}
                          </Text>
                        </Flex>
                      </GridItem>
                    );
                  })}
                </Grid>
              </Box>
              <Box float={{ xl: "right" }}>
                <Button
                  bg="secondary"
                  color="primary"
                  w={{ base: "100%", xl: "auto" }}
                  mt={2}
                  type="submit"
                  fontSize={{ base: "md", xl: "xl" }}
                >
                  SAVE
                </Button>
                <If condition={successEdit}>
                  <Then>
                    <Center
                      color="#65D169"
                      mt={{ base: 2.5, xl: 4 }}
                      fontSize={{ base: "xs", xl: "md" }}
                    >
                      Changes saved!
                    </Center>
                  </Then>
                </If>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          pt="5"
          px="4"
          maxW="unset"
          w={{ base: "95%", lg: "740px" }}
        >
          <DeleteSubscription
            name=" "
            message="This action cannot be undone. Are you sure you want to delete this milestone?"
            confirm="yes, delete"
            cancel="Cancel"
            onCancel={onClose}
            onSubmit={handleDelete}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditMilestone;

EditMilestone.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
