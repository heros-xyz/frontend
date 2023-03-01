import { render } from "@testing-library/react";
import { MemberConfirmedIcon } from "@/components/svg/MemberCofirmedIcon";
import MemberConfirmed from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <MemberConfirmed
      title="Membership Confirmed"
      Icon={<MemberConfirmedIcon />}
      description="You are now a fan of Matt Prior! Get started by exploring the benefits that come with your membership."
      textButton="back to athlete profile"
      onConfirmed={() => console.log("confirmed")}
    />
  );
  expect(container).toMatchSnapshot();
});
