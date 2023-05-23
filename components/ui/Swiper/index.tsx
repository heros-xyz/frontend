import { Navigation, Pagination } from "swiper";
import { AspectRatio, Box, Image, Spinner } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Case, Else, If, Switch, Then } from "react-if";
import { useState } from "react";
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
  width = "100%",
  height = "calc(100% + 40px)",
  slideData,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pagination = {
    clickable: false,
  };
  const styles = cssStyles(width, height);

  return (
    <Box css={styles} maxW="500px">
      <Swiper
        spaceBetween={40}
        pagination={pagination}
        modules={[Navigation, Pagination]}
        lazy={true}
        onSlideChange={(slide) => {
          setCurrentSlide(slide.activeIndex);
        }}
        navigation={slideData.length > 1}
      >
        {slideData?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <Switch>
              <Case condition={slideData.length > 1}>
                <AspectRatio w="full" ratio={1}>
                  <If condition={item.type === "image"}>
                    <Then>
                      <Image
                        src={item.url}
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
                      <VideoPlayer
                        allowPlaying={currentSlide === index}
                        url={item.url}
                      />
                    </Else>
                  </If>
                </AspectRatio>
              </Case>
              <Case condition={slideData.length <= 1}>
                <If condition={item.type === "image"}>
                  <Then>
                    <Image
                      src={item.url}
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
                    <VideoPlayer url={item.url} />
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
