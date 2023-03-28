import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import SelectGender from "@/components/ui/SelectGender";
import Select from "@/components/common/Select";
import { useGetNationalityQuery } from "@/api/global";
import { filterSelectOptions } from "@/utils/functions";
import { styles } from "./styles";
import {
  initialAddpayment,
  initialValues,
  validationSchema,
} from "../../constants";

interface IProp {
  onSubmit: (values: initialAddpayment) => void;
  initialValues?: initialAddpayment;
}

const AddPayment: React.FC<IProp> = ({ onSubmit }) => {
  const [nation, setNation] = useState<{ value: string; label: string }>({
    value: "",
    label: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { data: nationalityList } = useGetNationalityQuery("");
  return (
    <Center
      color="white"
      flexDirection="column"
      p={{ base: "5", xl: "19rem" }}
      pt={{ xl: "3.75rem" }}
    >
      <Box w={{ xl: "30rem" }}>
        <Box w="full" fontWeight="bold">
          <ArrowLeft
            verticalAlign=""
            w={{ base: "14px", xl: "18px" }}
            h={{ base: "14px", xl: "18px" }}
          />
          <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
            Add Payment Method
          </Text>
        </Box>
        <Box w="full" fontSize={{ base: "sm", xl: "md" }}>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium">
                Legal First Name
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Input
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
                fontSize={{ xl: "sm" }}
                mt={0.5}
                condition={formik.errors.firstName && formik.touched.firstName}
                errorMessage={formik.errors.firstName}
              />
            </Box>
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium">
                Legal Last Name
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Input
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
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium">
                Date of Birth
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Flex
                justifyContent="space-between"
                gap={{ base: 3, lg: 8 }}
                mt="2"
              >
                <DateSelect
                  date={formik.values?.dateOfBirth}
                  onChange={(value) =>
                    formik.setFieldValue("dateOfBirth", value)
                  }
                  submitted={!!formik.submitCount}
                  zIndex={20}
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
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium" mb="3">
                Gender
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <SelectGender
                value={formik.values.gender}
                onChange={(value) => formik.setFieldValue("gender", value)}
                errorMessage={
                  formik.errors.gender && formik.touched.gender
                    ? "This is a required field"
                    : ""
                }
                flexRow={true}
                bgColor="primary"
              />
            </Box>
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium">
                Nationality
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Box mt={{ base: "2", xl: "4" }}>
                <Select
                  value={nation}
                  options={nationalityList}
                  filterSelectOptions={filterSelectOptions}
                  onChange={(el: { value: string; label: string }) => {
                    formik.setFieldValue("nationality", el.value);
                    setNation(el);
                  }}
                  errorMessage={"This is a required field"}
                  isInvalid={Boolean(
                    formik.errors.nationality && formik.touched.nationality
                  )}
                />
              </Box>
            </Box>
            <Box mt={{ base: "5", xl: "8" }}>
              <Box fontWeight="medium">
                My Story
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Text
                color="secondary"
                fontSize={{ base: "xs", xl: "md" }}
                mt="1"
              >
                This is the first thing potential patrons will see when they
                land on your page, so make sure you paint a compelling picture
                of how they can join you on this journey.
              </Text>
              <Textarea
                id="myStory"
                name="myStory"
                variant="flushed"
                onChange={formik.handleChange}
                value={formik.values.myStory}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                resize={"none"}
                size={{ base: "sm", xl: "md" }}
                minH={20}
                style={styles.textarea}
                isInvalid={Boolean(
                  formik.errors.myStory && formik.touched.myStory
                )}
                mt="2"
              />
              <ErrorMessage
                mb={8}
                condition={formik.errors.myStory && formik.touched.myStory}
                errorMessage={formik.errors.myStory}
              />
            </Box>
            <Button
              bg="secondary"
              color="primary"
              w={{ base: "100%", xl: "auto" }}
              mt={"12"}
              fontWeight={"bold"}
              type="submit"
              fontSize={{ xl: "xl" }}
              float={{ xl: "right" }}
            >
              SAVE
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default AddPayment;
