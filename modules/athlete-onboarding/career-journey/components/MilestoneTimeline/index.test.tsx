import { render } from "@testing-library/react";
import TimeLineJourney from "@/components/ui/Timeline";
import { timelineItems } from "@/utils/mock";
import MilestoneTimeline from ".";

it("renders Milestone Timeline unchanged", () => {
  const { container } = render(
    <MilestoneTimeline onSubmit={console.log}>
      <TimeLineJourney
        w="100%"
        bgColor={"secondary"}
        isAddJourney={true}
        items={timelineItems}
        handleClickAdd={console.log}
      />
    </MilestoneTimeline>
  );
  expect(container).toMatchSnapshot();
});
