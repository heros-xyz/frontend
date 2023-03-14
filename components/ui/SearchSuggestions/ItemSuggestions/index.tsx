import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getImageLink } from "@/utils/link";

interface IProps {
  item: {
    avatar: string;
    fullName: string;
    sport: string;
    id: string;
    nickName: string;
  };
  onClick: () => void;
}

const ItemSuggestions: React.FC<IProps> = ({ item, onClick }) => {
  const router = useRouter();

  const onClickSuggestionItem = async () => {
    const query = {
      current: router.query.current,
      athleteId: item.id,
    };
    await router.push({
      pathname: `/fan/athlete-profile/${item.id}`,
      query,
    });
    onClick();

    if (router.pathname.includes("/athlete-profile")) {
      router.reload();
    }
  };

  return (
    <Box borderBottom="1px" borderColor="gray.100" py="2" cursor={"pointer"}>
      <Flex onClick={onClickSuggestionItem}>
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
            fallbackSrc="https://via.placeholder.com/50"
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
            {item?.nickName ?? item?.fullName}
          </Text>
          <Text
            as="p"
            color="grey.200"
            fontSize={{ base: "xs", xl: "md" }}
            fontWeight="500"
            lineHeight="120%"
          >
            {item?.sport}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemSuggestions;