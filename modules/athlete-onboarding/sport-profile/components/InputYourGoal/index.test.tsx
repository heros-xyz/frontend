import { render } from "@testing-library/react";
import InputYourGoal from ".";

it("renders add Input Your Goal unchanged", () => {
  const { container } = render(<InputYourGoal />);
  expect(container).toMatchSnapshot();
});
