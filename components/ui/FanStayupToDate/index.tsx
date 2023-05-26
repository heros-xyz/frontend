import { Box, Heading, Text, Grid, AspectRatio } from "@chakra-ui/react";
import React from "react";
import { IAthleteUpToDate } from "@/types/athlete/types";
import HerosImage from "@/components/common/HerosImage";

interface FanStayUpToDate {
  data: IAthleteUpToDate[];
  onClick: (id: string) => void;
}

const FanStayUpToDate: React.FC<FanStayUpToDate> = ({ data, onClick }) => {
  return (
    <Box bg="accent.1" borderRadius={{ lg: "12px" }}>
      <Box p={{ base: "20px", lg: "30px" }}>
        <Heading
          fontSize={{ base: "md", lg: "xl" }}
          fontWeight="bold"
          color="primary"
          lineHeight="5"
          textAlign="left"
          as="h1"
          marginBottom={{ base: "20px", lg: "35px" }}
        >
          Stay Up-To-Date With Your Athlete(s):
        </Heading>
        <Grid
          templateColumns="repeat(2, 1fr)"
          columnGap={5}
          rowGap={{ base: 4, lg: 8 }}
        >
          {data?.map((item: IAthleteUpToDate) => (
            <Box
              key={item?.id}
              position="relative"
              cursor="pointer"
              onClick={() => onClick(item?.id)}
            >
              <AspectRatio maxW="400px" ratio={210 / 265}>
                <HerosImage
                  src={item?.targetUser?.avatar}
                  widthSize={250}
                  heightSize={250}
                  width={"100%"}
                  height={"100%"}
                  borderRadius="10px"
                />
              </AspectRatio>
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
                    {item?.targetUser?.nickName ?? ""}
                  </Text>
                  <Text
                    bg={
                      item?.totalNewestInteraction ? "accent.6" : "transparent"
                    }
                    borderRadius={{ base: "7px", xl: "100px" }}
                    fontSize={{ base: "10px", lg: "16px" }}
                    fontWeight="500"
                    color={
                      item?.totalNewestInteraction ? "primary" : "transparent"
                    }
                    lineHeight="14px"
                    py={{ xl: 1.5 }}
                    pr={{ base: "4px", lg: "8px" }}
                    pl={{ base: "4px", lg: "8px" }}
                  >
                    {item?.totalNewestInteraction} new interactions
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FanStayUpToDate;
