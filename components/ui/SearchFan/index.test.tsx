import { render } from "@testing-library/react";
import { ChangeEvent } from "react";
import SearchFan from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <SearchFan
      placeholder="Search Fans"
      handleChange={(e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      }}
    />
  );
  expect(container).toMatchSnapshot();
});
