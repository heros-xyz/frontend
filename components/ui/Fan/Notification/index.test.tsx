import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import NotificationFan from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <NotificationFan />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
