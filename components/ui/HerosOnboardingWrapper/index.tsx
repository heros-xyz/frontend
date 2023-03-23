import { Box, Button, Container, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Else, If, Then } from "react-if";

interface OnboardingProps {
  title?: string;
  Icon?: ReactNode;
  IconButton?: ReactNode;
  children: ReactNode;
  textButton?: string;
  footer?: ReactNode;
  fullWidth?: boolean;
  ImagePreview?: ReactNode;
  isUploadImage?: boolean;
  submitLoading?: boolean;
  onSubmit?: () => void;
}
const HerosOnboardingWrapper: React.FC<OnboardingProps> = ({
  footer,
  title,
  Icon,
  children,
  IconButton,
  textButton,
  fullWidth,
  ImagePreview,
  isUploadImage,
  submitLoading,
  onSubmit,
}) => {
  return (
    <Box bg="white" minH={"90vh"} height="100vh">
      <Container size={["full", "sm", "md", "lg", "xl"]} h="100%">
        <Box
          textAlign="center"
          fontWeight="extrabold"
          fontSize={{ base: "xs", lg: "lg" }}
          height="10%"
          pt={{ base: 5, lg: 16 }}
        >
          {title}
        </Box>
        <Box
          px={{ base: 5, xl: 0 }}
          height="80%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width="100%"
            flexDirection={{ base: "column", xl: "row-reverse" }}
            display="flex"
            alignItems="center"
            justifyContent={{ xl: "space-between" }}
          >
            <If condition={!!ImagePreview}>
              <Then>{ImagePreview}</Then>
              <Else>
                {Icon && (
                  <Box
                    alignItems="center"
                    textAlign="center"
                    alignContent="center"
                    w={{ base: "150px", xl: "240px" }}
                    h={{ base: "150px", xl: "240px" }}
                    width={{ xl: "240px" }}
                    mb={{ base: "30px", xl: 0 }}
                  >
                    {Icon}
                  </Box>
                )}
              </Else>
            </If>
            <Box
              mb={{ base: 5, xl: 0 }}
              w={{ base: "100%", xl: fullWidth ? "100%" : "720px" }}
            >
              <Box>
                {children}
                <If condition={!isUploadImage}>
                  <Then>
                    <Box
                      justifyContent="flex-end"
                      mt="50px"
                      display={{
                        base: "none",
                        xl: "flex",
                      }}
                    >
                      <Button
                        variant="primary"
                        w={{ base: "100%", xl: "fit-content" }}
                        h="48px"
                        onClick={onSubmit}
                        isLoading={submitLoading}
                        fontSize={{ base: "md", xl: "xl" }}
                      >
                        {textButton}
                        <Box as="span" ml={3}>
                          {IconButton}
                        </Box>
                      </Button>
                    </Box>
                  </Then>
                  <Else>
                    <Box justifyContent="flex-end" mt={"5"} display={"flex"}>
                      {IconButton}
                    </Box>
                  </Else>
                </If>
              </Box>
            </Box>
            {textButton && (
              <Button
                variant="primary"
                w="100%"
                h="48px"
                display={{ base: "flex", xl: "none" }}
                onClick={onSubmit}
                isLoading={submitLoading}
                fontSize={{ base: "md", xl: "xl" }}
              >
                {textButton}
                <Box as="span" ml={3}>
                  {IconButton}
                </Box>
              </Button>
            )}
          </Box>
        </Box>

        <Text textAlign="center" height="10%">
          {footer}
        </Text>
      </Container>
    </Box>
  );
};

export default HerosOnboardingWrapper;
