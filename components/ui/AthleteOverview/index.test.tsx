import { render } from "@testing-library/react";
import AthleteOverview from ".";

it("renders homepage unchanged", () => {
  const { container } = render(<AthleteOverview fans={"5"} money={"100000"} />);
  expect(container).toMatchSnapshot();
});
