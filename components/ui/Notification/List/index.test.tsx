import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { notiList } from "@/utils/mock";
import { store } from "@/store";
import NotificationList from "./index";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <NotificationList items={notiList ?? []} periodTitle="Today" />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
