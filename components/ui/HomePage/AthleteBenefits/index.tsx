import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface IAthleteBenefitsFeature {
  title: string;
  content: string;
  icon: React.ReactElement;
}

interface IAthleteBenefits {
  title: string;
  description: string;
  features: Array<IAthleteBenefitsFeature>;
}

const AthleteBenefits: React.FC<IAthleteBenefits> = ({
  title,
  description,
  features,
}) => {
  return (
    <Box bg="primary" color="white" px={5} py={16}>
      <Box mb={12}>
        <Text textTransform={"uppercase"} fontWeight="bold" fontSize="md">
          {title}
        </Text>
        <Text
          mt={2}
          fontSize="2xl"
          fontWeight="extrabold"
          lineHeight={8}
          color="accent.3"
        >
          {description}
        </Text>
      </Box>
      <Box mb={12}>
        {features.map((benefit) => {
          return (
            <Flex direction="row" key={benefit.title} mb={10}>
              <Box
                bgColor="secondary"
                minWidth="48px"
                height="48px"
                borderRadius="md"
              >
                <Flex alignItems="center" justify="center" w="100%" h="100%">
                  <Box w="24px" h="24px">
                    {benefit.icon}
                  </Box>
                </Flex>
              </Box>
              <Flex direction="column" ml={4} alignItems="start">
                <Text
                  textTransform={"capitalize"}
                  fontWeight="bold"
                  fontSize="xl"
                  lineHeight="140%"
                  mb={2}
                >
                  {benefit.title}
                </Text>
                <Text
                  fontWeight="normal"
                  fontSize="md"
                  lineHeight="140%"
                  color="grey.100"
                >
                  {benefit.content}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        textTransform={"uppercase"}
        color="primary"
      >
        <Button height={12} width="full" bg="secondary">
          become an athlete
        </Button>
      </Box>
    </Box>
  );
};
export default AthleteBenefits;
