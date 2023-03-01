import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Formik } from "formik";
import { Provider } from "react-redux";
import { store } from "@/store";
import AthleteProfileImageStep from "../ProfileImageStep";
import { FILE_FORMAT_MESSAGE } from "../constants";

describe("AthleteProfileImageStep", () => {
  it("should display error message for invalid file type", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        {" "}
        <Formik onSubmit={() => {}} initialValues={{ profileImage: "" }}>
          <AthleteProfileImageStep />
        </Formik>
      </Provider>
    );
    const input = getByTestId("file-input");
    const file = new File([], "test.pdf", { type: "application/pdf" });
    Object.defineProperty(input, "files", { value: [file] });
    fireEvent.change(input);
    const errorMessage = getByTestId("error-message");
    await waitFor(() => {
      expect(errorMessage).toHaveTextContent(FILE_FORMAT_MESSAGE);
    });
  });
});
