import { Box } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AddPayment from ".";

it("renders homepage unchanged", () => {
  const onChangeStep = (step: number) => {};
  const { container } = render(
    <Provider store={store}>
      <Box minH="100vh" bg="primary">
        <AddPayment onSubmit={() => onChangeStep(2)} />
      </Box>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
