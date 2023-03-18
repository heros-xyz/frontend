import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { IAthleteInfo } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";

interface AthletesLikeProp {
  data: IAthleteInfo[];
  title: string;
  onClick: (id: string) => void;
}

const AthletesLike: React.FC<AthletesLikeProp> = ({ data, title, onClick }) => {
  return (
    <Box
      px={{ base: "5", xl: "30px" }}
      py={{ base: "7", xl: "30px" }}
      pt="7"
      bg="white"
    >
      <Text
        color="primary"
        fontWeight="bold"
        fontSize={{ xl: "xl" }}
        mb={{ base: "5", xl: "30px" }}
      >
        {title}
      </Text>

      <Grid
        templateColumns="repeat(2, 1fr)"
        w="full"
        columnGap={{ base: 3.5, xl: 5 }}
        rowGap={5}
      >
        {data.map((el) => (
          <Box
            rounded="12px"
            boxShadow="md"
            key={el?.id}
            position="relative"
            cursor="pointer"
            onClick={() => onClick(el?.id)}
          >
            <Image
              src={getImageLink(el?.avatar)}
              alt=""
              borderRadius="xl"
              objectFit="cover"
              h={{ base: "200px", lg: "265px" }}
              w="100%"
              fallbackSrc="https://via.placeholder.com/210x265"
            />
            <Box
              position="absolute"
              bottom="0"
              w="100%"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0) 60.94%, rgba(0, 0, 0, 0.8) 80.73%, #000000 100%)",
              }}
              borderBottomRightRadius="xl"
              borderBottomLeftRadius="xl"
            >
              <Box w="fit-content" ml={2.5} mb={2.5}>
                <Text
                  fontSize={{ base: "14px", lg: "18px" }}
                  color="white"
                  fontWeight="bold"
                  lineHeight={{ base: "20px", lg: "25px" }}
                  textTransform="capitalize"
                >
                  {el?.nickName}
                </Text>
                <Text
                  color={el?.sportName ? "white" : "transparent"}
                  fontSize={{ base: "10px", lg: "16px" }}
                  fontWeight="500"
                  lineHeight="14px"
                  py={{ xl: 1.5 }}
                >
                  {el?.sportName || "_"}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default AthletesLike;
