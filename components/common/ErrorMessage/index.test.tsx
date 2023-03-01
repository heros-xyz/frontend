import { render } from "@testing-library/react";
import ErrorMessage from ".";

it("renders Error Message unchanged", () => {
  const { container } = render(
    <ErrorMessage condition={true} errorMessage={"Field is required"} />
  );
  expect(container).toMatchSnapshot();
});
