import { render } from "@testing-library/react";
import AddFirstMilestone from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<AddFirstMilestone isActive />);
  expect(container).toMatchSnapshot();
});
