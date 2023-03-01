import { render } from "@testing-library/react";
import AddMilestone from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {
    console.log("test", step);
  };
  const { container } = render(
    <AddMilestone onSubmit={() => onChangeStep(2)} />
  );
  expect(container).toMatchSnapshot();
});
