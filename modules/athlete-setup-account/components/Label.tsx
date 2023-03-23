import { Box, BoxProps, HStack, Text } from "@chakra-ui/react";

interface Props extends BoxProps {
  title: string;
  description: string;
}

const Label: React.FC<Props> = ({ title, description, ...props }) => {
  return (
    <Box pb={5} {...props}>
      <HStack
        fontWeight="bold"
        fontSize={{ base: "md", xl: "xl" }}
        pb={2.5}
        fontFamily="heading"
      >
        <Text>{title}</Text> <Text color={"error.dark"}>*</Text>
      </HStack>
      <Text
        fontWeight="400"
        fontSize={{ base: "xs", xl: "md" }}
        color="grey.300"
        fontFamily="heading"
      >
        {description}
      </Text>
    </Box>
  );
};

export default Label;
