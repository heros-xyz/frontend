import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const NotiSkeleton = () => {
  return (
    <Box
      px={5}
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      gap={2.5}
      h={{ base: "70px", lg: "92px" }}
      my={1.5}
      w="full"
      bg="grey.0"
      rounded="10px"
    >
      <SkeletonCircle
        w={{ base: "50px", lg: "60px" }}
        h={{ base: "50px", lg: "60px" }}
      />
      <Box pl={1} flex={1}>
        <Skeleton w="40%" height="12px" color="white" mb={2} />
        <Skeleton w="80%" height="12px" color="white" />
      </Box>
    </Box>
  );
};

export default NotiSkeleton;
