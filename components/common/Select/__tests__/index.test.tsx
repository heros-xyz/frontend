import { render } from "@testing-library/react";
import Select from "../index";

it("renders select unchanged", () => {
  const { container } = render(<Select />);
  expect(container).toMatchSnapshot();
});
