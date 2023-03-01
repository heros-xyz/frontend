import type { Meta, StoryObj } from "@storybook/react";
import AthletesLike from ".";

const meta: Meta<typeof AthletesLike> = {
  title: "Components/AthletesLike",
  component: AthletesLike,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<typeof AthletesLike>;

export const AthletesLikeStory: Story = {
  args: {
    data: [
      {
        id: "1",
        avatar:
          "https://images.pexels.com/photos/127160/pexels-photo-127160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        fullName: "Athlete Name 1",
        createdAt: "",
        sportName: "",
      },
    ],
    title: "Athletes you might also like:",
  },
};
