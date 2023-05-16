import { AspectRatio, Skeleton } from "@chakra-ui/react";

const UpToDateSkeleton = () => {
  return (
    <AspectRatio maxW="400px" ratio={210 / 265}>
      <Skeleton rounded="10px" />
    </AspectRatio>
  );
};

export default UpToDateSkeleton;
