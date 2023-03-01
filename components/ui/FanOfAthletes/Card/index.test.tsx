import { render } from "@testing-library/react";
import YourAthleteCard from ".";

const item = {
  avatar: "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
  name: "Louise Peel",
  description: "Bronze Tier Subscribed.",
  joinedDate: "12/12/2002",
};

it("renders homepage unchanged", () => {
  const { container } = render(<YourAthleteCard item={item} />);
  expect(container).toMatchSnapshot();
});
