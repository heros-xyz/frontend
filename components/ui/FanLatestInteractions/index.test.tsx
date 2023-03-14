import { render } from "@testing-library/react";
import FanLatestInteractions from ".";

it("renders FanLatestInteractions unchanged", () => {
  const { container } = render(
    <FanLatestInteractions
      items={[
        {
          id: "1",
          content: "123",
          user: {
            id: "1234",
            avatar: "123124",
          },
          interactionMedia: [],
        },
        {
          id: "1",
          content: "123",
          user: {
            id: "1234",
            avatar: "123124",
          },
          interactionMedia: [],
        },
      ]}
      titleHeading="Latest interactions"
      actionText="view all"
    />
  );
  expect(container).toMatchSnapshot();
});
