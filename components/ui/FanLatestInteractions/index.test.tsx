import { render } from "@testing-library/react";
import FanLatestInteractions from ".";

it("renders FanLatestInteractions unchanged", () => {
  const { container } = render(
    <FanLatestInteractions
      items={[
        {
          image: "/images/athletes.png",
          imageThumb: "/images/small_img_athletes.png",
        },
        {
          image: "",
          imageThumb: "/images/small_img_athletes.png",
        },
        {
          image: "/images/athletes.png",
          imageThumb: "/images/small_img_athletes.png",
        },
      ]}
      titleHeading="Latest interactions"
      actionText="view all"
    />
  );
  expect(container).toMatchSnapshot();
});
