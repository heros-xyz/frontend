import { Box } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import Card from "./index";

const dataCurrent = {
  title: "Join England Club",
  description: "I became the best new player on team",
  from: "10/01/2022",
  to: "10/24/2022",
  isArchive: true,
  isCurrent: true,
};
const data = {
  title: "Join England Club",
  description: "I became the best new player on team",
  from: "10/24/2022",
  isArchive: true,
  isCurrent: false,
};

it("renders homepage unchanged", () => {
  const { container } = render(
    <Box>
      <Card item={data} />
      <Card item={dataCurrent} />
    </Box>
  );
  expect(container).toMatchSnapshot();
});
