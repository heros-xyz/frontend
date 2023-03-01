import { render } from "@testing-library/react";
import TagLine from ".";

it("renders tag line unchanged", () => {
  const { container } = render(<TagLine onSubmit={console.log} value="" />);
  expect(container).toMatchSnapshot();
});
