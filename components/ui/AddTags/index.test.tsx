import { render } from "@testing-library/react";
import AddTags from "./index";

it("renders add tags unchanged", () => {
  const { container } = render(<AddTags />);
  expect(container).toMatchSnapshot();
});
