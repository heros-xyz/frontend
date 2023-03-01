import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import NotificationAthlete from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <NotificationAthlete />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
