import React, { useMemo } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import { isIOS } from "react-device-detect";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";
import { IUploadFileInteraction } from "@/types/athlete/types";

interface IPreviewFile {
  item: IUploadFileInteraction;
  styleSquare: {
    base: string;
    lg: string;
  };
}

const PreviewFile: React.FC<IPreviewFile> = ({
  item: { file, fullType, type },
  styleSquare,
}) => {
  const fileFormat = useMemo(() => {
    if (!file) return "";
    if (typeof file === "string") {
      return file + "#t0.001";
    }

    return URL.createObjectURL(file);
  }, [file]);

  return (
    <If condition={type === "image"}>
      <Then>
        <Box>
          <Image
            w={styleSquare}
            h={styleSquare}
            objectFit="cover"
            src={fileFormat}
            alt=""
          />
        </Box>
      </Then>
      <Else>
        <Box w={styleSquare} h={styleSquare}>
          <video
            muted
            style={{ width: "100%" }}
            autoPlay={isIOS}
            preload="auto"
            playsInline
            src={fileFormat}
          >
            <source src={fileFormat} type={fullType} />
          </video>
          <Flex
            w="full"
            h="full"
            alignItems="center"
            justifyContent="center"
            bg="gradient.dark"
            position="absolute"
            top={0}
          >
            <PlayVideoIcon
              w={{ base: "18px", lg: "25px" }}
              h={{ base: "18px", lg: "25px" }}
              position="absolute"
            />
          </Flex>
        </Box>
      </Else>
    </If>
  );
};

export default PreviewFile;
