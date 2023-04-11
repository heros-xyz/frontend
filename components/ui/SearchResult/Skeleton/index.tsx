import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const SearchResultSkeleton = () => {
  return (
    <Box
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
        w={{ base: "50px", lg: "80px" }}
        h={{ base: "50px", lg: "80px" }}
      />
      <Box pl={1} flex={1}>
        <Skeleton w="20%" height="12px" color="white" mb={2} />
        <Skeleton w="40%" height="12px" color="white" mb={2} />
        <Skeleton w="60%" height="12px" color="white" />
      </Box>
    </Box>
  );
};

export default SearchResultSkeleton;
