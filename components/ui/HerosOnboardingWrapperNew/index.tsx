import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { Else, If, Then } from "react-if";

interface OnboardingProps extends BoxProps {
  title?: string;
  Icon?: ReactNode;
  IconButton?: ReactNode;
  children: ReactNode;
  textButton?: string;
  footer?: ReactNode;
  fullWidth?: boolean;
  ImagePreview?: ReactNode;
  isUploadImage?: boolean;
  onSubmit?: () => void;
  bgIconColor?: string;
  submitLoading?: boolean;
  isSuccessPage?: boolean;
  isDisabled?: boolean;
  onSkipForNow?: () => void;
}
const HerosOnboardingWrapperNew: React.FC<OnboardingProps> = ({
  title,
  Icon,
  children,
  IconButton,
  textButton,
  ImagePreview,
  isUploadImage,
  onSubmit,
  submitLoading,
  bgIconColor,
  isSuccessPage,
  isDisabled,
  onSkipForNow,
  ...props
}) => {
  const [bgIcon, setBgIcon] = useState<string>();
  useEffect(() => {
    if (bgIconColor) {
      setBgIcon(bgIconColor);
    }
  }, [bgIconColor]);

  return (
    <Box
      {...props}
      bg="white"
      minH={"90vh"}
      h={{ base: "full", lg: "100vh" }}
      w="100%"
      className="onboarding-wrapper"
      display="flex"
      flexDirection="column"
    >
      <Box
        position={{ xl: "fixed" }}
        textAlign={{
          base: "center",
          xl: !!Icon || !!ImagePreview ? "left" : "center",
        }}
        fontWeight="extrabold"
        fontSize={{ base: "xs", xl: "xl" }}
        height="10%"
        pt={{ base: 5, lg: 16 }}
        pl={{ xl: !!Icon || !!ImagePreview ? "130px" : 0 }}
        color="primary"
        w="full"
      >
        {title}
      </Box>
      <Container
        h="full"
        w="full"
        px={{ base: 5, xl: 0 }}
        className="onboarding-wrapper__container"
        display="flex"
        alignItems="center"
        flex={1}
      >
        <Flex
          flexDirection={
            !!Icon || !!ImagePreview
              ? {
                  base: "column",
                  xl: "row-reverse",
                }
              : "column"
          }
          w="full"
          h="full"
        >
          <If condition={!!Icon || !!ImagePreview}>
            <Then>
              <Center
                minW={{ xl: "500px" }}
                bg={{ base: "white", xl: bgIcon ?? "white" }}
              >
                <If condition={!!ImagePreview}>
                  <Then>
                    <Box display={{ base: "none", xl: "flex" }}>
                      {ImagePreview}
                    </Box>
                  </Then>
                  <Else>
                    {Icon && (
                      <Center
                        mb={{ base: "30px", xl: 0 }}
                        w={{ base: "150px", xl: "240px" }}
                        h={{ base: "150px", xl: "240px" }}
                        rounded="full"
                        border="1px"
                        borderColor="grey.200"
                        bg={{ base: bgIcon ?? "white", xl: "white" }}
                      >
                        {Icon}
                      </Center>
                    )}
                  </Else>
                </If>
              </Center>
            </Then>
          </If>
          <Box
            alignItems="center"
            h="full"
            w={{ xl: "100%" }}
            display={{ xl: "flex" }}
          >
            <Box mb={{ base: 5, xl: 0 }} w={{ xl: "100%" }}>
              <Box
                ml={{ xl: !!Icon || !!ImagePreview ? "130px" : "auto" }}
                mr={{ xl: !!Icon || !!ImagePreview ? "80px" : "auto" }}
                w={{ xl: !!Icon || !!ImagePreview ? "" : "750px" }}
                id="children"
              >
                {children}
                <If condition={!!ImagePreview}>
                  <Then>
                    <Box display={{ base: "flex", xl: "none" }}>
                      {ImagePreview}
                    </Box>
                  </Then>
                </If>
                <If condition={!isUploadImage}>
                  <Then>
                    <Box
                      justifyContent={isSuccessPage ? "flex-start" : "flex-end"}
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
                        fontSize={{ base: "md", xl: "xl" }}
                        isLoading={submitLoading}
                      >
                        {textButton}
                        <Box as="span" ml={3}>
                          {IconButton}
                        </Box>
                      </Button>
                    </Box>
                    {onSkipForNow && (
                      <Flex justifyContent="flex-end" mt={5}>
                        <Button
                          variant="link"
                          color="grey.300"
                          textDecoration="underline"
                          display={{ base: "none", xl: "flex" }}
                          fontSize="xl"
                          onClick={onSkipForNow}
                          mr={5}
                        >
                          Skip for now
                        </Button>
                      </Flex>
                    )}
                  </Then>
                  <Else>
                    <Box justifyContent={"flex-end"} mt={"5"} display={"flex"}>
                      {IconButton}
                    </Box>
                  </Else>
                </If>
              </Box>
            </Box>
            <Box>
              {textButton && (
                <Button
                  variant="primary"
                  w="100%"
                  h="48px"
                  display={{ base: "flex", xl: "none" }}
                  onClick={onSubmit}
                  fontSize={{ base: "md", xl: "xl" }}
                  isLoading={submitLoading}
                  isDisabled={isDisabled}
                >
                  {textButton}
                  <Box as="span" ml={3}>
                    {IconButton}
                  </Box>
                </Button>
              )}
              {onSkipForNow && (
                <Center w="full" mt={5}>
                  <Button
                    variant="link"
                    color="grey.300"
                    textDecoration="underline"
                    display={{ base: "block", xl: "none" }}
                    onClick={onSkipForNow}
                  >
                    Skip for now
                  </Button>
                </Center>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HerosOnboardingWrapperNew;
