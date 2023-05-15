import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Else, If, Then } from "react-if";

interface IMenuItemProps {
  id: string;
  Icon: ReactNode;
  activeIcon: ReactNode;
  itemName: string;
  isActive: boolean;
  path: string;
  disabled: boolean;
  handleClickItem: (id: string) => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  Icon,
  itemName,
  activeIcon,
  isActive,
  path = "/",
  disabled,
  id,
  handleClickItem,
}) => {
  return (
    <If condition={disabled}>
      <Then>
        <Flex
          px={{ base: 2, lg: 4 }}
          py={{ base: 0, lg: 4 }}
          maxWidth={{ base: "74px", lg: "full" }}
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="center"
          cursor="pointer"
          opacity={0.6}
        >
          <Box>{isActive ? activeIcon : Icon}</Box>
          <Text
            fontFamily={isActive ? "heading" : ""}
            lineHeight="14px"
            color="secondary"
            fontSize={{ base: "xxs", lg: "xl" }}
            as="div"
            fontWeight={isActive ? 700 : 500}
            mt={{ base: 1, lg: 0 }}
            ml={{ base: 0, lg: 4 }}
          >
            {itemName}
          </Text>
        </Flex>
      </Then>
      <Else>
        <Link href={path}>
          <Flex
            px={{ base: 2, lg: 4 }}
            py={{ base: 0, lg: 4 }}
            maxWidth={{ base: "74px", lg: "full" }}
            flexDirection={{ base: "column", lg: "row" }}
            alignItems="center"
            onClick={() => handleClickItem(path)}
            cursor="pointer"
          >
            <Box>{isActive ? activeIcon : Icon}</Box>
            <Text
              fontFamily={isActive ? "heading" : ""}
              lineHeight="14px"
              color="secondary"
              fontSize={{ base: "xxs", lg: "xl" }}
              as="div"
              fontWeight={isActive ? 700 : 500}
              mt={{ base: 1, lg: id !== "interaction" ? 1 : 0 }}
              ml={{ base: 0, lg: 4 }}
            >
              {itemName}
            </Text>
          </Flex>
        </Link>
      </Else>
    </If>
  );
};

export default MenuItem;
