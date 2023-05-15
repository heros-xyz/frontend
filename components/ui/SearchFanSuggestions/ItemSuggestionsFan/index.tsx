import { Box, Flex, Text, Image, Highlight } from "@chakra-ui/react";
import { IFanInfo } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";

interface IProps {
  item: IFanInfo;
  searchKeyword?: string;
  onClickItem?: (item: IFanInfo) => void;
}

const ItemSuggestionsFan: React.FC<IProps> = ({
  item,
  searchKeyword,
  onClickItem,
}) => {
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
            src={getImageLink(item.avatar)}
            alt="heros item"
            width={{ base: "40px", xl: "50px" }}
            height={{ base: "40px", xl: "50px" }}
            objectFit="cover"
            fallbackSrc="/images/DefaultAvaCircle.png"
          />
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text
            color="primary"
            fontSize={{ base: "xs", xl: "md" }}
            mb={{ xl: 1 }}
            fontWeight={"500"}
            lineHeight="140%"
          >
            <Highlight
              query={searchKeyword ?? ""}
              styles={{ fontWeight: "extrabold", color: "primary" }}
            >
              {item?.fullName}
            </Highlight>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemSuggestionsFan;
