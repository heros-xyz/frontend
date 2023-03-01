import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AddTier from ".";

jest.mock("next/router", () => require("next-router-mock"));

describe("Change payment Page", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(
      <Provider store={store}>
        <AddTier
          onBack={() => {
            console.log("Back");
          }}
          listBenefit={[]}
          title="Add Tier"
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
