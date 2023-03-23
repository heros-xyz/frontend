import { Box, Button, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/svg/ArrowRightIcon";

interface MilestoneTimelineProps {
  onSubmit: () => void;
  children: ReactNode;
  isLoading?: boolean;
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  onSubmit,
  children,
  isLoading,
}) => {
  return (
    <Box
      w="full"
      bg="white"
      fontSize="xs"
      minH="100vh"
      p={5}
      alignItems="center"
    >
      <Center
        pt={{ base: 5, xl: 14 }}
        fontWeight="extrabold"
        fontSize={{ xl: "xl" }}
        color="primary"
      >
        Career journey
      </Center>
      <Center
        mt={{ base: "40px", xl: "5rem" }}
        fontSize={{ base: "xs", xl: "md" }}
      >
        Try adding more milestones, or click “Proceed” to finish your journey.
        You can always add more later.
      </Center>
      <Box w={{ xl: "full" }} display={{ xl: "flex" }} ml={{ xl: "25%" }}>
        <Box mt={{ base: "5", xl: "5.875rem" }} alignItems="center">
          {children}
        </Box>
      </Box>

      <Center w="full">
        <Button
          variant="primary"
          mt={{ base: "6rem", xl: "7rem" }}
          fontWeight="bold"
          w={{ base: "full", xl: "auto" }}
          isLoading={isLoading}
          onClick={onSubmit}
          fontSize={{ xl: "xl" }}
        >
          PROCEED <ArrowRightIcon w="15px" h="13.5px" ml={3} />
        </Button>
      </Center>
    </Box>
  );
};

export default MilestoneTimeline;
