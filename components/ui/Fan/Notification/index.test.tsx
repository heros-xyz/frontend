import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import mockRouter from "next-router-mock";
import { store } from "@/store";
import NotificationFan from ".";
jest.mock("next/router", () => require("next-router-mock"));

it("renders homepage unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(
    <Provider store={store}>
      <NotificationFan />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
