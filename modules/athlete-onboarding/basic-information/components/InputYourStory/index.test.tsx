import { render } from "@testing-library/react";
import { Formik } from "formik";
import InputYourStory from ".";

it("renders Input Your Story unchanged", () => {
  const { container } = render(
    <Formik onSubmit={console.log} initialValues={{ story: "" }}>
      <InputYourStory onSubmit={console.log} />
    </Formik>
  );
  expect(container).toMatchSnapshot();
});
