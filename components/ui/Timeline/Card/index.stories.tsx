import { Flex } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import JourneyCard from "./index";
const dataCurrent = {
  title: "Join “Jaworznickie Stowarzyszenie Piłkarskie Szczakowianka Club",
  description:
    "I became the best new player on team I became the best new player on team I became the best new player on team I became the best new player on team",
  from: "10/01/2022",
  to: "10/24/2022",
  isArchive: true,
  isCurrent: true,
};
const data = {
  title: "Join England Club",
  description: "I became the best new player on team",
  from: "10/24/2022",
  isArchive: true,
  isCurrent: false,
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
      <JourneyCard item={dataCurrent} />
      <JourneyCard item={data} />
    </Flex>
  ),
};
