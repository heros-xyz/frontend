import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { If, Then } from "react-if";
import AddArchiveIcon from "@/components/svg/AddArchiveIcon";
import { getSportIcon } from "@/utils/mock-icon";
import JourneyCard from "./Card";

export interface ITimeLineInfo {
  title: string;
  description: string;
  from: string;
  to?: string | null;
  isArchive: boolean;
  isCurrent: boolean;
  icon?: string;
}
interface IProps {
  items: Array<ITimeLineInfo>;
  isAddJourney: boolean;
  bgColor: string;
  w?: string;
  handleClickAdd?: () => void;
}

const TimeLineJourney: React.FC<IProps> = ({
  items,
  isAddJourney,
  bgColor,
  w,
  handleClickAdd,
}) => {
  const handleAdd = () => {
    handleClickAdd && handleClickAdd();
  };

  return (
    <Flex
      flexDirection="column"
      color={bgColor === "secondary" ? "primary" : "white"}
      gap={4}
      w={w}
    >
      {items.map((item, index) => (
        <Flex key={`${"key" + index}`} alignItems="center" gap={3}>
          <Flex alignItems="center">
            <Box minWidth={10}>
              <If condition={item.isArchive}>
                <Then>
                  {getSportIcon(
                    item?.icon,
                    bgColor === "secondary" ? "primary" : "white"
                  )}
                </Then>
              </If>
            </Box>
            <Flex
              position="relative"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                p={0.5}
                w="fit-content"
                h="fit-content"
                borderRadius="full"
                bg="acccent.4"
                zIndex={1}
              >
                <Box w={3} h={3} borderRadius="full" bg="acccent.2" />
              </Box>
              <If condition={items.length - 1 > index}>
                <Then>
                  <Box
                    position="absolute"
                    top={3.5}
                    w={0.5}
                    height={
                      item.title.length > 25 && item.description.length > 70
                        ? "95px"
                        : "90px"
                    }
                    bg={bgColor === "secondary" ? "acccent.2" : "white"}
                  />
                </Then>
              </If>
              <If condition={items.length - 1 === index && isAddJourney}>
                <Then>
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    position="absolute"
                    gap={1}
                    pb="100px"
                  >
                    <Box
                      w={0.5}
                      height="90px"
                      bg={bgColor === "secondary" ? "acccent.2" : "white"}
                    />
                    <Flex
                      alignItems="center"
                      // cursor="pointer"
                      color={bgColor === "secondary" ? "primary" : "secondary"}
                    >
                      <Button
                        variant="ghost"
                        mt="-1"
                        p="0"
                        w={8}
                        h={8}
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        onClick={handleAdd}
                      >
                        <AddArchiveIcon w={8} h={8} />
                      </Button>
                      <Text
                        position="absolute"
                        left="45px"
                        fontSize="xs"
                        whiteSpace="nowrap"
                        fontWeight={700}
                      >
                        Add as many as you like to tell your journey
                      </Text>
                    </Flex>
                  </Flex>
                </Then>
              </If>
            </Flex>
          </Flex>
          <JourneyCard item={item} />
        </Flex>
      ))}
    </Flex>
  );
};

export default TimeLineJourney;
