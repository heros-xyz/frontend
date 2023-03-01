import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { store } from "@/store";
import FindHeros from ".";

jest.mock("next/router", () => require("next-router-mock"));

it("renders homepage unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(
    <Provider store={store}>
      <FindHeros />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
