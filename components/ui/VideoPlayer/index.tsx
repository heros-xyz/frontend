import React, { useRef, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Box } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { isIOS } from "react-device-detect";
import { useDevice } from "@/hooks/useDevice";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";
interface IVideoPlayerProps {
  url: string;
}
export const VideoPlayer: React.FC<IVideoPlayerProps> = ({ url }) => {
  const { isMobile } = useDevice();
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isPlay] = useState(true);

  const onPositionChange = (item: Waypoint.CallbackArgs) => {
    if (item.currentPosition === "inside") {
      if (vidRef && vidRef.current) {
        vidRef.current.muted = true;
        vidRef.current.play();
      }
    }
  };

  const handleExitViewport = () => {
    if (vidRef && vidRef.current) {
      vidRef.current.pause();
    }
  };

  return (
    <Waypoint
      topOffset="45%"
      bottomOffset="45%"
      onPositionChange={onPositionChange}
      onLeave={handleExitViewport}
    >
      <Box w="full">
        <video
          muted
          controls
          playsInline
          autoPlay={isIOS}
          ref={vidRef}
          style={{
            borderRadius: isMobile ? "8px" : "12px",
            width: "100%",
            maxHeight: isMobile ? "500px" : "650px",
          }}
        >
          <source src={url} />
        </video>
        <If condition={!isPlay}>
          <Then>
            <PlayVideoIcon
              w={{ base: "40px", lg: "50px" }}
              h={{ base: "40px", lg: "50px" }}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
            />
          </Then>
        </If>
      </Box>
    </Waypoint>
  );
};
