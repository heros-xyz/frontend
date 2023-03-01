import { render } from "@testing-library/react";
import AuthTemplate from ".";

it("renders homepage unchanged", () => {
  const onSubmit = (val: string) => {
    console.log(val);
  };
  const { container } = render(
    <AuthTemplate pageType="athlete" onSubmitForm={onSubmit} />
  );
  expect(container).toMatchSnapshot();
});
