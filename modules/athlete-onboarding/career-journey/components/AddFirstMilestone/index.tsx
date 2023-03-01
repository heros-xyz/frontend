import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { FirstloadIcon } from "@/components/svg/FirstloadIcon";
import AddArchiveIcon from "@/components/svg/AddArchiveIcon";
import { ArrowRightIcon } from "@/components/svg/ArrowRightIcon";

interface AddFirstMilestoneProps {
  handleAddMilestone: () => void;
}

const AddFirstMilestone: React.FC<AddFirstMilestoneProps> = ({
  handleAddMilestone,
}) => {
  return (
    <Box
      w={{ base: "auto", xl: "full" }}
      bg="secondary"
      fontSize="xs"
      minH="100vh"
    >
      <Center
        pt={{ base: 5, xl: 14 }}
        fontWeight="extrabold"
        fontSize={{ xl: "xl" }}
      >
        CAREER JOURNEY
      </Center>
      <Grid
        templateAreas={{
          base: `"icon"
                "text"
                "add"
                "proceed"`,
          xl: `"text icon" 
                "add icon"
                "proceed icon"`,
        }}
        mt={{ base: "7.5rem", xl: "14.5rem" }}
        ml={{ xl: "8.125rem" }}
      >
        <GridItem area={"icon"} w={{ xl: "33.33%" }}>
          <Center>
            <FirstloadIcon
              w={{ base: "9rem", xl: "15rem" }}
              h={{ base: "9rem", xl: "15rem" }}
            />
          </Center>
        </GridItem>
        <GridItem area={"text"} w={{ xl: "66.66%" }}>
          <Text
            mt={{ base: 10, sm: 0 }}
            w={{ xl: "45rem" }}
            fontSize={{ xl: "medium" }}
          >
            Try adding a milestone. It can be the day you joined a team, the day
            you won a prize, or even the time period you trained at a facility.
            Tell your journey!
          </Text>
        </GridItem>

        <GridItem area={"add"} w={{ xl: "66.66%" }}>
          <Box
            display="flex"
            verticalAlign="middle"
            alignItems="center"
            mt="3.5rem"
            ml={{ base: 10, xl: 2 }}
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
        </GridItem>
        <GridItem area={"proceed"} w={{ xl: "66.66%" }}>
          <Box w={{ xl: "43rem" }}>
            <Button
              variant="primary"
              mt="45px"
              fontWeight="bold"
              w={{ base: "full", xl: "auto" }}
              float={{ xl: "right" }}
              disabled
            >
              PROCEED <ArrowRightIcon w="15px" h="13.5px" ml={3} />
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AddFirstMilestone;
