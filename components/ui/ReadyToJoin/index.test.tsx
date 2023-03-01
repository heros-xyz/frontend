import { render } from "@testing-library/react";
import ReadyToJoin from ".";
import { mock } from "./mock";

it("renders ReadyToJoin unchanged", () => {
  const { container } = render(<ReadyToJoin {...mock} />);
  expect(container).toMatchSnapshot();
});
