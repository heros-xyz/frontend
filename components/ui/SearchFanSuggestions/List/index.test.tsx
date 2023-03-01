import { render } from "@testing-library/react";
import SearchFanSuggestionsList from ".";

it("renders List unchanged", () => {
  const onShowAllResult = () => {};

  const { container } = render(
    <SearchFanSuggestionsList
      buttonName="See all results"
      items={[
        {
          avatar: "",
          fullName: "Matt Prior",
          description: "----",
          createdAt: "2023-11-11",
          id: "1",
          email: "abcxyz@gmail.com",
        },
        {
          avatar: "",
          fullName: "Matt Prior",
          description: "----",
          createdAt: "2023-11-11",
          id: "2",
          email: "abcxyz@gmail.com",
        },
        {
          avatar: "",
          fullName: "Matt Prior",
          description: "----",
          createdAt: "2023-11-11",
          id: "3",
          email: "abcxyz@gmail.com",
        },
      ]}
      onShowAllResult={onShowAllResult}
    />
  );
  expect(container).toMatchSnapshot();
});
