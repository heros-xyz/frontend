import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { MenuIcon } from "@/components/svg/menu/MenuIcon";

export type MenuItem = {
  id: string;
  itemName: string;
  Icon: React.ReactNode;
};

interface IAthleteMenuProps {
  menuList?: MenuItem[];
  onClickItem: (id: string) => void;
}

const AthleteMenu: React.FC<IAthleteMenuProps> = ({
  menuList,
  onClickItem,
}) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MenuIcon />}
        variant="transparent"
        minW={"initial"}
      />
      <MenuList px={3} zIndex={2}>
        {menuList &&
          menuList.map((item) => (
            <MenuItem
              bg={"none"}
              borderBottom="1px"
              borderColor="gray.200"
              _hover={{ fontWeight: "600" }}
              _last={{ borderBottom: "none" }}
              key={item.id}
              onClick={() => onClickItem(item.id)}
            >
              <Flex w="full" justifyContent="space-between" alignItems="center">
                <Text color="primary" fontSize="sm">
                  {item.itemName}
                </Text>
                <Box maxW="40px">{item.Icon}</Box>
              </Flex>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default AthleteMenu;
