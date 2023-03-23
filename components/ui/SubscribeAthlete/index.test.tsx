import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import SubscribeAthlete from ".";
jest.mock("next/router", () => require("next-router-mock"));

it("renders SubscribeAthlete unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(<SubscribeAthlete />);
  expect(container).toMatchSnapshot();
});
