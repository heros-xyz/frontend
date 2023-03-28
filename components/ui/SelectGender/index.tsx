import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { If, Then } from "react-if";
interface IProp {
  onChange: (value: string) => void;
  value: string;
  errorMessage?: string;
  flexRow?: boolean;
  bgColor?: string;
}

const listGender = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
  { label: "Other", value: "2" },
];

const SelectGender: React.FC<IProp> = ({
  value,
  errorMessage,
  onChange,
  flexRow,
  bgColor,
}) => {
  const [genderValue, setGenderValue] = useState(value);

  const isActive = (value: string) => {
    return genderValue === value;
  };

  useEffect(() => {
    onChange(genderValue);
  }, [genderValue]);
  const selectColor = bgColor === "primary" ? "accent.2" : "accent.2";
  return (
    <>
      <Flex
        flexDirection={flexRow ? "row" : { base: "column", lg: "row" }}
        gap={3}
      >
        {listGender.map((item, index) => (
          <Box
            key={`${"item" + index}`}
            w="100%"
            px={5}
            py={2}
            rounded="md"
            cursor="pointer"
            _hover={{
              color: selectColor,
            }}
            borderWidth={{
              base: isActive(item.value) ? "2px" : "1px",
              lg: "2px",
            }}
            borderColor={isActive(item.value) ? selectColor : "grey.100"}
            onClick={() => setGenderValue(item.value)}
          >
            <Text
              fontSize={
                flexRow === true
                  ? { base: "sm", xl: "lg" }
                  : { base: "sm", lg: "3xl" }
              }
              fontWeight={isActive(item.value) ? 700 : 500}
              color={isActive(item.value) ? selectColor : "grey.100"}
            >
              {item.label}
            </Text>
          </Box>
        ))}
      </Flex>
      <If condition={errorMessage}>
        <Then>
          <Text fontSize={{ base: "xs", xl: "sm" }} color="error.dark" mt={2}>
            This is a required field
          </Text>
        </Then>
      </If>
    </>
  );
};

export default SelectGender;
