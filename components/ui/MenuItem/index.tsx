import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface IMenuItemProps {
  id: string;
  Icon: ReactNode;
  activeIcon: ReactNode;
  itemName: string;
  isActive: boolean;
  path: string;
  handleClickItem: (id: string) => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  Icon,
  itemName,
  activeIcon,
  isActive,
  path = "/",
  handleClickItem,
}) => {
  return (
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
          color="primary"
          fontSize={{ base: "xxs", lg: "xl" }}
          as="div"
          fontWeight={isActive ? 700 : 500}
          mt={{ base: 1, lg: 0 }}
          ml={{ base: 0, lg: 4 }}
        >
          {itemName}
        </Text>
      </Flex>
    </Link>
  );
};

export default MenuItem;
