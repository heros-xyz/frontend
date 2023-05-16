import { Box, Text, useUpdateEffect } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import { If, Then } from "react-if";
import CheckBoxRadioIcon from "@/components/svg/CheckBoxRadio";
import { MembershipTier } from "@/libs/dtl/membershipTiers";

interface SearchResultProps {
  checked: boolean;
  title: string;
  totalFan?: number;
  data: MembershipTier;
  hasRadioButton?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, value: string) => void;
}
const BronzeTier: React.FC<SearchResultProps> = ({
  title,
  checked,
  data,
  hasRadioButton,
  disabled,
  onChange,
}) => {
  const [check, setCheck] = useState<boolean>(false);
  useEffectOnce(() => {
    setCheck(checked);
  });
  useUpdateEffect(() => {
    onChange && onChange(check, data.id as string);
  }, [check]);

  const handleCheck = () => {
    if (!disabled) setCheck(!check);
  };

  return (
    <Box
      bg="accent.2"
      minH={142}
      border="1px"
      borderColor="accent.2"
      borderRadius={{ base: 8, xl: 12 }}
      p={4}
      color="white"
      fontSize={{ base: "2xs", xl: "md" }}
      position="relative"
      w="100%"
    >
      {hasRadioButton && (
        <Box
          position="absolute"
          top={4}
          right={4}
          onClick={handleCheck}
          cursor="pointer"
        >
          <CheckBoxRadioIcon checked={check} />
        </Box>
      )}
      <Text
        fontSize={{ base: "md", xl: "2xl" }}
        fontWeight="800"
        color="secondary"
      >
        {title}
      </Text>
      <If condition={data?.tierDescription}>
        <Then>
          <Text
            fontWeight="300"
            color="white"
            fontSize={{ base: "xxs", xl: "md" }}
          >
            {data?.tierDescription}
          </Text>
        </Then>
      </If>
      <Text
        fontWeight="500"
        color="white"
        fontSize={{ base: "xs", xl: "md" }}
        my={2.5}
      >
        ${data?.monthlyPrice?.toFixed(2)}/month · {data?.totalFan ?? 0} fan
        {data?.totalFan && data.totalFan > 1 ? "s" : ""}
      </Text>
      <Box color="white">
        <Text fontWeight="500" mb={1} fontSize={{ base: "xs", xl: "md" }}>
          Benefit
        </Text>
        {data?.benefits?.map((el, idx) => (
          <Text
            // eslint-disable-next-line react/no-array-index-key
            key={`${el?.label}-${idx}`}
            fontSize={{ base: "xxs", xl: "md" }}
            fontWeight="300"
            ml={{ base: 1, xl: 2 }}
          >
            ·&ensp; {el?.label}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default BronzeTier;
