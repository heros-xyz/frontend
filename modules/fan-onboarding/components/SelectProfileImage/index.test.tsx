import { render } from "@testing-library/react";
import SelectProfileImage from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <SelectProfileImage onSubmit={() => onChangeStep(5)} />
  );
  expect(container).toMatchSnapshot();
});
