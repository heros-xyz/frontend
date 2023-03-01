import { render } from "@testing-library/react";
import OtpFill from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <OtpFill
      title="OTP Verification"
      description="We've emailed an OTP to you. Please enter the code here."
      textButton="VERIFY"
      validTime={5}
    />
  );
  expect(container).toMatchSnapshot();
});
