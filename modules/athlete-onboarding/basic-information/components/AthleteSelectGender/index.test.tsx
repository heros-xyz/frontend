import { render } from "@testing-library/react";
import { Formik } from "formik";
import AthleteSelectGender from ".";

it("renders Athlete Select Gender unchanged", () => {
  const { container } = render(
    <Formik onSubmit={console.log} initialValues={{ gender: "" }}>
      <AthleteSelectGender onSubmit={console.log} />
    </Formik>
  );
  expect(container).toMatchSnapshot();
});
