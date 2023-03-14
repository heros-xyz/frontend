import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import { FaceBookIcon } from "@/components/svg/FaceBook";
import { GoogleIcon } from "@/components/svg/Google";
import ErrorMessage from "@/components/common/ErrorMessage";
import { getAuthErrorCode } from "@/utils/constants";
import { CorporateWebsiteLink, HttpErrorCode } from "@/utils/enums";
import { getWebsiteLink } from "@/utils/link";

interface IAuthProps {
  pageType: string;
  isLoading?: boolean;
  authErrorMessage?: string;
  authErrorCode?: number;
  onSubmitForm: (email: string) => void;
  handleSignInFacebook?: () => void;
  handleSignInGoogle?: () => void;
}

const AuthTemplate: React.FC<IAuthProps> = ({
  pageType = "athlete",
  isLoading,
  authErrorMessage,
  authErrorCode,
  onSubmitForm,
  handleSignInFacebook,
  handleSignInGoogle,
}) => {
  const AuthSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format.")
      .required("This is a required field.")
      .max(250, "The email address cannot exceed 250 characters.")
      .test("max length before @", "Invalid email format.", (val) => {
        const firstEmail = val?.split("@");
        return Boolean(
          firstEmail?.[0]?.length && firstEmail?.[0]?.length <= 60
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: AuthSchema,
    onSubmit: (values) => {
      onSubmitForm(values.email);
    },
  });

  const [errorMessage, setErrorMessage] = useState(authErrorMessage);
  const [errorCode, setErrorCode] = useState(authErrorCode);

  const isAlreadyRegister = useMemo(() => {
    return (
      errorCode === HttpErrorCode.USER_ALREADY_REGISTERED_OTHER_ROLE ||
      errorCode === HttpErrorCode.USER_ALREADY_REGISTERED
    );
  }, [errorCode]);

  useEffect(() => {
    setErrorMessage(authErrorMessage);
  }, [authErrorMessage]);

  useEffect(() => {
    setErrorCode(authErrorCode);
  }, [authErrorCode]);

  const renderHeader = () => {
    let title = "";
    let subQuestion = "";
    let signUpLink = "";
    switch (pageType) {
      case "athlete":
        title = "Sign up as an Athlete";
        subQuestion = "Not an athlete?";
        signUpLink = "Sign up as fan here";
        break;
      case "fan":
        title = "Sign up as a Fan";
        subQuestion = "Are you an athlete?";
        signUpLink = "Sign up as an athlete here";
        break;
      case "signin":
        title = "Sign in";
        break;
    }
    return (
      <>
        <Heading
          fontSize={{ base: "4xl", xl: "5xl" }}
          fontWeight="extrabold"
          lineHeight="9"
          mb={{
            base: subQuestion ? "2.5" : "10",
            xl: subQuestion ? "7" : "10",
          }}
        >
          {title}
        </Heading>
        {subQuestion && (
          <Box mb={10}>
            <Text
              as="span"
              mr={2}
              lineHeight="140%"
              fontSize={{ base: "md", xl: "xl" }}
              fontWeight="normal"
            >
              {subQuestion}
            </Text>
            <Link
              href={`/${pageType === "athlete" ? "fan" : "athlete"}/sign-up`}
            >
              <Text
                as="span"
                color="acccent.3"
                textDecoration="underline"
                fontSize={{ base: "md", xl: "xl" }}
                fontWeight="medium"
                lineHeight="140%"
              >
                {signUpLink}
              </Text>
            </Link>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box
      p={{ base: 5, xl: 0 }}
      bg="primary"
      height="100vh"
      textAlign="center"
      color="white"
      overflowY="scroll"
      display="flex"
      justifyContent="center"
    >
      <Box
        mt={{ base: "110px", xl: "100px" }}
        maxWidth={{ base: "100%", lg: "500px" }}
      >
        <Box>
          {renderHeader()}
          <Text
            mb={5}
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="normal"
            lineHeight={{ base: "100%", xl: "140%" }}
          >
            with socials
          </Text>
          <Flex justifyContent="center" gap={{ base: 2, xl: 8 }} mb={8}>
            <FaceBookIcon
              color="white"
              w={{ base: "33px", xl: "60px" }}
              h={{ base: "33px", xl: "60px" }}
              cursor="pointer"
              onClick={handleSignInFacebook}
            />
            <GoogleIcon
              w={{ base: "33px", xl: "60px" }}
              h={{ base: "33px", xl: "60px" }}
              color="white"
              cursor="pointer"
              onClick={handleSignInGoogle}
            />
          </Flex>
          <Text
            mb={3}
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="normal"
            lineHeight="140%"
          >
            Or with email
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Box mb={8}>
              <Input
                id="email"
                name="email"
                variant="flushed"
                onChange={(e) => {
                  formik.handleChange(e);
                  setErrorMessage("");
                  setErrorCode(undefined);
                }}
                value={formik.values.email}
                placeholder="Email address"
                fontSize={{ base: "sm", xl: "18px" }}
                fontWeight={{ base: "medium", xl: "normal" }}
                lineHeight="140%"
                _placeholder={{
                  color: "grey.100",
                  fontWeight: 400,
                }}
              />
              <ErrorMessage
                mt={{ xl: 1 }}
                condition={formik.errors.email && formik.touched.email}
                errorMessage={formik.errors.email}
              />

              <If condition={pageType === "signin"}>
                <Then>
                  <ErrorMessage
                    mt={{ base: 1.5, lg: 3 }}
                    condition={errorMessage && formik.isValid}
                    errorMessage={getAuthErrorCode(errorCode)}
                  />
                </Then>
              </If>

              <If condition={pageType !== "signin"}>
                <Then>
                  <ErrorMessage
                    mt={{ base: 1.5, xl: 3 }}
                    display="flex"
                    condition={isAlreadyRegister}
                    link="/sign-in"
                    linkText="sign in here!"
                    errorMessage={
                      "You’ve already registered with this email. Please"
                    }
                  />
                </Then>
              </If>
            </Box>

            <Button
              maxWidth={{ base: "full", xl: "250px" }}
              fontSize={{ base: "md", xl: "xl" }}
              isLoading={isLoading}
              fontWeight="bold"
              lineHeight="140%"
              bg="secondary"
              color="primary"
              w="100%"
              fontFamily="heading"
              type="submit"
              mb={{ base: "10px", xl: "15px" }}
            >
              Continue with email
            </Button>
          </form>
          <Box mb={8} fontSize={{ base: "xs", xl: "md" }}>
            <Text as="span">By signing up you agree to </Text>
            <Link
              href={getWebsiteLink(CorporateWebsiteLink.TERM_AND_CONDITION)}
            >
              <Text as="span" color="acccent.3" textDecoration="underline">
                Heros’s Terms & Conditions
              </Text>
            </Link>

            <Text as="span"> and </Text>
            <Link href={getWebsiteLink(CorporateWebsiteLink.PRIVACY_POLICY)}>
              <Text as="span" color="acccent.3" textDecoration="underline">
                Privacy & Cookie Policy
              </Text>
            </Link>
          </Box>
          <Box fontSize="md">
            <Text as="span" mr={2} fontWeight="normal" lineHeight="140%">
              {pageType === "signin"
                ? "Don’t have an account?"
                : `Already have an account?`}
            </Text>
            <If condition={pageType === "signin"}>
              <Then>
                <Link href="/joining-as">
                  <Text
                    fontFamily="heading"
                    as="span"
                    color="acccent.3"
                    textDecoration="underline"
                    fontWeight="medium"
                  >
                    Sign up here
                  </Text>
                </Link>
              </Then>
              <Else>
                <Link href="/sign-in">
                  <Text
                    fontFamily="heading"
                    as="span"
                    color="acccent.3"
                    textDecoration="underline"
                    fontWeight="medium"
                  >
                    Sign in here
                  </Text>
                </Link>
              </Else>
            </If>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthTemplate;