import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import mockRouter from "next-router-mock";
import { store } from "@/store";
import { SocialInteraction } from "./SocialInteraction";

jest.mock("next/router", () => require("next-router-mock"));

it("renders social interaction section unchanged", () => {
  mockRouter.push("/");
  const { container } = render(
    <Provider store={store}>
      <SocialInteraction liked reactionCount={10} commentsCount={10} />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
