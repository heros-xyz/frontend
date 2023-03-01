import { Box, Center, Text, useUpdateEffect } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import CheckBoxRadioIcon from "@/components/svg/CheckBoxRadio";
import { IMembershipTier } from "@/types/membership/types";

interface SearchResultProps {
  checked: boolean;
  title: string;
  totalFans?: number;
  data: IMembershipTier;
  hasRadioButton?: boolean;
  onChange?: (checked: boolean, value: string) => void;
}
const BronzeTier: React.FC<SearchResultProps> = ({
  title,
  checked,
  data,
  hasRadioButton,
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
    setCheck(!check);
  };

  return (
    <Box
      bg="acccent.4"
      minH={142}
      border="1px"
      borderColor="grey.500"
      borderRadius={{ base: 8, xl: 12 }}
      p={4}
      color="primary"
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
      <Text fontSize={{ base: "md", xl: "2xl" }} fontWeight="800">
        {title}
      </Text>
      <Text fontWeight="300" fontSize={{ base: "xxs", xl: "md" }}>
        {data?.tierDescription}
      </Text>
      <Text fontWeight="500" fontSize={{ base: "xs", xl: "md" }} my={2.5}>
        ${data?.monthlyPrice?.toFixed(2)}/month · {data?.totalFan ?? 0} fans
      </Text>
      <Box>
        <Text fontWeight="500" mb={1} fontSize={{ base: "xs", xl: "md" }}>
          Benefit
        </Text>
        {data?.benefits?.map((el) => (
          <Text
            key={el?.id}
            fontSize={{ base: "xxs", xl: "md" }}
            fontWeight="300"
            ml={{ base: 1, xl: 2 }}
          >
            ·&ensp; {el?.name}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default BronzeTier;
