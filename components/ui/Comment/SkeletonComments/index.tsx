import { Box, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const SkeletonComments = () => {
  return (
    <Box>
      <Flex alignItems="end" gap={3} mb={5}>
        <SkeletonCircle size="10" />
        <Skeleton rounded="xl" height={{ base: "40px", lg: "60px" }} w="30%" />
      </Flex>
      <Flex alignItems="end" gap={3} mb={5}>
        <SkeletonCircle size="10" />
        <Skeleton rounded="xl" height={{ base: "60px", lg: "100px" }} w="70%" />
      </Flex>
      <Flex alignItems="end" gap={3} mb={5}>
        <SkeletonCircle size="10" />
        <Skeleton rounded="xl" height={{ base: "50px", lg: "80px" }} w="70%" />
      </Flex>
      <Flex alignItems="end" gap={3} mb={5}>
        <SkeletonCircle size="10" />
        <Skeleton rounded="xl" height={{ base: "40px", lg: "80px" }} w="50%" />
      </Flex>
    </Box>
  );
};
export default SkeletonComments;
