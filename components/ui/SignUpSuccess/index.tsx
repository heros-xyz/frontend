import { Box, Button, Text } from "@chakra-ui/react";

interface SignUpSuccessProps {
  title: string;
  description: string;
  textButton: string;
}
const SignUpSuccess: React.FC<SignUpSuccessProps> = ({
  title,
  description,
  textButton,
}) => {
  return (
    <Box
      bg="primary"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth={{ base: 375, xl: 500 }}
        paddingX={{ base: 5, xl: 0 }}
      >
        <Text
          lineHeight="140%"
          fontWeight="extrabold"
          fontSize={{ base: "4xl", xl: "5xl" }}
          color="white"
          textAlign="center"
          mb={{ base: 10, xl: 7 }}
        >
          {title}
        </Text>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text
            fontWeight="normal"
            lineHeight="140%"
            fontSize="md"
            mb={7}
            color="white"
            textAlign="center"
          >
            {description}
          </Text>
          <Button
            variant="secondary"
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="bold"
            lineHeight="140%"
            w={{ base: "full", xl: "162px" }}
          >
            {textButton}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpSuccess;
