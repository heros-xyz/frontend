import { Box, Flex, Icon, IconProps } from "@chakra-ui/react";

export const OutlineArrowIcon: React.FC<IconProps> = (props) => {
  return (
    <Flex flexDirection="row" justifyContent="center">
      <Box h="1px" w="22px" bg={"grey.400"} ml="1" mt="2" />
      <Box w="18px" h="18px" mx={1}>
        <Icon
          {...props}
          width="14px"
          height="14px"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L7 9.5M7 9.5L9 7.5M7 9.5L7 4.5M1 7C1 3.68629 3.68629 0.999999 7 0.999999C10.3137 1 13 3.68629 13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7Z"
            stroke="#313F4C"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      </Box>
      <Box h="1px" w="22px" bg={"grey.400"} mr="1" mt="2" />
    </Flex>
  );
};
