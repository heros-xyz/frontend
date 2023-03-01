import { render } from "@testing-library/react";
import DateSelect from ".";

it("renders Date Select unchanged", () => {
  const { container } = render(
    <DateSelect submitted={false} date={null} onSubmit={console.log} />
  );
  expect(container).toMatchSnapshot();
});
