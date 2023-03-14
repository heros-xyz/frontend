import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import BronzeTier from "@/components/ui/Bronze";
import { IMembershipTier } from "@/types/membership/types";
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
  const [membershipTierId, setMembershipTierId] = useState("");

  const onSubscribe = () => {
    if (membershipTierId) {
      router.push({
        pathname: "[id]/payment-details",
        query: { id: router.query.id, membershipTierId },
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
            <Text as="span">
              You can change tier at anytime. Visit heros&apos;s
            </Text>
            <Link href="" as="span">
              <Text as="span" color="secondary" textDecoration="underline">
                {" "}
                Membership guide
              </Text>
            </Link>
            <Text as="span">
              {" "}
              to learn about what will happen when you upgrade, downgrade, or
              cancel your membership tier.
            </Text>
          </Box>
        </Then>
        <Else>
          <If condition={listMembershipTiers?.length}>
            <Then>
              {" "}
              <Text my={6} fontSize={{ base: "xs", lg: "md" }} fontWeight={400}>
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
            disbaled={!!validateIsFan}
            checked={!!validateIsFan}
            hasRadioButton
            data={listMembershipTiers?.[0] || []}
            onChange={onSelectBronzeTier}
          />

          <Box textAlign={{ lg: "right" }} onClick={() => onSubscribe()}>
            <Button
              isDisabled={!membershipTierId || validateIsFan}
              variant="secondary"
              mt={6}
              w={{ base: "100%", xl: "fit-content" }}
            >
              {validateIsFan ? "change tier" : "Subscribe"}
            </Button>
          </Box>
        </Then>
        <Else>
          <Box my={6} fontSize={{ base: "xs", lg: "md" }} fontWeight={400}>
            <Text as="span" fontWeight={"bold"}>
              {athleteNickname}
            </Text>{" "}
            {` hasn't created any memberships yet!`}
          </Box>
        </Else>
      </If>
    </>
  );
};

export default MembershipSubscribe;
