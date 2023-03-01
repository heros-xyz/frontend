import { render } from "@testing-library/react";
import AddTag from ".";

it("renders add tag unchanged", () => {
  const { container } = render(<AddTag onSubmit={console.log} />);
  expect(container).toMatchSnapshot();
});
