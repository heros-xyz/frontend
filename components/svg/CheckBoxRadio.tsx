import { Box, Center } from "@chakra-ui/react";
import { If, Then } from "react-if";

const CheckBoxRadioIcon = ({ checked }: { checked: boolean }) => {
  return (
    <Center
      h={6}
      w={6}
      borderRadius="full"
      border="1px"
      borderColor="primary"
      bg="white"
    >
      <Box h={4} w={4} borderRadius="full" border="1px" borderColor="grey.200">
        <If condition={checked}>
          <Then>
            <Box h={3.5} w={3.5} borderRadius="full" bg="primary" />
          </Then>
        </If>
      </Box>
    </Center>
  );
};

export default CheckBoxRadioIcon;
