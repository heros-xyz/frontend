import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import BasicInfoAthlete from "./index";
const meta: Meta<typeof BasicInfoAthlete> = {
  title: "Athlete/Basic Info",
  component: BasicInfoAthlete,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BasicInfoAthlete>;

export const InfoComponent: Story = {
  render: () => (
    <Provider store={store}>
      <BasicInfoAthlete
        image={
          "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
        }
        nickname={"matt prior"}
        fans={2022}
        tagline={"A passionate athlete always reaching for the higher peaks"}
        sport={"Cricket"}
        countryCode="VN"
        onClickDownButton={() => {}}
        role="ADMIN"
      />
    </Provider>
  ),
};
