import { render } from "@testing-library/react";
import Bronze from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Bronze
      title="Bronze"
      description="Join my journey on a daily basis!"
      price={5}
      fan={20}
      benefit={[
        { id: 1, value: "Exclusive access to posts" },
        { id: 2, value: "Access to Fan Community Chats" },
      ]}
      checked={true}
    />
  );
  expect(container).toMatchSnapshot();
});
