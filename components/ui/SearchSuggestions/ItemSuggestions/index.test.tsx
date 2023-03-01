import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import ItemSuggestions from ".";

jest.mock("next/router", () => require("next-router-mock"));

it("renders ItemSuggestions unchanged", () => {
  mockRouter.push("/");
  const { container } = render(
    <ItemSuggestions
      item={{
        id: "123",
        avatar: "",
        fullName: "Mavis Breitenberg",
        sport: "Marathon",
      }}
      onClick={() => {}}
    />
  );
  expect(container).toMatchSnapshot();
});
