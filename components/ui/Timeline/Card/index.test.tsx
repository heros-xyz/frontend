import { Box } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import Card from "./index";

const dataCurrent = {
  title: "Join “Jaworznickie Stowarzyszenie Piłkarskie Szczakowianka Club",
  description:
    "I became the best new player on team I became the best new player on team I became the best new player on team I became the best new player on team",
  startDate: "10/01/2022",
  endDate: "10/24/2022",
  isPeriodDate: true,
  icon: "FLAG",
};
const data = {
  title: "Join “Jaworznickie Stowarzyszenie Piłkarskie Szczakowianka Club",
  description:
    "I became the best new player on team I became the best new player on team I became the best new player on team I became the best new player on team",
  startDate: "10/01/2022",
  endDate: "10/24/2022",
  isPeriodDate: true,
  icon: "FLAG",
};
it("renders homepage unchanged", () => {
  const { container } = render(
    <Box>
      <Card item={data} isCurrent={true} />
      <Card item={dataCurrent} isCurrent={false} />
    </Box>
  );
  expect(container).toMatchSnapshot();
});
