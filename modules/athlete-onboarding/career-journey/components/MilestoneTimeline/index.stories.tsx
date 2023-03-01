import type { Meta, StoryObj } from "@storybook/react";
import TimeLineJourney from "@/components/ui/Timeline";
import { timelineItems } from "@/utils/mock";
import MilestoneTimeline from ".";

const meta: Meta<typeof MilestoneTimeline> = {
  title: "Athlete/MilestoneTimeline",
  component: MilestoneTimeline,
  tags: ["autodocs"],
  parameters: {
    layout: "base",
  },
};

export default meta;
type Story = StoryObj<typeof MilestoneTimeline>;

export const MilestoneTimelineStory: Story = {
  render: () => (
    <MilestoneTimeline onSubmit={console.log}>
      <TimeLineJourney
        w="100%"
        bgColor={"secondary"}
        isAddJourney={true}
        items={timelineItems}
        handleClickAdd={console.log}
      />
    </MilestoneTimeline>
  ),
};
