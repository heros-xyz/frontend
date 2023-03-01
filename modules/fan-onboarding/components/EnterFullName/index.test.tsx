import { render } from "@testing-library/react";
import EnterFullName from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <EnterFullName onSubmit={() => onChangeStep(2)} />
  );
  expect(container).toMatchSnapshot();
});
