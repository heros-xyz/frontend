import { render } from "@testing-library/react";
import Membership from "./index";
it("renders membership unchanged", () => {
  const { container } = render(
    <Membership title="Membership" tier={1} isMembership={true} />
  );
  expect(container).toMatchSnapshot();
});
