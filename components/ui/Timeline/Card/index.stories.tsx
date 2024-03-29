import { Flex } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import JourneyCard from "./index";
const dataCurrent = {
  title: "Join “Jaworznickie Stowarzyszenie Piłkarskie Szczakowianka Club",
  description:
    "I became the best new player on team I became the best new player on team I became the best new player on team I became the best new player on team",
  startDate: "10/01/2022",
  endDate: "10/24/2022",
  isPeriodDate: true,
  icon: "FLAG",
};
const meta: Meta<typeof JourneyCard> = {
  title: "Components/TimeLineJourney/JourneyCard",
  component: JourneyCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof JourneyCard>;

export const JourneyCardStory: Story = {
  render: () => (
    <Flex flexDirection="column" gap={3} p={5} bg="primary" h="100vh">
      <JourneyCard item={dataCurrent} isCurrent={true} />
    </Flex>
  ),
};
