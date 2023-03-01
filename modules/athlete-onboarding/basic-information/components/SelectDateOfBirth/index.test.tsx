import { render } from "@testing-library/react";
import { Formik } from "formik";
import SelectDateOfBirth from ".";

it("renders Select Date Of Birth unchanged", () => {
  const { container } = render(
    <Formik onSubmit={console.log} initialValues={{ dateOfBirth: "" }}>
      <SelectDateOfBirth onSubmit={console.log} />
    </Formik>
  );
  expect(container).toMatchSnapshot();
});
