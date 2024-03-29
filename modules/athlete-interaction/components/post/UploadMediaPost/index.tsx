import { Box, Flex, VisuallyHiddenInput } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { If, Then } from "react-if";
import { useFormikContext } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveImage from "@/components/svg/RemoveImage";
import { PlusIcon } from "@/components/svg/PlusIcon";
import { IUploadFile, IValuesTypes } from "@/modules/athlete-interaction/hooks";
import "swiper/css";
import PreviewFile from "../PreviewFile";

export interface IProps {
  onAdd?: () => void;
}
const styleSquare = {
  base: "70px",
  lg: "100px",
};

const UploadMediaPost = forwardRef<HTMLInputElement, IProps>(
  ({ onAdd }, ref) => {
    const { errors, values, setFieldValue } = useFormikContext<IValuesTypes>();

    const handleRemoveMedia = (indexImage: number) => {
      const newList = values.listMedia.filter(
        (_, index) => index !== indexImage
      );
      setFieldValue("listMedia", newList);
    };

    const onSelectMediaPost = (e: React.ChangeEvent<HTMLInputElement>) => {
      const arrayFile = Array.from(e?.target?.files || []);
      const mediaUploaded: IUploadFile[] = [];
      arrayFile.forEach((item) => {
        mediaUploaded.push({ type: item.type.split("/")[0], file: item });
      });
      setFieldValue("listMedia", [...values.listMedia, ...mediaUploaded]);
    };
    const formatFile = (file: File | string) => {
      if (typeof file === "string") {
        return file;
      }

      return file && URL.createObjectURL(file);
    };

    return (
      <Box>
        <If condition={values?.listMedia?.length}>
          <Then>
            <Swiper
              slidesPerView={4.2}
              breakpoints={{
                380: {
                  slidesPerView: 4.5,
                },
                405: {
                  slidesPerView: 4.8,
                },
                425: {
                  slidesPerView: 5.2,
                },
                450: {
                  slidesPerView: 5.5,
                },
                480: {
                  slidesPerView: 5.8,
                },
                500: {
                  slidesPerView: 6.2,
                },
                550: {
                  slidesPerView: 7,
                },
                769: {
                  slidesPerView: 10,
                },
                1024: {
                  slidesPerView: 4.2,
                },
              }}
            >
              {values?.listMedia?.map((item, index) => (
                <SwiperSlide key={`${"key" + index}`}>
                  <Box
                    w={styleSquare}
                    h={styleSquare}
                    rounded="base"
                    position="relative"
                    overflow="hidden"
                    border={
                      Array.isArray(errors?.listMedia) &&
                      errors?.listMedia?.[index]
                        ? "2px"
                        : ""
                    }
                    borderColor={
                      Array.isArray(errors?.listMedia) &&
                      errors?.listMedia?.[index]
                        ? "error.default"
                        : ""
                    }
                  >
                    <PreviewFile item={item} styleSquare={styleSquare} />
                    <RemoveImage
                      w={{ base: "18px", lg: "25px" }}
                      h={{ base: "18px", lg: "25px" }}
                      bg="grey.dark"
                      rounded="full"
                      cursor="pointer"
                      position="absolute"
                      top={1}
                      right={1}
                      p={1}
                      onClick={() => handleRemoveMedia(index)}
                    />
                  </Box>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <Flex
                  hidden={values?.listMedia.length >= 10}
                  w={styleSquare}
                  h={styleSquare}
                  alignItems="center"
                  justifyContent="center"
                  border="2px"
                  borderColor="primary"
                  rounded="base"
                  cursor="pointer"
                  onClick={onAdd}
                >
                  <PlusIcon
                    w={{ base: "16px", lg: "22px" }}
                    h={{ base: "16px", lg: "22px" }}
                  />
                </Flex>
              </SwiperSlide>
            </Swiper>
          </Then>
        </If>
        <VisuallyHiddenInput
          ref={ref}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif,video/*,video/mov,video/mp4,video/avi"
          onChange={onSelectMediaPost}
        />
      </Box>
    );
  }
);

export default UploadMediaPost;
