import { render } from "@testing-library/react";
import FanStayUpToDate from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <FanStayUpToDate
      data={[
        {
          id: 1,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Lionel_Messi_vs_Valladolid_3.jpg/250px-Lionel_Messi_vs_Valladolid_3.jpg",
          interaction: 20,
          name: "Messi",
        },
        {
          id: 2,
          image:
            "https://media.alobacsi.com/Images/Uploaded/Share/2016/11/21/de0Huyet-ap-cua-van-dong-vien-14080-co-duoc-xem-la-cao.jpg",
          interaction: 30,
          name: "Thomas",
        },
      ]}
    />
  );
  expect(container).toMatchSnapshot();
});
