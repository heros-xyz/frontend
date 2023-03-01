import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import FinishOnboarding from ".";

jest.mock("next/router", () => require("next-router-mock"));

it("renders homepage unchanged", () => {
  mockRouter.push("/fan");
  const { container } = render(<FinishOnboarding />);
  expect(container).toMatchSnapshot();
});
