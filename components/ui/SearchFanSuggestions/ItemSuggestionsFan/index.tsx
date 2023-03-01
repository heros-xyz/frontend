import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { IFanInfo } from "@/types/athlete/types";

interface IProps {
  item: IFanInfo;
  onClickItem?: (item: IFanInfo) => void;
}

const ItemSuggestionsFan: React.FC<IProps> = ({ item, onClickItem }) => {
  return (
    <Box
      borderBottom="1px"
      borderColor="gray.100"
      py="2"
      cursor={"pointer"}
      onClick={() => onClickItem && onClickItem(item)}
    >
      <Flex>
        <Box
          mr="2.5"
          borderRadius="full"
          bg="success.default"
          overflow="hidden"
        >
          <Image
            src={item.avatar}
            alt="heros item"
            width={{ base: "40px", xl: "50px" }}
            height={{ base: "40px", xl: "50px" }}
            objectFit="cover"
          />
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text
            color="primary"
            fontSize={{ base: "xs", xl: "md" }}
            mb={{ xl: 1 }}
            fontWeight={"700"}
            lineHeight="140%"
          >
            {item?.fullName}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemSuggestionsFan;
