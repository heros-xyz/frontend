import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import AddSportProfileSuccessfully from ".";

jest.mock("next/router", () => require("next-router-mock"));

it("renders add Add Sport Profile Successfully unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(<AddSportProfileSuccessfully />);
  expect(container).toMatchSnapshot();
});
