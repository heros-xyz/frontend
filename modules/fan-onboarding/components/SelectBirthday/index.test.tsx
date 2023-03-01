import { render } from "@testing-library/react";
import SelectBirthday from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <SelectBirthday
      initialValues={{ dateOfBirth: "10/10/2012" }}
      onSubmit={() => onChangeStep(3)}
    />
  );
  expect(container).toMatchSnapshot();
});
