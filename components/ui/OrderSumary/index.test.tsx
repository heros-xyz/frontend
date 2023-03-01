import { render } from "@testing-library/react";
import OrderSummary from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <OrderSummary
      userName="Matt Prior"
      tier="Bronze tier"
      payment="$5.00"
      dateRenew="22 Jan 2023"
    />
  );
  expect(container).toMatchSnapshot();
});
