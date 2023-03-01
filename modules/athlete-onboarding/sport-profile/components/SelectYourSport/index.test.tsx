import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import SelectYourSport from ".";

it("renders add Select Your Sport unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <SelectYourSport onSubmit={console.log} />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
