import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { If, Then } from "react-if";
import { useUpdateEffect } from "react-use";
import AddArchiveIcon from "@/components/svg/AddArchiveIcon";
import { getSportIcon } from "@/utils/mock-icon";
import JourneyCard from "./Card";

export interface ITimeLineInfo {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  isPeriodDate: boolean;
  icon: string | null;
}
interface IProps {
  items: Array<ITimeLineInfo>;
  isAddJourney: boolean;
  bgColor: string;
  w?: string;
  handleClickAdd?: () => void;
  handleClickEdit?: (item: ITimeLineInfo) => void;
  canEdit?: boolean;
}

const TimeLineJourney: React.FC<IProps> = ({
  items,
  isAddJourney,
  bgColor,
  w,
  handleClickAdd,
  handleClickEdit,
  canEdit,
}) => {
  const [itemEdit, setItemEdit] = useState<ITimeLineInfo>();

  const handleAdd = () => {
    handleClickAdd && handleClickAdd();
  };

  useUpdateEffect(() => {
    if (itemEdit && handleClickEdit !== undefined) {
      handleClickEdit(itemEdit);
      setItemEdit(undefined);
    }
  }, [itemEdit]);
  return (
    <Flex
      flexDirection="column"
      color={bgColor === "secondary" ? "primary" : "primary"}
      gap={4}
      w={w}
    >
      {items.map((item, index) => (
        <Flex key={`${"key" + index}`} alignItems="center" gap={3}>
          <Flex alignItems="center">
            <Box minWidth={10}>
              <If condition={item?.icon}>
                <Then>
                  {getSportIcon(
                    item?.icon,
                    bgColor === "secondary" ? "primary" : "accent.2"
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
                bg="accent.2"
                zIndex={1}
              >
                <Box w={3} h={3} borderRadius="full" bg="white" />
              </Box>
              <If condition={items.length - 1 > index}>
                <Then>
                  <Box
                    position="absolute"
                    top={3.5}
                    w={0.5}
                    height={
                      item.title?.length > 25 && item.description?.length > 70
                        ? "95px"
                        : "90px"
                    }
                    bg={bgColor === "secondary" ? "accent.2" : "accent.2"}
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
                      bg={bgColor === "secondary" ? "accent.2" : "accent.2"}
                    />
                    <Flex
                      alignItems="center"
                      color={bgColor === "secondary" ? "primary" : "primary"}
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
          <JourneyCard
            item={item}
            canEdit={canEdit}
            setItemEdit={setItemEdit}
            isCurrent={item == items[0]}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default TimeLineJourney;
