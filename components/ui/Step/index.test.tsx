import React from "react";
import { render } from "@testing-library/react";
import Step from ".";

describe("Step", () => {
  it("renders step unchanged", () => {
    const onChangeStep = (step: number) => {
      console.log(step);
    };
    const { container } = render(
      <Step totalStep={5} activeStep={2} onChangeStep={onChangeStep} />
    );
    expect(container).toMatchSnapshot();
  });
});
