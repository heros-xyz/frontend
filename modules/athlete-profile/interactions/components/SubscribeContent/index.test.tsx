import { render } from "@testing-library/react";
import SubscribeContent from ".";

it("renders subscribe content section unchanged", () => {
  const { container } = render(<SubscribeContent />);
  expect(container).toMatchSnapshot();
});
