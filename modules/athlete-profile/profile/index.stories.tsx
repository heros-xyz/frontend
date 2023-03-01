import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Profile } from ".";
import { basicInfo, sportProfile } from "./mock";

const meta: Meta<typeof Profile> = {
  title: "Athlete/My Profile/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const ProfileComponent: Story = {
  render: () => (
    <Provider store={store}>
      <Box h="100vh" bg="primary" color="white">
        <Profile isEdit basicInfo={basicInfo} sportProfile={sportProfile} />
      </Box>
    </Provider>
  ),
};
