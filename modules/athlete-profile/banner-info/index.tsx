import React from "react";
import { Box, Text, Flex, Image, Button, Center } from "@chakra-ui/react";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { If, Then } from "react-if";
import { VectorIcon } from "@components/svg/VectorProfile";
import { getImageLink } from "@/utils/link";
import { ADMIN_ROLE, FAN_ROLE } from "@/utils/constants";
interface BasicInfoProps {
  image: string;
  nickname: string;
  fans: number;
  tagline: string;
  countryCode: string;
  sport: string;
  role: "FAN" | "ATHLETE" | "ADMIN" | undefined;
  onClickDownButton: () => void;
  onSubscribe?: () => void;
}

const BasicInfoAthlete: React.FC<BasicInfoProps> = ({
  image,
  nickname,
  fans,
  tagline,
  countryCode,
  sport,
  role,
  onClickDownButton,
  onSubscribe,
}) => {
  return (
    <Box position="relative">
      <Image
        src={image}
        alt={nickname}
        w="100%"
        h={{ base: "667px", lg: "750px" }}
        objectFit="cover"
        borderRadius={{ lg: "12px" }}
        fallback={
          <Box>
            <Image
              src="/images/DefaultAvaCircle.png"
              alt=""
              borderRadius="xl"
              objectFit="contain"
              w="100%"
              h={{ base: "667px", lg: "750px" }}
            />
          </Box>
        }
      />
      <If condition={!!onSubscribe && role === FAN_ROLE}>
        <Then>
          <Center
            position="absolute"
            w="full"
            top={4}
            px={5}
            justifyContent={{ xl: "right" }}
          >
            <Button
              bg="primary"
              color="secondary"
              w={{ base: "full", xl: "auto" }}
              isDisabled={role == ADMIN_ROLE}
              _disabled={{ bg: "grey.100", color: "grey.300" }}
              onClick={onSubscribe}
              _hover={{}}
            >
              Subscribe
            </Button>
          </Center>
        </Then>
      </If>

      <Box
        position="absolute"
        left={0}
        bottom={0}
        right={0}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, 0.7) 61.98%, #000000 100%)",
        }}
        borderBottomRightRadius={{ lg: "12px" }}
        borderBottomLeftRadius={{ lg: "12px" }}
      >
        <Box
          pl={{ base: "20px", lg: "30px" }}
          pb={{ base: "30px", lg: "40px" }}
        >
          <Text
            fontSize={{ base: "30px", lg: "32px" }}
            lineHeight={{ base: "42px", lg: "45px" }}
            color="white"
            fontWeight="extrabold"
            letterSpacing="3%"
          >
            {nickname?.toUpperCase()}
          </Text>
          <Flex mb={{ base: "10px", lg: "5px" }}>
            <Text
              fontSize={{ base: "14px", lg: "20px" }}
              fontWeight="bold"
              color="white"
            >
              {fans}
            </Text>

            <Text
              fontSize={{ base: "14px", lg: "20px" }}
              fontWeight="normal"
              color="white"
              ml="5px"
            >
              {fans > 1 ? "Fans" : "Fan"}
            </Text>
          </Flex>
          <Text
            fontWeight={{ base: "light", lg: "normal" }}
            color="white"
            fontSize={{ base: "12px", lg: "16px" }}
            lineHeight={{ base: "14px", lg: "22px" }}
            mb="20px"
          >
            {tagline}
          </Text>
          <Flex alignItems="center">
            <Image
              src={findFlagUrlByIso2Code(countryCode)}
              alt={countryCode}
              w={8}
            />
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              fontWeight="normal"
              color="white"
              lineHeight={{ base: "22px", lg: "25px" }}
              ml="10px"
            >
              {String(sport)}
            </Text>
          </Flex>
        </Box>
      </Box>
      <Box
        position="absolute"
        right={{ base: "20px", lg: "37px" }}
        bottom={{ base: "20px", lg: "47px" }}
      >
        <VectorIcon
          color="secondary"
          cursor="pointer"
          w={{ base: "32px", lg: "56px" }}
          h={{ base: "32px", lg: "56px" }}
          onClick={onClickDownButton}
        />
      </Box>
    </Box>
  );
};

export default BasicInfoAthlete;
