import { render } from "@testing-library/react";
import Header from "../index";

it("renders homepage unchanged", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});
