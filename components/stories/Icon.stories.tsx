import "./styles.scss";
import { Button, Card, Container, Flex } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertIcon,
  ArrowNarrowRight,
  ArrowRight,
  Checked,
  ChervonDown,
  Menu,
} from "@/components/svg";
import { ArchiveIconFlag } from "@/components/svg/SportIcons/ArchiveIconFlag";

import {
  HomeActive,
  HomeIcon,
  InteractionsActive,
  InteractionsIcon,
  MyfanIcon,
  MyfansActive,
  NotificationActive,
  NotificationIcon,
  ProfileActive,
  ProfileIcon,
} from "@/components/svg/Navigate";

const meta: Meta<typeof Button> = {
  title: "Heros Icon/Icons",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllIcons: Story = {
  render: () => (
    <Container size={["base", "sm", "md", "lg", "xl"]} mt="8">
      <Card>
        <Flex flexWrap={"wrap"} gap="4">
          <AlertIcon />
          <ArrowNarrowRight />
          <ArrowRight />
          <Checked />
          <ChervonDown />
          <Menu />
          <HomeActive />
          <HomeIcon />
          <InteractionsActive />
          <InteractionsIcon />
          <MyfanIcon />
          <MyfansActive />
          <NotificationActive />
          <NotificationIcon />
          <ProfileActive />
          <ProfileIcon />
          <ArchiveIconFlag />
        </Flex>
      </Card>
    </Container>
  ),
};
