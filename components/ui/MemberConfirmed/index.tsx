import { Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MemberConfirmedProps {
  Icon: ReactNode;
  title: string;
  description: string;
  textButton: string;
  onConfirmed: () => void;
}
const MemberConfirmed: React.FC<MemberConfirmedProps> = ({
  Icon,
  title,
  description,
  textButton,
  onConfirmed,
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ base: "column", xl: "row-reverse" }}
      justifyContent={{ xl: "space-between" }}
      alignItems="center"
    >
      <Box
        alignItems="center"
        textAlign="center"
        alignContent="center"
        mb={7}
        w={{ base: "150px", lg: "240px" }}
        h={{ base: "150px", lg: "240px" }}
      >
        {Icon}
      </Box>
      <Box>
        <Box
          color="primary"
          display="flex"
          flexDirection="column"
          textAlign={{ base: "center", xl: "left" }}
          mb={{ base: "7", xl: "12" }}
        >
          <Box fontWeight="bold" fontSize={{ base: "36px", xl: "48px" }} mb="4">
            {title}
          </Box>
          <Box
            fontWeight={{ base: "medium", xl: "normal" }}
            fontSize="md"
            color="grey.300"
          >
            {description}
          </Box>
        </Box>
        <Button
          fontSize={{ base: "md", xl: "xl" }}
          bg="primary"
          w={{ base: "100%", xl: "auto" }}
          color="secondary"
          _hover={{ backgroundColor: "gray" }}
          onClick={onConfirmed}
        >
          <Box py="3" fontWeight="bold">
            {textButton}
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default MemberConfirmed;
