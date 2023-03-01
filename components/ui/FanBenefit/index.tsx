import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CheckIcon } from "@/components/svg/CheckIcon";

const benefits = [
  {
    id: "1",
    text: "Vitae in pulvinar odio id utobortis in inter.",
  },
  { id: "2", text: "Sed sed id viverra viverra augue eget massa." },
  { id: "3", text: "Urna, gravida amet, a, integer venenatis." },
  { id: "4", text: "Lobortis sed pharetra amet vitae eleifend." },
  { id: "5", text: "Ullamcorper blandit a consequat donec elit aoreet." },
  { id: "6", text: "Vitae in pulvinar odio id utobortis in inter." },
];

const FanBenefit: React.FC = () => {
  return (
    <Box bg="primary" color="white" px={5} py={16}>
      <Box>
        <Text textTransform={"uppercase"} fontWeight={700} fontSize={16}>
          fans’ benefits
        </Text>
      </Box>
      <Box my={4}>
        <Text fontSize={24} fontWeight={800} lineHeight={8} color="acccent.3">
          Follow your favourite athlete’s sporting journey and earn benefits
          along the way.
        </Text>
      </Box>
      <Box fontWeight={400} my={4}>
        <Text>
          Ac euismod vel sit maecenas id pellentes eu sed consectetur. Malesada
          adipisng sagittis vel nulla nec. Urna, sed a lectus tum blandit.
        </Text>
      </Box>
      <Box>
        {benefits.map((benefit, index) => {
          return (
            <>
              <Flex my={18} key={`${"key" + index}`} alignItems="center">
                <Box mr={17}>
                  <CheckIcon color="#E2FF65" />
                </Box>
                <Text as="span">{benefit.text}</Text>
              </Flex>
              {index != benefits.length - 1 && <Divider />}
            </>
          );
        })}
      </Box>
      <Box
        display={"flex"}
        mt={16}
        justifyContent="center"
        textTransform={"uppercase"}
        color="primary"
      >
        <Button height={12} width="full" bg="secondary">
          become a fan
        </Button>
      </Box>
    </Box>
  );
};

export default FanBenefit;
