import {
  AspectRatio,
  Box,
  BoxProps,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const PostSkeleton = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Flex>
        <SkeletonCircle size="10" mb={5} mr={3} />
        <Box w="20%">
          <SkeletonText noOfLines={2} skeletonHeight="3" />
        </Box>
      </Flex>
      <AspectRatio minW="100%" ratio={3 / 2} mb={5}>
        <Skeleton rounded={{ base: "lg", lg: "xl" }} mb={8} />
      </AspectRatio>
      {/* <SkeletonText noOfLines={4} spacing="4" skeletonHeight="3" /> */}
      <SkeletonText w="50%" noOfLines={1} skeletonHeight="3" mb={2} />
      <SkeletonText w="70%" noOfLines={1} skeletonHeight="3" mb={2} />
      <SkeletonText w="80%" noOfLines={1} skeletonHeight="3" mb={2} />
      <SkeletonText w="30%" noOfLines={1} skeletonHeight="3" mb={2} />

      <Divider display={{ lg: "none" }} my={10} />
    </Box>
  );
};

export default PostSkeleton;
