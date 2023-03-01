import { render } from "@testing-library/react";
import { HomeIcon, HomeActive } from "@/components/svg/Navigate";
import MenuItem from ".";

it("renders homepage unchanged", () => {
  const onClickItem = (id: string) => {
    return id;
  };

  const { container } = render(
    <MenuItem
      id="home"
      Icon={<HomeIcon />}
      isActive={false}
      itemName="Home"
      key="home"
      activeIcon={<HomeActive />}
      handleClickItem={onClickItem}
    />
  );
  expect(container).toMatchSnapshot();
});
