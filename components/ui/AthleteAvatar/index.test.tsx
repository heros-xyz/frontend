import { render } from "@testing-library/react";
import AthleteAvatar from ".";

it("renders avatar unchanged", () => {
  const { container } = render(
    <AthleteAvatar
      imageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
      name="John Smith"
      isRecommend={false}
    />
  );
  expect(container).toMatchSnapshot();
});

it("renders avatar recommend", () => {
  const { container } = render(
    <AthleteAvatar
      imageUrl="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
      name="John Smith"
      isRecommend={true}
    />
  );
  expect(container).toMatchSnapshot();
});
