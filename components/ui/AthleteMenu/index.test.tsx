import { render } from "@testing-library/react";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import AthleteMenu from ".";

const menuList = [
  {
    id: "edit",
    itemName: "Edit",
    Icon: <EditIcon />,
  },
  {
    id: "delete",
    itemName: "Delete",
    Icon: <DeleteIcon />,
  },
];

it("renders homepage unchanged", () => {
  const onClickItem = () => {};
  const { container } = render(
    <AthleteMenu menuList={menuList} onClickItem={onClickItem} />
  );
  expect(container).toMatchSnapshot();
});
