import { render } from "@testing-library/react";
import Progress from "./index";

it("renders progress unchanged", () => {
  const { container } = render(<Progress />);
  expect(container).toMatchSnapshot();
});
