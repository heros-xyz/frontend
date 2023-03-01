import { render } from "@testing-library/react";
import Footer from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
