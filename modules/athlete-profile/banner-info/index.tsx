import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { VectorIcon } from "@components/svg/VectorProfile";
interface BasicInfoProps {
  image: string;
  nickname: string;
  fans: number;
  tagline: string;
  countryCode: string;
  sport: string;
  onClickDownButton: () => void;
}

const BasicInfoAthlete: React.FC<BasicInfoProps> = ({
  image,
  nickname,
  fans,
  tagline,
  countryCode,
  sport,
  onClickDownButton,
}) => {
  return (
    <Box bg="primary">
      <Box position="relative">
        <Image
          src={image}
          alt={nickname}
          w="100%"
          h={{ base: "667px", lg: "750px" }}
          objectFit="cover"
          borderRadius={{ lg: "12px" }}
          fallbackSrc="https://via.placeholder.com/750"
        />
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
              {nickname.toUpperCase()}
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
                Fans
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
                {sport}
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
            cursor="pointer"
            w={{ base: "32px", lg: "56px" }}
            h={{ base: "32px", lg: "56px" }}
            onClick={onClickDownButton}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BasicInfoAthlete;
