import { render } from "@testing-library/react";
import YourAthletesList from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <YourAthletesList
      atheleList={[
        {
          avatar:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
          name: "Matt Prior",
          description: " Bronze Tier Subscribed",
          joinedDate: "22/12/2022",
        },
        {
          avatar:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
          name: "Matt Prior",
          description: " Bronze Tier Subscribed",
          joinedDate: "22/12/2022",
        },
        {
          avatar:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
          name: "Matt Prior",
          description: " Bronze Tier Subscribed",
          joinedDate: "22/12/2022",
        },
        {
          avatar:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-370-4ddddd56322.png",
          name: "Matt Prior",
          description: " Bronze Tier Subscribed",
          joinedDate: "22/12/2022",
        },
      ]}
    />
  );
  expect(container).toMatchSnapshot();
});
