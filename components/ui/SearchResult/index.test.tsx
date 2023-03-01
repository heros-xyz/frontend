import { render } from "@testing-library/react";
import SearchResult from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <SearchResult
      data={[
        {
          id: 1,
          avatar:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
          name: "Matt Prior",
          medal: "Bronze Tier Subscribed",
          interaction: 105,
          fan: 5995,
        },
        {
          id: 2,
          avatar: "https://www.w3schools.com/howto/img_avatar2.png",
          name: "Mavis Breitenberg",
          medal: "Marathon",
          interaction: 15,
          fan: 1955,
        },
      ]}
    />
  );
  expect(container).toMatchSnapshot();
});
