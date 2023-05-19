import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import BronzeTier from "@/components/ui/Bronze";
import { IMembershipTier } from "@/types/membership/types";
import SubscribeAthlete from "@/components/ui/SubscribeAthlete";
import { ADMIN_ROLE } from "@/utils/constants";
import { useUser } from "@/hooks/useUser";
interface IMembershipSubscribeProps {
  listMembershipTiers: IMembershipTier[];
  validateIsFan?: boolean;
  athleteNickname: string;
}
const MembershipSubscribe: FC<IMembershipSubscribeProps> = ({
  listMembershipTiers,
  validateIsFan,
  athleteNickname,
}) => {
  const router = useRouter();
  const { user, isAdmin } = useUser();
  const [membershipTierId, setMembershipTierId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log({ user });
  const onSubscribe = () => {
    if (!user) {
      onOpen();
      return;
    }

    console.log({ membershipTierId });
    if (membershipTierId) {
      router.push({
        pathname: `/fan/athlete-profile/${router.query.id}/payment-details`,
        query: {
          membershipTierId,
        },
      });
    }
  };

  const onSelectBronzeTier = (checked: boolean, value: string) => {
    if (checked) {
      setMembershipTierId(value);
    } else {
      setMembershipTierId("");
    }
  };

  return (
    <>
      <If condition={validateIsFan}>
        <Then>
          <Box my={6} fontSize={{ base: "xs", lg: "md" }} fontWeight={400}>
            <Text as="span" color="primary">
              You can change tier at anytime. Visit heros&apos;s
            </Text>
            <Link href="" as="span">
              <Text as="span" color="secondary" textDecoration="underline">
                {" "}
                Membership guide
              </Text>
            </Link>
            <Text as="span" color="primary">
              {" "}
              to learn about what will happen when you upgrade, downgrade, or
              cancel your membership tier.
            </Text>
          </Box>
        </Then>
        <Else>
          <If condition={listMembershipTiers?.length}>
            <Then>
              <Text
                my={6}
                fontSize={{ base: "xs", lg: "md" }}
                fontWeight={400}
                color="primary"
              >
                Choose a tier that best suited you and your need to support your
                favorite athlete!
              </Text>
            </Then>
          </If>
        </Else>
      </If>

      <If condition={listMembershipTiers?.length}>
        <Then>
          <BronzeTier
            title="Bronze"
            disabled={!!validateIsFan || user?.profileType === ADMIN_ROLE}
            // checked={!!validateIsFan}
            checked={true}
            hasRadioButton={!isAdmin}
            data={(listMembershipTiers?.[0] as any) || []}
            onChange={onSelectBronzeTier}
          />

          <If condition={!isAdmin}>
            <Then>
              <Box textAlign={{ lg: "right" }}>
                <Button
                  isDisabled={
                    !membershipTierId ||
                    validateIsFan ||
                    user?.profileType === ADMIN_ROLE
                  }
                  variant="secondary"
                  mt={6}
                  w={{ base: "100%", xl: "fit-content" }}
                  onClick={() => onSubscribe()}
                >
                  {validateIsFan ? "change tier" : "Subscribe"}
                </Button>
              </Box>
            </Then>
          </If>
        </Then>
        <Else>
          <Box
            my={6}
            fontSize={{ base: "xs", lg: "md" }}
            fontWeight={400}
            color="primary"
          >
            <Text as="span" fontWeight={"bold"}>
              {athleteNickname}
            </Text>{" "}
            {` hasn't created any memberships yet!`}
          </Box>
        </Else>
      </If>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          pt="5"
          px="4"
          maxW="unset"
          w={{ base: "95%", lg: "740px" }}
        >
          <SubscribeAthlete />
        </ModalContent>
      </Modal>
    </>
  );
};

export default MembershipSubscribe;
