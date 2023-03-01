import { render } from "@testing-library/react";
import { Menu } from "@/components/svg/Menu";
import Benefit from "../index";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Benefit Icon={<Menu />} title="dsdsd" description="fdfdf" />
  );
  expect(container).toMatchSnapshot();
});
