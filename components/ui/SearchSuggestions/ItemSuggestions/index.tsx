import { Box, Flex, Text, Image, Highlight } from "@chakra-ui/react";
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
  searchKeyword?: string;
  onClick: () => void;
}

const ItemSuggestions: React.FC<IProps> = ({
  item,
  searchKeyword,
  onClick,
}) => {
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
            src={item?.avatar}
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
            fontWeight={"700"}
            lineHeight="140%"
          >
            <Highlight
              query={searchKeyword ?? ""}
              styles={{ fontWeight: "extrabold", color: "primary" }}
            >
              {item?.nickName ?? item?.fullName}
            </Highlight>
          </Text>
          <Text
            as="p"
            color="secondary"
            fontSize={{ base: "xs", xl: "md" }}
            fontWeight="500"
            lineHeight="120%"
          >
            {item?.sport?.label}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemSuggestions;
