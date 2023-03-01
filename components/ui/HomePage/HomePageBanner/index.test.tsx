import { render } from "@testing-library/react";
import React from "react";
import HomePageBanner from "./index";

it("renders homepage banner unchanged", () => {
  const { container } = render(
    <HomePageBanner
      title="For athletes, by fans"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
  );
  expect(container).toMatchSnapshot();
});
