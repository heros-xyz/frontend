import React from "react";
import { render } from "@testing-library/react";
import Label from "../components/Label";

describe("Label", () => {
  it("renders step unchanged", () => {
    const { container } = render(<Label title={"test"} description={"test"} />);
    expect(container).toMatchSnapshot();
  });
});
