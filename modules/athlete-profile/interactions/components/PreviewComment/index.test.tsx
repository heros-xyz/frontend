import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { PreviewComment } from ".";

it("renders preview interaction comment section unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <PreviewComment interactionId="" />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
