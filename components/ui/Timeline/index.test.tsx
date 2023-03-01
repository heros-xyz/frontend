import { render } from "@testing-library/react";
import { timelineItems } from "@/utils/mock";
import TimeLine from "./index";

it("renders homepage unchanged", () => {
  const { container } = render(
    <TimeLine isAddJourney bgColor={"primary"} items={timelineItems} />
  );
  expect(container).toMatchSnapshot();
});
