import { render } from "@testing-library/react";
import Checklist from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Checklist
      type="career"
      title="Page Information"
      description="Make sure you paint a compelling picture of how they can join you on this journey."
      checked={true}
      responseType="hasPageInformation"
    />
  );
  expect(container).toMatchSnapshot();
});
