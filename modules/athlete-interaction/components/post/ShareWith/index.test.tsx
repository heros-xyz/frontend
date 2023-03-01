import { render } from "@testing-library/react";
import { Formik } from "formik";
import ShareWith from ".";

it("renders Enter Post Content Story unchanged", () => {
  const { container } = render(
    <Formik
      onSubmit={console.log}
      initialValues={{
        shareWith: true,
        earlyAccess: true,
        publicDate: "2023-11-11",
        publicTime: "12:12",
      }}
    >
      <ShareWith />
    </Formik>
  );
  expect(container).toMatchSnapshot();
});
