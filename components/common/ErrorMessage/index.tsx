import { Box, Text, BoxProps } from "@chakra-ui/react";
import Link from "next/link";
import { If, Then } from "react-if";

interface ErrorMessageProps extends BoxProps {
  errorMessage: string | undefined;
  condition: boolean | string | undefined;
  link?: string;
  linkText?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  condition,
  link,
  linkText,
  ...props
}) => {
  return (
    <If condition={condition}>
      <Then>
        <Box textAlign="left" {...props}>
          <Text
            as="span"
            fontSize={{ base: "xs", lg: "md" }}
            color="error.dark"
          >
            {errorMessage}
          </Text>
          <If condition={!!link}>
            <Then>
              <Text
                fontSize={{ base: "xs", lg: "md" }}
                color="acccent.3"
                textDecoration="underline"
                mb={{ base: "1px", lg: 0 }}
                ml="4px"
                cursor="pointer"
              >
                <Link href={link ?? ""}>{linkText}</Link>
              </Text>
            </Then>
          </If>
        </Box>
      </Then>
    </If>
  );
};

export default ErrorMessage;
