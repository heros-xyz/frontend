import { render } from "@testing-library/react";
import ItemSuggestionsFan from ".";

it("renders List unchanged", () => {
  const { container } = render(
    <ItemSuggestionsFan
      item={{
        avatar: "",
        fullName: "Matt Prior",
        description: "----",
        createdAt: "2023-11-11",
        id: "1",
        email: "abcxyz@gmail.com",
      }}
    />
  );
  expect(container).toMatchSnapshot();
});
