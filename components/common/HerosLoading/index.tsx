import { Box, Spinner } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { useAppSelector } from "@/store";

const HerosLoading = () => {
  const loading = useAppSelector(({ appState }) => appState.isLoading);
  return (
    <If condition={loading}>
      <Then>
        <Box
          position="fixed"
          w="full"
          h="full"
          bg="primary"
          opacity={0.8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={100}
        >
          <Spinner color="secondary" size="lg" thickness="3px" speed="0.3s" />
        </Box>
      </Then>
    </If>
  );
};

export default HerosLoading;
