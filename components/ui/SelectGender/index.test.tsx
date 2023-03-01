import { render } from "@testing-library/react";
import SelectGender from ".";

it("renders select gender unchanged", () => {
  const { container } = render(
    <SelectGender onChange={console.log} value="null" />
  );
  expect(container).toMatchSnapshot();
});
