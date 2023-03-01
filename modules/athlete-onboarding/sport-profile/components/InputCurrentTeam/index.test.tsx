import { render } from "@testing-library/react";
import InputCurrentTeam from ".";

it("renders add Input Current Team unchanged", () => {
  const { container } = render(<InputCurrentTeam />);
  expect(container).toMatchSnapshot();
});
