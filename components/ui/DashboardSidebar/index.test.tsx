import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import DashboardSidebar from ".";
jest.mock("next/router", () => require("next-router-mock"));

it("renders Dashboard Sidebar unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(<DashboardSidebar tabValue="home" role="FAN" />);
  expect(container).toMatchSnapshot();
});
