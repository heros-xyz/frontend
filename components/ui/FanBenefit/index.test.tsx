import { render } from "@testing-library/react";
import FanBenefit from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<FanBenefit />);
  expect(container).toMatchSnapshot();
});
