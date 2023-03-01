import { render } from "@testing-library/react";
import FindHerosWithoutResult from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<FindHerosWithoutResult />);
  expect(container).toMatchSnapshot();
});
