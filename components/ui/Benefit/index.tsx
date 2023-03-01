import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface BenefitProps {
  Icon: ReactNode;
  title: string;
  description: string;
}
const Benefit: React.FC<BenefitProps> = ({ Icon, title, description }) => {
  return (
    <Box bg="primary">
      <Flex>
        <Box bg="secondary" p={4} borderRadius="md">
          {Icon}
        </Box>
        <Box>
          <Heading color="white">{title}</Heading>
          <Text as="span" color="grey.100">
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Benefit;
