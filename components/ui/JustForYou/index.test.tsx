import { render } from "@testing-library/react";
import JustForYou from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<JustForYou href="" />);
  expect(container).toMatchSnapshot();
});
