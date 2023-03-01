import { render } from "@testing-library/react";
import SignUpSuccess from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <SignUpSuccess
      title="Authentication Link Sent"
      description="We’ve sent an authentication link to your email. Click the link to verify your sign in."
      textButton="resend link"
    />
  );
  expect(container).toMatchSnapshot();
});
