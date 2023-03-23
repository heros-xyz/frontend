import { Box, Button, Text } from "@chakra-ui/react";
import { FirstloadIcon } from "@/components/svg/FirstloadIcon";
import AddArchiveIcon from "@/components/svg/AddArchiveIcon";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { IconArrowRight } from "@/components/svg/IconArrowRight";

interface AddFirstMilestoneProps {
  handleAddMilestone: () => void;
}

const AddFirstMilestone: React.FC<AddFirstMilestoneProps> = ({
  handleAddMilestone,
}) => {
  return (
    <HerosOnboardingWrapperNew
      Icon={
        <FirstloadIcon
          w={{ base: "150px", xl: "240px" }}
          h={{ base: "150px", xl: "240px" }}
          color={{ base: "accent.1", xl: "white" }}
        />
      }
      textButton="Proceed"
      IconButton={<IconArrowRight />}
      title="Career journey"
      bgIconColor="accent.1"
      isDisabled
    >
      <Box>
        <Box mb={2}>
          <Text
            mt={{ base: 10, sm: 0 }}
            fontSize={{ xl: "medium" }}
            color="grey.300"
          >
            Try adding a milestone. It can be the day you joined a team, the day
            you won a prize, or even the time period you trained at a facility.
            Tell your journey!
          </Text>
        </Box>
        <Box
          display="flex"
          verticalAlign="middle"
          alignItems="center"
          mt="3.5rem"
          ml={{ base: 10, xl: 2 }}
          color="primary"
        >
          <Button
            p={0}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            onClick={handleAddMilestone}
          >
            <AddArchiveIcon
              w={{ base: "30px", xl: "45px" }}
              h={{ base: "30px", xl: "45px" }}
            />
          </Button>
          <Text
            as="span"
            fontWeight={"medium"}
            ml={2}
            fontSize={{ xl: "2rem" }}
          >
            Add your first milestone
          </Text>
        </Box>
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default AddFirstMilestone;
