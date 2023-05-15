import type { Meta, StoryObj } from "@storybook/react";
import Checklist from ".";

const meta: Meta<typeof Checklist> = {
  title: "Athlete/Checklist",
  component: Checklist,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      options: [
        "Page Information",
        "Sport Profile",
        "Career Journey",
        "Personal Information",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checklist>;
export const CareerJourney: Story = {
  render: (args) => <Checklist {...args}>Join with us</Checklist>,
  args: {
    type: "career",
    title: "Career Journey",
    description:
      "Make sure you paint a compelling picture of how they can join you on this journey.",
    checked: false,
    link: "career-journey",
  },
};
export const SportProfile: Story = {
  render: (args) => <Checklist {...args}>Join with us</Checklist>,
  args: {
    type: "sport",
    title: "Sport Profile",
    description:
      "Fan will appreciate more if they know how hard you trained & worked to be the best!",
    checked: false,
    link: "sport-profile",
  },
};
export const BasicInformation: Story = {
  render: (args) => <Checklist {...args}>Join with us</Checklist>,
  args: {
    type: "basic",
    title: "Personal Information",
    description: "Help your fan & followers know you better personally.",
    checked: true,
    link: "basic-information",
  },
};
export const PageInformation: Story = {
  render: (args) => <Checklist {...args}>Join with us</Checklist>,
  args: {
    type: "page",
    title: "Page Information",
    description:
      "Make sure you paint a compelling picture of how they can join you on this journey.",
    checked: true,
    link: "page-information",
  },
};
