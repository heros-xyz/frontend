import { render } from "@testing-library/react";
import Payment from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(<Payment onSubmit={() => onChangeStep(2)} />);
  expect(container).toMatchSnapshot();
});
