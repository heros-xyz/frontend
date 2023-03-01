import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import SearchSuggestionsList from ".";
jest.mock("next/router", () => require("next-router-mock"));

it("renders List unchanged", () => {
  mockRouter.push("/initial-path");
  const onShowAllResult = () => {};
  const { container } = render(
    <SearchSuggestionsList
      onClick={() => {}}
      buttonName="See all results"
      items={[
        {
          id: "123",
          avatar: "",
          fullName: "Matt Prior",
          sport: "Cricket",
          sourceSubscriptionsTotal: 10,
        },
        {
          id: "123",
          avatar: "",
          fullName: "Mavis Breitenberg",
          sport: "Marathon",
          sourceSubscriptionsTotal: 10,
        },
        {
          id: "123",
          avatar: "",
          fullName: "Marcus Mariota",
          sport: "Football",
          sourceSubscriptionsTotal: 10,
        },
        {
          id: "123",
          avatar: "",
          fullName: "Marshall Eriksen",
          sport: "Surfing",
          sourceSubscriptionsTotal: 10,
        },
      ]}
      onShowAllResult={onShowAllResult}
    />
  );
  expect(container).toMatchSnapshot();
});
