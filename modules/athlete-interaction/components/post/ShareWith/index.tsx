import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { If, Then } from "react-if";
import { useFormikContext } from "formik";
import DateSelect from "@/components/ui/DateSelect";
import { Clock } from "@/components/svg/Clock";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IValuesTypes } from "../../../hooks";

const ShareWith = () => {
  const { values, errors, setFieldValue } = useFormikContext<IValuesTypes>();

  const renderEarlyAccess = (
    <If condition={values.publicType === "fanOnly"}>
      <Then>
        <Flex gap={4} alignItems="center" mb={{ base: 4, lg: 8 }}>
          <Heading fontSize={{ lg: "xl" }} color="white">
            Early access
          </Heading>
          <Switch
            variant="primary"
            size={{ base: "md", lg: "lg" }}
            isChecked={values.earlyAccess}
            onChange={(val) => setFieldValue("earlyAccess", val.target.checked)}
          />
        </Flex>
        <If condition={values.earlyAccess}>
          <Then>
            <Box>
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color="acccent.3"
                mb={{ base: 2, lg: 6 }}
              >
                This interaction will become public on:
              </Text>
              <Box mb={{ base: 4, lg: 8 }}>
                <Flex
                  fontSize={{ base: "sm", lg: "lg" }}
                  justifyContent="space-between"
                  gap={{ base: 5, lg: 8 }}
                >
                  <DateSelect
                    isDarkTheme
                    onChange={(value) => setFieldValue("publicDate", value)}
                    date={values?.publicDate}
                    submitted={false}
                    zIndex={20}
                  />
                </Flex>
                <ErrorMessage
                  mt={1}
                  condition={errors.publicDate}
                  errorMessage={errors.publicDate}
                />
              </Box>

              <InputGroup position="relative" mb={4}>
                <Input
                  type="time"
                  variant="flushed"
                  value={values.publicTime}
                  color="white"
                  fontSize={{ base: "sm", lg: "lg" }}
                  onChange={(e) => setFieldValue("publicTime", e.target.value)}
                />
                <Clock
                  w={5}
                  h={5}
                  color="white"
                  bg="primary"
                  position="absolute"
                  right={0}
                  bottom={2.5}
                />
              </InputGroup>
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color="acccent.1"
                mb={4}
              >
                *Time is in your local timezone.
              </Text>
            </Box>
          </Then>
        </If>
      </Then>
    </If>
  );
  return (
    <Box>
      <Box
        p={{ base: 4, lg: 6 }}
        bg="acccent.1"
        rounded={{ base: "md", lg: "xl" }}
        mb={{ base: 5, lg: 8 }}
      >
        <Heading fontSize={{ lg: "xl" }} mb={4}>
          Share with ...
        </Heading>
        <RadioGroup
          value={values.publicType}
          colorScheme="purple"
          onChange={(value) => setFieldValue("publicType", value)}
        >
          <Stack spacing={4} direction="column">
            <Radio variant="primary" value="all">
              <Text fontSize={{ base: "xs", lg: "lg" }}>All users</Text>
            </Radio>
            <Radio variant="primary" value="fanOnly">
              <Text fontSize={{ base: "xs", lg: "lg" }}>Fans only</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {renderEarlyAccess}
    </Box>
  );
};

export default ShareWith;
