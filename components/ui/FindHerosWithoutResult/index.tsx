import {
  Center,
  Flex,
  FlexProps,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { LogoMiniIcon } from "@/components/svg/LogoMini";
import { FindIcon } from "@/components/svg/Find";

interface Props extends FlexProps {
  value?: string;
  onChange?: (el: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindHerosWithoutResult: React.FC<Props> = (props) => {
  return (
    <Flex h={14} pt={1} {...props}>
      <Link href={"/"}>
        {" "}
        <Center
          h={{ base: 6, xl: "1.875rem" }}
          w={{ base: 6, xl: "1.875rem" }}
          my={3}
          mr={3}
        >
          <LogoMiniIcon w="100%" h="100%" />
        </Center>
      </Link>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FindIcon color="white" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Find your heros"
          _placeholder={{ color: "grey.100" }}
          _focusVisible={{ boxShadow: "none", outline: "none" }}
          color="white"
          border={0}
          value={props.value}
          borderRadius={0}
          borderBottom="1px"
          onChange={props.onChange}
          fontSize={{ base: "md", xl: "lg" }}
        />
      </InputGroup>
    </Flex>
  );
};

export default FindHerosWithoutResult;
