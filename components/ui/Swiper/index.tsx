import { Pagination } from "swiper";
import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Case, Else, If, Switch, Then } from "react-if";
import { useMemo } from "react";
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

  const isAllImage = useMemo(() => {
    return slideData && slideData.every((media) => media.type === "image");
  }, [slideData]);

  const isAllVideo = useMemo(() => {
    return slideData && slideData.every((media) => media.type === "video");
  }, [slideData]);

  const isMixVideoAndImage = useMemo(() => {
    const hasImage =
      slideData && slideData.some((media) => media.type === "image");

    const hasVideo =
      slideData && slideData.some((media) => media.type === "video");

    return hasImage && hasVideo;
  }, [slideData]);

  return (
    <Box css={styles} maxW="500px">
      <Swiper
        spaceBetween={40}
        pagination={pagination}
        modules={[Pagination]}
        lazy={true}
      >
        {slideData &&
          slideData.map((item) => (
            <SwiperSlide key={item.id}>
              <Switch>
                <Case condition={slideData.length > 1 && isMixVideoAndImage}>
                  <AspectRatio w="full" ratio={1}>
                    <If condition={item.type === "image"}>
                      <Then>
                        <Image
                          src={getImageLink(item.url)}
                          alt={item.url}
                          fallbackSrc="https://via.placeholder.com/500x500"
                          rounded={{ base: "8px", lg: "12px" }}
                          loading="lazy"
                        />
                      </Then>
                      <Else>
                        <VideoPlayer url={getImageLink(item.url)} />
                      </Else>
                    </If>
                  </AspectRatio>
                </Case>
                <Case
                  condition={slideData.length > 1 && (isAllImage || isAllVideo)}
                >
                  <If condition={item.type === "image"}>
                    <Then>
                      <Image
                        src={getImageLink(item.url)}
                        alt={item.url}
                        fallbackSrc="https://via.placeholder.com/500x500"
                        rounded={{ base: "8px", lg: "12px" }}
                        loading="lazy"
                      />
                    </Then>
                    <Else>
                      <VideoPlayer url={getImageLink(item.url)} />
                    </Else>
                  </If>
                </Case>
                <Case condition={slideData.length <= 1}>
                  <If condition={item.type === "image"}>
                    <Then>
                      <Image
                        src={getImageLink(item.url)}
                        alt={item.url}
                        fallbackSrc="https://via.placeholder.com/500x500"
                        rounded={{ base: "8px", lg: "12px" }}
                        loading="lazy"
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
