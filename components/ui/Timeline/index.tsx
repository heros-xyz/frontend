import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Else, If, Then } from "react-if";
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
  itemCurrent?: ITimeLineInfo;
  message?: string;
}

const TimeLineJourney: React.FC<IProps> = ({
  items,
  isAddJourney,
  bgColor,
  handleClickAdd,
  handleClickEdit,
  canEdit,
  message,
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
    <Flex flexDirection="column" color="accent.2" gap={4}>
      {items.map((item, index) => (
        <Flex
          key={`${"key" + index}`}
          alignItems="center"
          gap={{ base: 3, xl: 7 }}
        >
          <Flex alignItems="center">
            <Box minWidth={10}>
              <If condition={item?.icon}>
                <Then>{getSportIcon(item?.icon, "accent.2")}</Then>
                <Else>
                  <Box
                    w={{ base: "30px", xl: "60px" }}
                    h={{ base: "30px", xl: "60px" }}
                  >
                    <Box display="none" />
                  </Box>
                </Else>
              </If>
            </Box>
            <Flex
              position="relative"
              flexDirection="column"
              alignItems="center"
              mx={{ xl: 7 }}
            >
              <Box
                p={1}
                w="fit-content"
                h="fit-content"
                borderRadius="full"
                bg="accent.2"
                zIndex={1}
              >
                <Box w={3} h={3} borderRadius="full" bg="grey.0" />
              </Box>
              <If condition={items.length - 1 > index}>
                <Then>
                  <Box
                    position="absolute"
                    top={3.5}
                    w={0.5}
                    h={
                      item.title?.length > 25 && item.description?.length > 70
                        ? { base: "95px", xl: "115px" }
                        : { base: "90px", xl: "110px" }
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
                      h="90px"
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
                        <AddArchiveIcon
                          w={{ base: "30px", xl: "45px" }}
                          h={{ base: "30px", xl: "45px" }}
                        />
                      </Button>
                      <Text
                        position="absolute"
                        left={{ base: "45px", xl: 20 }}
                        fontSize={{ base: "xs", xl: message ? "md" : "2xl" }}
                        whiteSpace="nowrap"
                        fontWeight={message ? "bold" : "medium"}
                      >
                        {message ??
                          "Add as many as you like to tell your journey"}
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
            isCurrent={false}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default TimeLineJourney;
