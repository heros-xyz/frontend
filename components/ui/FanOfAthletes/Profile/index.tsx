import {
  Center,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/svg/Calendar";
import { MailIcon } from "@/components/svg/MailIcon";
import { IFanInfo } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";

interface IFanOfAthleteProfileProps {
  isOpen: boolean;
  fanInfo?: IFanInfo;
  onClose: () => void;
}
const FanOfAthleteProfile: FC<IFanOfAthleteProfileProps> = ({
  isOpen,
  fanInfo,
  onClose,
}) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={{ base: "full", lg: "sm" }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        <Flex
          flexDirection="column"
          justifyContent="center"
          minHeight="100vh"
          bg="primary"
          fontSize={{ base: "sm", lg: "md" }}
          px={{ base: 6, lg: 20 }}
          color="white"
        >
          <Center flexDirection="column" mb={{ base: 10, lg: 12 }}>
            <Image
              w={{ base: "100px", lg: "160px" }}
              h={{ base: "100px", lg: "160px" }}
              mb={{ base: 2, lg: 8 }}
              rounded="full"
              src={getImageLink(fanInfo?.avatar)}
              alt={fanInfo?.fullName}
              fallbackSrc="https://via.placeholder.com/100"
              objectFit="cover"
            />
            <Text as="b" fontSize={{ lg: "xl" }}>
              {fanInfo?.fullName}
            </Text>
            <Text color="secondary">{"Bronze Tier"}</Text>
          </Center>
          <Flex gap={{ base: 2, lg: 4 }}>
            <Calendar w={{ base: 5, lg: 6 }} h={{ base: 5, lg: 6 }} />
            <Text>
              {dayjs(fanInfo?.createdAt?.toString()).format("DD MMMM YYYY")}
            </Text>
          </Flex>
          <Divider my={{ base: 2, lg: 4 }} />
          <Flex gap={{ base: 2, lg: 4 }}>
            <MailIcon w={{ base: 5, lg: 6 }} h={{ base: 5, lg: 6 }} />
            <Text>{fanInfo?.email}</Text>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

export default FanOfAthleteProfile;
