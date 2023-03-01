import { Box, Container } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import CareerJourney from ".";
import { CAREER_JOURNEY_DATA } from "./mock";

const meta: Meta<typeof CareerJourney> = {
  title: "Athlete/My Profile/CareerJourney",
  component: CareerJourney,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CareerJourney>;

export const CareerJourneyComponent: Story = {
  render: () => (
    <Provider store={store}>
      <Box h="100vh" bg="primary">
        <Container>
          <CareerJourney data={CAREER_JOURNEY_DATA} />
        </Container>
      </Box>
    </Provider>
  ),
};
