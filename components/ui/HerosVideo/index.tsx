import { LegacyRef, useState } from "react";
import { Box, BoxProps, Spinner } from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import { isIOS } from "react-device-detect";
import { getVideoLink } from "@/utils/link";
import { useDevice } from "@/hooks/useDevice";
interface HerosVideoProps extends BoxProps {
  url: string;
  spinerSize?: string;
  vidRef?: LegacyRef<HTMLVideoElement>;
}

const HerosVideo: React.FC<HerosVideoProps> = ({
  url,
  spinerSize = "sm",
  vidRef,
  ...props
}) => {
  const { isMobile } = useDevice();
  const [loading, setLoading] = useState(true);
  return (
    <Box {...props} position="relative" w="full" h="full">
      <If condition={loading}>
        <Then>
          <Box
            rounded="4px"
            w="full"
            h="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="grey.0"
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            right={0}
            zIndex={2}
          >
            <Spinner color="accent.2" size={spinerSize} />
          </Box>
        </Then>
      </If>
      <If condition={!!vidRef}>
        <Then>
          <video
            muted
            controls
            playsInline
            preload="auto"
            autoPlay={isIOS}
            ref={vidRef}
            style={{
              borderRadius: isMobile ? "8px" : "12px",
              width: "100%",
              maxHeight: isMobile ? "500px" : "650px",
            }}
            onLoadedData={() => setLoading(false)}
          >
            <source src={url} />
          </video>
        </Then>
        <Else>
          <video
            src={getVideoLink(url)}
            playsInline
            style={{
              borderRadius: "8px",
              width: "100%",
            }}
            onLoadedData={() => setLoading(false)}
          />
        </Else>
      </If>
    </Box>
  );
};

export default HerosVideo;
