import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { If, Then } from "react-if";
import DateSelect from "@/components/ui/DateSelect";
import ErrorMessage from "@/components/common/ErrorMessage";
import { SPORT_ICONS_MOCK } from "@/utils/mock-icon";
import { IMilestone, initialValues, validationSchema } from "../../constants";
import { styles } from "./styles";

interface IProp {
  onSubmit: (values: IMilestone) => void;
  values?: IMilestone;
}

const AddMilestone: React.FC<IProp> = ({ values, onSubmit }) => {
  const [iconCheck, setIconCheck] = useState("");

  const formik = useFormik({
    initialValues: values || initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleClickIcon = (value: string, iconCheck: string) => {
    setIconCheck(value !== iconCheck ? value : "");
    formik.setFieldValue("icon", value === iconCheck ? "" : value);
  };

  return (
    <Box
      w="auto"
      bg="secondary"
      minH="100vh"
      fontSize={{ base: "sm", xl: "xl" }}
      color="primary"
      alignItems="baseline"
    >
      <Center
        pt={{ base: 5, xl: "4rem" }}
        fontWeight="extrabold"
        fontSize={{ base: "xs", xl: "xl" }}
      >
        CAREER JOURNEY
      </Center>
      <Text mt={7} fontWeight="bold" fontSize={{ base: "md ", xl: "xl" }}>
        ADD MILESTONE
      </Text>
      <Box fontSize={{ base: "sm", lg: "xl" }}>
        <form onSubmit={formik.handleSubmit}>
          <Flex mt={4}>
            <Checkbox
              id="isPeriodDate"
              name="isPeriodDate"
              onChange={formik.handleChange}
              isChecked={formik.values.isPeriodDate}
              colorScheme="facebook"
              borderColor="#313F4C"
              sx={{
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
          <Box mb={{ base: 10, lg: 20 }} color="black.ish">
            <Box fontWeight="medium" mt={7}>
              {formik.values.isPeriodDate ? "Start" : "Enter"} Date
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Flex justifyContent="space-between" gap={{ base: 3, lg: 8 }}>
              <DateSelect
                date={formik.values?.startDate}
                onChange={(value) => formik.setFieldValue("startDate", value)}
                submitted={!!formik.submitCount}
                zIndex={20}
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

          <If condition={formik.values.isPeriodDate}>
            <Then>
              <Box mb={{ base: 12, lg: 20 }} color="black.ish">
                <Box fontWeight="medium" mt={7}>
                  End Date
                  <Text as="span" color="error.dark">
                    {" "}
                    *
                  </Text>
                </Box>
                <Flex justifyContent="space-between" gap={{ base: 3, lg: 8 }}>
                  <DateSelect
                    date={formik.values?.endDate}
                    onChange={(value) => formik.setFieldValue("endDate", value)}
                    submitted={!!formik.submitCount}
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
              isInvalid={Boolean(formik.errors.title && formik.touched.title)}
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
            <Box fontWeight="normal" fontSize={{ base: "xs", lg: "md" }} mb={4}>
              Make your milestone even more interesting!
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={1}>
              {SPORT_ICONS_MOCK.map((el) => {
                return (
                  <GridItem key={el.value} w="100%" pb="2">
                    <Flex>
                      <Button
                        w={{ base: "54px", xl: "80px" }}
                        h={{ base: "54px", xl: "80px" }}
                        borderRadius="full"
                        bg={el.value === iconCheck ? "primary" : "accent.4"}
                        color={el.value === iconCheck ? "secondary" : "primary"}
                        onClick={() => handleClickIcon(el.value, iconCheck)}
                        _hover={{}}
                        _active={{}}
                      >
                        {el.Icon}
                      </Button>
                      <Text
                        display="flex"
                        alignItems="center"
                        ml={1}
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
          <Button
            variant="primary"
            w={{ base: "100%", xl: "auto" }}
            mt={2}
            type="submit"
          >
            SAVE
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddMilestone;
