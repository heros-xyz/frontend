import { render } from "@testing-library/react";
import JoinPage from "../index";

it("renders homepage unchanged", () => {
  const { container } = render(<JoinPage />);
  expect(container).toMatchSnapshot();
});
