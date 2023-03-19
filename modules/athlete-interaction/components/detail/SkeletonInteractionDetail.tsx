import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";

export default function SkeletonInteractionDetail() {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      gap={{ base: "10px", lg: "10%" }}
    >
      <PostSkeleton w={{ lg: "50%" }} />
      <Box mt={{ lg: "80px" }} w={{ lg: "50%" }}>
        <Flex mb={3} alignItems="end">
          <SkeletonCircle size="10" mb={2} mr={3} />
          <Box w="80%" borderRadius="2xl" overflow="hidden">
            <SkeletonText noOfLines={1} skeletonHeight={{ base: 12, lg: 16 }} />
          </Box>
        </Flex>
        <Flex mb={3} alignItems="end">
          <SkeletonCircle size="10" mr={3} />
          <Box w="50%" borderRadius="2xl" overflow="hidden">
            <SkeletonText noOfLines={1} skeletonHeight={{ base: 12, lg: 16 }} />
          </Box>
        </Flex>
        <Flex mb={3} alignItems="end">
          <SkeletonCircle size="10" mr={3} />
          <Box w="40%" borderRadius="2xl" overflow="hidden">
            <SkeletonText noOfLines={1} skeletonHeight={{ base: 12, lg: 16 }} />
          </Box>
        </Flex>
        <Flex mb={3} alignItems="end">
          <SkeletonCircle size="10" mr={3} />
          <Box w="70%" borderRadius="2xl" overflow="hidden">
            <SkeletonText noOfLines={1} skeletonHeight={{ base: 12, lg: 16 }} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
