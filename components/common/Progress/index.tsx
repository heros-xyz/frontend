import { Progress as CProgress, ProgressProps } from "@chakra-ui/react";
import { FC } from "react";

const Progress: FC<ProgressProps> = (props) => {
  return (
    <CProgress
      {...props}
      color="accent.2"
      borderRadius={{ base: "4px", xl: "16px" }}
      h={{ base: "7px", xl: "12px" }}
      background="transparent"
      border="1px solid black"
      className="CProgress"
    />
  );
};
export default Progress;
