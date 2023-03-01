import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import NotificationCard from "./index";

const item = {
  id: "1",
  type: "A_NEW_INTERACTION",
  message: "notification.athlete-new-interaction",
  source: {
    id: "48",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    fullName: "Sam Smith",
  },
  interaction: {
    id: "70",
    content: "some content should be trimmed if too long",
  },
  comment: null,
  readAt: null,
  createdAt: "2023-02-22T08:43:57.555Z",
};

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <NotificationCard item={item} />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
