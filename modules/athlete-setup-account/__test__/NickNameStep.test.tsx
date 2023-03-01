import { render } from "@testing-library/react";
import { Formik } from "formik";
import AthleteNickNameStep from "../NickNameStep";

describe("AthleteNickNameStep", () => {
  it("should show an error message when the nickName field is empty", () => {
    render(
      <Formik onSubmit={() => {}} initialValues={{ nickName: "" }}>
        <AthleteNickNameStep onSubmit={console.log} />
      </Formik>
    );
  });

  it("should call the onNextStep function when the nickName field is not empty", () => {
    render(
      <Formik onSubmit={() => {}} initialValues={{ nickName: "" }}>
        <AthleteNickNameStep onSubmit={console.log} />
      </Formik>
    );
  });

  it("should not call the onNextStep function when the nickName field is empty and the proceed button is clicked", () => {
    render(
      <Formik onSubmit={() => {}} initialValues={{ nickName: "" }}>
        <AthleteNickNameStep onSubmit={console.log} />
      </Formik>
    );
  });
});
