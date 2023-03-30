import { Pagination } from "swiper";
import { AspectRatio, Box, Image, Skeleton, Spinner } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Case, Else, If, Switch, Then } from "react-if";
import { getImageLink } from "@/utils/link";
import { IInteractionMedia } from "@/types/athlete/types";
import { cssStyles } from "./styles";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { VideoPlayer } from "../VideoPlayer";

interface IHerosSwiper {
  width?: string;
  height?: string;
  slideData: IInteractionMedia[];
}

const HerosSwiper: React.FC<IHerosSwiper> = ({
  height = "100%",
  slideData,
}) => {
  const pagination = {
    clickable: true,
  };

  const styles = cssStyles(height);

  return (
    <Box css={styles} maxW="500px">
      <Swiper
        spaceBetween={40}
        pagination={pagination}
        modules={[Pagination]}
        lazy={true}
      >
        {slideData?.map((item) => (
          <SwiperSlide key={item.id}>
            <Switch>
              <Case condition={slideData.length > 1}>
                <AspectRatio w="full" ratio={1}>
                  <If condition={item.type === "image"}>
                    <Then>
                      <Image
                        src={getImageLink(item.url)}
                        alt={item.url}
                        rounded={{ base: "8px", lg: "12px" }}
                        objectFit="cover"
                        fallback={
                          <Box rounded="10px" w="full" h="300px" bg="grey.0">
                            <Spinner color="accent.2" size="md" />
                          </Box>
                        }
                      />
                    </Then>
                    <Else>
                      <VideoPlayer url={getImageLink(item.url)} />
                    </Else>
                  </If>
                </AspectRatio>
              </Case>
              <Case condition={slideData.length <= 1}>
                <If condition={item.type === "image"}>
                  <Then>
                    <Image
                      src={getImageLink(item.url)}
                      alt={item.url}
                      rounded={{ base: "8px", lg: "12px" }}
                      objectFit="cover"
                      fallback={
                        <Box
                          rounded="10px"
                          w="full"
                          h="300px"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          bg="grey.0"
                        >
                          <Spinner color="accent.2" size="md" />
                        </Box>
                      }
                    />
                  </Then>
                  <Else>
                    <VideoPlayer url={getImageLink(item.url)} />
                  </Else>
                </If>
              </Case>
            </Switch>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HerosSwiper;
