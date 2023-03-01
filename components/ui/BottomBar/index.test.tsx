import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import BottomBar from ".";
jest.mock("next/router", () => require("next-router-mock"));

it("renders BottomBar unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(<BottomBar tabValue="home" role="FAN" />);
  expect(container).toMatchSnapshot();
});
