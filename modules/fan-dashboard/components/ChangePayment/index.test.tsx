import { Box } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import mockRouter from "next-router-mock";
import { store } from "@/store";
import ChangePayment from ".";

jest.mock("next/router", () => require("next-router-mock"));
describe("Change payment Page", () => {
  mockRouter.push("/path");
  it("renders homepage unchanged", () => {
    const { container } = render(
      <Provider store={store}>
        <Box minH="100vh" bg="primary">
          <ChangePayment idUpdate="" />
        </Box>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
