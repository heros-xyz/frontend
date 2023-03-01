import { render } from "@testing-library/react";
import { Formik } from "formik";
import { Provider } from "react-redux";
import { store } from "@/store";
import SelectNationality from ".";

it("renders Select Nationality unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <Formik onSubmit={console.log} initialValues={{ nationality: "" }}>
        <SelectNationality onSubmit={console.log} />
      </Formik>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
