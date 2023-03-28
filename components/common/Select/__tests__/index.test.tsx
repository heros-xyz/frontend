import { render } from "@testing-library/react";

it("renders select unchanged", () => {
  const { container } = render(<></>);
  expect(container).toMatchSnapshot();
});
