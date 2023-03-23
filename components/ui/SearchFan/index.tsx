import {
  Flex,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  BoxProps,
} from "@chakra-ui/react";
import React from "react";
import { FindIcon } from "@/components/svg/Find";

interface SearchProp extends BoxProps {
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFan: React.FC<SearchProp> = ({
  placeholder,
  handleChange,
  ...props
}) => {
  return (
    <Box {...props}>
      <Flex h={14} pt={{ base: "22px", lg: "30px" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" w="18" h="18">
            <FindIcon color="primary" mt="18px" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={placeholder}
            _hover={{
              borderColor: "primary",
            }}
            _placeholder={{ color: "grey.100" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
            color="primary"
            borderColor="primary"
            border={0}
            borderRadius={0}
            borderBottom="1px"
            onChange={handleChange}
            fontSize={{ base: "md", xl: "lg" }}
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default SearchFan;
