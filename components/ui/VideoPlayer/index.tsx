import React, { useEffect, useRef, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Box } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { PlayVideoIcon } from "@/components/svg/PlayVideoIcon";
import HerosVideo from "../HerosVideo";
interface IVideoPlayerProps {
  url: string;
  allowPlaying?: boolean;
}
export const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  url,
  allowPlaying = true,
}) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isPlay] = useState(true);
  const [currentPosition, setCurrentPosition] = useState("");

  const onPlay = () => {
    if (vidRef && vidRef.current) {
      vidRef.current.muted = true;
      vidRef.current.play();
      vidRef.current.muted = false;
    }
  };

  const onPositionChange = (item: Waypoint.CallbackArgs) => {
    setCurrentPosition(item.currentPosition);
  };

  const handleExitViewport = () => {
    if (vidRef && vidRef.current) {
      vidRef.current.pause();
      vidRef.current.muted = true;
    }
  };

  useEffect(() => {
    if (allowPlaying && currentPosition === "inside") {
      onPlay();
    } else {
      handleExitViewport();
    }
  }, [allowPlaying, currentPosition]);

  return (
    <Waypoint
      topOffset="45%"
      bottomOffset="45%"
      onPositionChange={onPositionChange}
      onLeave={handleExitViewport}
    >
      <Box w="full">
        <HerosVideo url={url} vidRef={vidRef} />
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
