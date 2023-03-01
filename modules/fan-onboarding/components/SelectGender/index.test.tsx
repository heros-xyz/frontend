import { render } from "@testing-library/react";
import SelectGender from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <SelectGender onSubmit={() => onChangeStep(4)} />
  );
  expect(container).toMatchSnapshot();
});
