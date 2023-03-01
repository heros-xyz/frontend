import { render } from "@testing-library/react";
import Input from ".";

it("renders input unchanged", () => {
  const { container } = render(<Input />);
  expect(container).toMatchSnapshot();
});
