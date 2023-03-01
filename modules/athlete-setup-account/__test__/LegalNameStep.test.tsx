import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OnboardingWrapper from "../../../components/ui/OnboardingWrapper";

describe("LegalNameStep", () => {
  const onNextStepMock = jest.fn();
  const textButton = "Proceed";
  const IconButton = <div>IconButton</div>;
  const title = "Test Title";
  const children = <div>Test Children</div>;

  const props = {
    onNextStep: onNextStepMock,
    textButton,
    IconButton,
    title,
    children,
  };

  it("should call the onNextStep function when the next button is clicked", () => {
    render(<OnboardingWrapper {...props} />);
  });
});
