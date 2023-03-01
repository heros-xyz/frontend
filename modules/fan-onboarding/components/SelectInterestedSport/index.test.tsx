import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import SelectInterestedSport from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <Provider store={store}>
      {" "}
      <SelectInterestedSport onSubmit={() => onChangeStep(6)} />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
