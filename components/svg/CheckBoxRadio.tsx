import { Box, Center } from "@chakra-ui/react";
import { Else, If, Then } from "react-if";

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
      <If condition={checked}>
        <Then>
          <Center h={4} w={4} borderRadius="full" bg="primary">
            <Box h={1.5} w={1.5} borderRadius="full" bg="white" />
          </Center>
        </Then>
        <Else>
          <Box
            h={4}
            w={4}
            borderRadius="full"
            border="1px"
            borderColor="grey.200"
          />
        </Else>
      </If>
    </Center>
  );
};

export default CheckBoxRadioIcon;
