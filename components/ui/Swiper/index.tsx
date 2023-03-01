import { Pagination } from "swiper";
import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { cssStyles } from "./styles";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IHerosSwiper {
  width?: string;
  height?: string;
  slideData: string[];
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
      <Swiper spaceBetween={40} pagination={pagination} modules={[Pagination]}>
        {slideData &&
          slideData.map((item) => (
            <SwiperSlide key={item}>
              <AspectRatio minW="100%" ratio={1}>
                <Image
                  src={item}
                  alt={item}
                  fallbackSrc="https://via.placeholder.com/500x500"
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default HerosSwiper;
