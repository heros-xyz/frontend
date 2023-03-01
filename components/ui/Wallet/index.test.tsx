import { render } from "@testing-library/react";
import Wallet from "./index";
it("renders Wallet unchanged", () => {
  const { container } = render(
    <Wallet title="Wallet" currentMoney={6.5} havePaymentMethod={true} feePrice={5} timeReceive={"20/10/2022"}/>
  );
  expect(container).toMatchSnapshot();
});
