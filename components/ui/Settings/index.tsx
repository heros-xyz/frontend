import { Box, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { If, Then } from "react-if";
import NextLink from "next/link";
import {
  UserIcon,
  PeopleIcon,
  LockCloseIcon,
  EmailIcon,
  CreditCardIcon,
  ChatAltIcon,
  LikeIcon,
} from "@/components/svg/Settings";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import { FaceBookIcon } from "@/components/svg/FaceBook";
import { GoogleIcon } from "@/components/svg/Google";
import { getWebsiteLink } from "@/utils/link";
import { CorporateWebsiteLink } from "@/utils/enums";
import { ADMIN_ROLE, FAN_ROLE } from "@/utils/constants";

interface SettingsProps {
  name: string;
  email: string;
  type: "FAN" | "ATHLETE" | "ADMIN" | undefined;
  isLoginWithGoogle: boolean;
  isLoginWithFacebook: boolean;
  onSignOut: () => void;
}

const AthleteFanSettings: React.FC<SettingsProps> = ({
  name,
  email,
  type,
  isLoginWithGoogle,
  isLoginWithFacebook,
  onSignOut,
}) => {
  return (
    <Box bg="white">
      <Box mb="5">
        <Heading
          fontSize={["md", "xl"]}
          color="secondary"
          fontWeight="bold"
          lineHeight="110%"
          mb="3"
        >
          Settings
        </Heading>
        <If condition={type === FAN_ROLE || type === ADMIN_ROLE}>
          <Then>
            <Box
              display="flex"
              alignItems="flex-start"
              py="2.5"
              borderBottom="1px"
              borderColor="grey.100"
            >
              <UserIcon
                mr="2.5"
                w={{ base: "20px", "2xl": "32px" }}
                h={{ base: "20px", "2xl": "32px" }}
                color="primary"
              />
              <Box w="100%">
                <Text
                  fontSize={["sm", "md"]}
                  fontWeight="medium"
                  lineHeight="110%"
                  color="primary"
                >
                  {name}
                </Text>
                <Text
                  fontSize={["xs", "md"]}
                  fontWeight="normal"
                  lineHeight="110%"
                  color="secondary"
                  pt="5px"
                >
                  <Link
                    as={NextLink}
                    href={`/${
                      type === FAN_ROLE || type === ADMIN_ROLE
                        ? "fan"
                        : "athlete"
                    }/my-profile/edit`}
                  >
                    Change your account information
                  </Link>
                </Text>
              </Box>
            </Box>
          </Then>
        </If>

        <Box
          display="flex"
          alignItems="center"
          py="2.5"
          borderBottom="1px"
          borderColor="grey.100"
        >
          <EmailIcon
            mr="2.5"
            w={{ base: "20px", "2xl": "32px" }}
            h={{ base: "20px", "2xl": "32px" }}
            color="primary"
          />
          <Box w="100%">
            <Text
              fontSize={["sm", "md"]}
              fontWeight="medium"
              lineHeight="110%"
              color="primary"
            >
              {email || "No email"}
            </Text>
            <If condition={email}>
              <Then>
                <Text
                  fontSize={["xs", "md"]}
                  fontWeight="normal"
                  lineHeight="110%"
                  color="grey.100"
                  pt="5px"
                >
                  This cannot be changed
                </Text>
              </Then>
            </If>
          </Box>
        </Box>
        <If condition={isLoginWithGoogle}>
          <Then>
            <Box
              borderBottom="1px"
              borderColor="grey.100"
              display="flex"
              alignItems="center"
              py="2.5"
            >
              <GoogleIcon
                mr="2.5"
                w={{ base: "24px", "2xl": "32px" }}
                h={{ base: "24px", "2xl": "32px" }}
                color="primary"
              />
              <Text
                fontSize={["sm", "md"]}
                fontWeight="medium"
                lineHeight="110%"
                color="primary"
                textTransform="capitalize"
              >
                This account is linked to Google
              </Text>
            </Box>
          </Then>
        </If>
        <If condition={isLoginWithFacebook}>
          <Then>
            <Box
              borderBottom="1px"
              borderColor="grey.100"
              display="flex"
              alignItems="center"
              py="2.5"
            >
              <FaceBookIcon
                mr="2.5"
                w={{ base: "24px", "2xl": "32px" }}
                h={{ base: "24px", "2xl": "32px" }}
                color="primary"
              />
              <Text
                fontSize={["sm", "md"]}
                fontWeight="medium"
                lineHeight="110%"
                color="grey.200"
              >
                This account is linked to Facebook
              </Text>
            </Box>
          </Then>
        </If>

        <If condition={type === FAN_ROLE}>
          <Then>
            <Box borderBottom="1px" borderColor="grey.100">
              <Link
                as={NextLink}
                href={`/${type === FAN_ROLE ? "fan" : "athlete"}/payment`}
                display="flex"
                alignItems="center"
                py="2.5"
                _hover={{ textDecoration: "none" }}
              >
                <CreditCardIcon
                  mr="2.5"
                  w={{ base: "24px", "2xl": "32px" }}
                  h={{ base: "24px", "2xl": "32px" }}
                  color="primary"
                />
                <Text
                  fontSize={["sm", "md"]}
                  fontWeight="medium"
                  lineHeight="110%"
                  color="primary"
                  _hover={{ color: "secondary" }}
                >
                  Payment Information
                </Text>
              </Link>
            </Box>
          </Then>
        </If>

        <If condition={type === FAN_ROLE || type === ADMIN_ROLE}>
          <Then>
            <Box borderBottom="1px" borderColor="grey.100">
              <Link
                as={NextLink}
                href="/fan/active-subscriptions"
                display="flex"
                alignItems="center"
                py="2.5"
                _hover={{ textDecoration: "none" }}
              >
                <PeopleIcon
                  mr="2.5"
                  w={{ base: "24px", "2xl": "32px" }}
                  h={{ base: "24px", "2xl": "32px" }}
                  color="primary"
                />
                <Text
                  fontSize={["sm", "md"]}
                  fontWeight="medium"
                  lineHeight="110%"
                  color="primary"
                  _hover={{ color: "secondary" }}
                >
                  Active Subscriptions
                </Text>
              </Link>
            </Box>
          </Then>
        </If>
      </Box>
      <Box>
        <Heading
          fontSize={["md", "xl"]}
          color="secondary"
          fontWeight="bold"
          lineHeight="110%"
          mt="8"
          mb="3"
        >
          Help
        </Heading>

        <Box borderBottom="1px" borderColor="grey.100">
          <Link
            as={NextLink}
            href={
              "https://pool-hub-178.notion.site/Help-Center-d569420963274e3f9dc67ef6af6cc496"
            }
            display="flex"
            alignItems="center"
            py="2.5"
            _hover={{ textDecoration: "none" }}
            target="_blank"
          >
            <ChatAltIcon
              mr="2.5"
              w={{ base: "24px", "2xl": "32px" }}
              h={{ base: "24px", "2xl": "32px" }}
              color="primary"
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight="medium"
              lineHeight="110%"
              color="primary"
              // _hover={{ color: "secondary" }}
            >
              Help Center
            </Text>
          </Link>
        </Box>

        <Box borderBottom="1px" borderColor="grey.100">
          <Link
            as={NextLink}
            href={"https://tally.so/r/mZ9xPo"}
            display="flex"
            alignItems="center"
            py="2.5"
            _hover={{ textDecoration: "none" }}
            target="_blank"
          >
            <LikeIcon
              mr="2.5"
              w={{ base: "24px", "2xl": "32px" }}
              h={{ base: "20px", "2xl": "28px" }}
              color="primary"
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight="medium"
              lineHeight="110%"
              color="primary"
              // _hover={{ color: "secondary" }}
            >
              Share Feedback
            </Text>
          </Link>
        </Box>

        <Box borderBottom="1px" borderColor="grey.100">
          <Link
            as={NextLink}
            href={getWebsiteLink(CorporateWebsiteLink.PRIVACY_POLICY)}
            display="flex"
            alignItems="center"
            py="2.5"
            _hover={{ textDecoration: "none" }}
          >
            <LockCloseIcon
              mr="2.5"
              w={{ base: "24px", "2xl": "32px" }}
              h={{ base: "24px", "2xl": "32px" }}
              color="primary"
            />
            <Text
              fontSize={["sm", "md"]}
              fontWeight="medium"
              lineHeight="110%"
              color="primary"
              // _hover={{ color: "secondary" }}
            >
              Privacy Policy
            </Text>
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="5"
        mt="10"
      >
        <Heading
          color="grey.200"
          fontWeight="bold"
          fontSize={["md", "lg"]}
          lineHeight="110%"
          textTransform="capitalize"
          onClick={onSignOut}
          cursor="pointer"
        >
          sign out
        </Heading>

        <IconArrowRight
          width="15px"
          height="15px"
          color="grey.200"
          cursor="pointer"
          onClick={onSignOut}
        />
      </Box>
    </Box>
  );
};

export default AthleteFanSettings;
