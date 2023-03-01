import { render } from "@testing-library/react";
import MyStory from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<MyStory description="" dob="" gender="" />);
  expect(container).toMatchSnapshot();
});
