import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import MyAthletes from ".";

it("renders my athletes", () => {
  const { container } = render(
    <Provider store={store}>
      <MyAthletes />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
