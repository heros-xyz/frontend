import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { timelineItems } from "@/utils/mock";
import TimeLineJourney from "./index";

const meta: Meta<typeof TimeLineJourney> = {
  title: "Components/TimeLineJourney",
  component: TimeLineJourney,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    items: {
      defaultValue: timelineItems,
    },
    isAddJourney: {
      defaultValue: true,
      options: [true, false],
      control: { type: "select" },
    },
    bgColor: {
      defaultValue: "secondary",
      options: ["secondary", "primary"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeLineJourney>;

export const TimeLineJourneyComponent1: Story = {
  render: (args) => (
    <Box minH="100vh" p={5} bg={"secondary"}>
      <TimeLineJourney {...args} bgColor={"secondary"} isAddJourney={false} />
    </Box>
  ),
};

export const TimeLineJourneyComponent2: Story = {
  render: (args) => (
    <Box minH="100vh" p={5} bg={"secondary"}>
      <TimeLineJourney {...args} bgColor={"secondary"} isAddJourney />
    </Box>
  ),
};

export const TimeLineJourneyComponent3: Story = {
  render: (args) => (
    <Box minH="100vh" p={5} bg={"primary"}>
      <TimeLineJourney {...args} bgColor={"primary"} isAddJourney={false} />
    </Box>
  ),
};

export const TimeLineJourneyComponent4: Story = {
  render: (args) => (
    <Box minH="100vh" p={5} bg={"primary"}>
      <TimeLineJourney {...args} bgColor={"primary"} isAddJourney />
    </Box>
  ),
};
