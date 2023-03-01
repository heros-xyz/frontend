import { render } from "@testing-library/react";
import FanOnlySection from ".";

it("renders Fan only section unchanged", () => {
  const { container } = render(<FanOnlySection />);
  expect(container).toMatchSnapshot();
});
