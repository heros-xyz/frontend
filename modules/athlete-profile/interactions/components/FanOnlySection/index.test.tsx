import { render } from "@testing-library/react";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import mockRouter from "next-router-mock";
import FanOnlySection from ".";

jest.mock("next/router", () => require("next-router-mock"));

it("renders Fan only section unchanged", () => {
  mockRouter.push("/initial-path");
  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <FanOnlySection />
    </QueryParamProvider>
  );
  expect(container).toMatchSnapshot();
});
