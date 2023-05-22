import { Box, BoxProps, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";
import { If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
interface ILoadMoreSkeletonProps extends BoxProps {
  isShowLoadMore: boolean;
  setOffset?: () => void;
}
const LoadMoreSkeleton: React.FC<ILoadMoreSkeletonProps> = ({
  isShowLoadMore,
  setOffset,
  ...props
}) => {
  return (
    <If condition={isShowLoadMore}>
      <Then>
        <Waypoint onEnter={setOffset}>
          <Box
            {...props}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            gap={2.5}
            w="full"
          >
            <SkeletonCircle
              w={{ base: "32px", lg: "48px" }}
              h={{ base: "32px", lg: "48px" }}
            />
            <Box pl={1} flex={1}>
              <Skeleton w="40%" height="12px" color="white" mb={2} />
              <Skeleton w="80%" height="12px" color="white" />
            </Box>
          </Box>
        </Waypoint>
      </Then>
    </If>
  );
};

export default LoadMoreSkeleton;
