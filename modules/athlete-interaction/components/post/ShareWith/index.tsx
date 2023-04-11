import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Switch,
  Text,
} from "@chakra-ui/react";
import { If, Then } from "react-if";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import DateSelect from "@/components/ui/DateSelect";
import { Clock } from "@/components/svg/Clock";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IValuesTypes } from "../../../hooks";

interface IShareWithProps {
  isDisabled?: boolean;
}

const ShareWith: React.FC<IShareWithProps> = ({ isDisabled = false }) => {
  const { values, errors, setFieldValue } = useFormikContext<IValuesTypes>();

  return (
    <Box>
      <Then>
        <Flex gap={4} alignItems="center" mb={{ base: 4, lg: 8 }}>
          <Heading fontSize={{ lg: "xl" }} color="accent.2">
            Schedule
          </Heading>
          <Switch
            variant="primary"
            size={{ base: "md", lg: "lg" }}
            isChecked={values.schedule}
            isDisabled={isDisabled}
            onChange={(val) => {
              setFieldValue("schedule", val.target.checked);
              setFieldValue("publicDate", dayjs().format("YYYY-MM-DD"));
              setFieldValue("publicTime", dayjs().format("HH:mm"));
            }}
          />
        </Flex>
        <If condition={values.schedule}>
          <Then>
            <Box>
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color="accent.2"
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
                    isDisabled={isDisabled}
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
                  isDisabled={isDisabled}
                  value={values.publicTime}
                  color="primary"
                  fontWeight={500}
                  borderBottom="1px solid #ADADAD"
                  fontSize={{ base: "sm", lg: "lg" }}
                  onChange={(e) => setFieldValue("publicTime", e.target.value)}
                  className="clockIcon"
                />
                <Clock
                  w="24px"
                  h="24px"
                  color="primary"
                  position="absolute"
                  right={0}
                  bottom={2.5}
                  zIndex={-1}
                />
              </InputGroup>
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color="grey.300"
                mb={4}
              >
                *Time is in your local timezone.
              </Text>
            </Box>
          </Then>
        </If>
      </Then>
      {/* {renderschedule} */}
    </Box>
  );
};

export default ShareWith;
