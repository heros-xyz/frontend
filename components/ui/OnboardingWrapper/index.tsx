import {
  Box,
  Button,
  ButtonProps,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface NextButtonProps extends ButtonProps {
  onNextStep?(): void;
  textButton?: string;
  IconButton?: ReactNode;
}

export interface OnboardingProps extends NextButtonProps {
  title?: string;
  Icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  button?: ReactNode;
  showIcon?: boolean;
  isLoading?: boolean;
}

export const NextButton: React.FC<OnboardingProps> = (props) => {
  return (
    <Button
      data-testid="next-button"
      {...props}
      bg="primary"
      w={{ base: "100%", xl: "fit-content" }}
      h="48px"
      fontFamily={"heading"}
      color="secondary"
      onClick={props.onNextStep}
      _hover={{ backgroundColor: "gray" }}
    >
      <Text fontWeight="700" fontFamily="heading">
        {props.textButton}
      </Text>

      {props?.showIcon && (
        <Box as="span" ml={3}>
          {props.IconButton}
        </Box>
      )}
    </Button>
  );
};
const OnboardingWrapper: React.FC<OnboardingProps> = ({
  footer,
  title,
  Icon,
  children,
  IconButton,
  textButton,
  button,
  onNextStep,
}) => {
  const buttonProps = { textButton, IconButton, onNextStep };
  return (
    <Container size={["full", "sm", "md", "lg", "xl"]} h="100%">
      {" "}
      <VStack bg="secondary" height="100vh" justifyContent="center">
        {title && (
          <Box
            top={{ base: 6.5, xl: 0 }}
            position={"absolute"}
            textAlign="center"
            fontWeight="extrabold"
            fontSize={{ base: "xs", lg: "lg" }}
            height="10%"
          >
            {title}
          </Box>
        )}

        <VStack
          px={{ base: 5, xl: 0 }}
          width="100%"
          display="flex"
          flexDirection={{ base: "column", xl: "row-reverse" }}
        >
          <Box
            alignItems="center"
            textAlign="left"
            alignContent="center"
            mb={{ base: "30px", xl: 0 }}
            width={{ xl: "35%" }}
          >
            <Box w={{ base: "150", xl: "240" }} h={{ base: "150", xl: "240" }}>
              {Icon}
            </Box>
          </Box>
          <Box width={{ base: "100%" }}>
            {children}
            <Box w="262px" pt={7} display={{ base: "none", xl: "flex" }}>
              {button ? (
                button
              ) : (
                <NextButton showIcon={true} {...buttonProps} />
              )}
            </Box>
          </Box>
          <Box w="100%" pt={7} display={{ xl: "none" }}>
            {button ? button : <NextButton showIcon={true} {...buttonProps} />}
          </Box>
        </VStack>
        {footer && (
          <Box position={"absolute"} bottom={5} left={0} right={0}>
            {footer}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default OnboardingWrapper;
