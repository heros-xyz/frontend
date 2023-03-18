import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface HomePageBannerProps {
  content: string;
  title: string;
}

const HomePageBanner: React.FC<HomePageBannerProps> = ({ content, title }) => {
  return (
    <Box>
      <Box>
        <Image
          src="/images/HomePageBanner.png"
          alt="Home Page Banner"
          width="100%"
          height="100%"
        />
      </Box>
      <Box bg="accent.4" borderRadius="0px 0px 18px 18px" px="5" py="7">
        <Heading
          color="accent.2"
          fontSize="2xl"
          fontWeight="extrabold"
          lineHeight="140%"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        <Text
          mt="2"
          mb="7"
          fontSize="sm"
          fontWeight="normal"
          color="primary"
          lineHeight="140%"
        >
          {content}
        </Text>
        <Flex justify="space-around">
          <Link href="/fan/sign-up">
            <Button variant="primary" height="48px" mr="2.5">
              Join as Fan
            </Button>
          </Link>
          <Link href="/athlete/sign-up">
            <Button variant="primary" height="48px">
              Join as athlete
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePageBanner;
