import { render } from "@testing-library/react";
import AthleteFanSettings from ".";

it("renders AthleteFanSettings unchanged", () => {
  const { container } = render(
    <AthleteFanSettings
      name="Tatum Miller"
      email="tatummiller@gmail.com"
      type="FAN"
      isLoginWithGoogle
      isLoginWithFacebook
    />
  );
  expect(container).toMatchSnapshot();
});
