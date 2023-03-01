import { render } from "@testing-library/react";
import React from "react";
import Calendar from "@/components/svg/Calendar";
import Users from "@/components/svg/Users";
import ViewBoard from "@/components/svg/ViewBoard";
import ViewList from "@/components/svg/ViewList";
import AthleteBenefits from "./index";

it("renders athlete benefits unchanged", () => {
  const AthleteBenefitsMockData = [
    {
      title: "Benefit No.1",
      content:
        "Nunc a, lacinia sed risus neque, arcu, rhoncus. Id mauris justo facilisis aliquam platea vestibulum condimentum morbi.",
      icon: <ViewList />,
    },
    {
      title: "Benefit No.2",
      content:
        "Purus lobortis volutpat posuere id integer nunc tellus. Non mauris malesuada feugiat massa mi pellentesque cum est. Pharetra a varius urna rhoncus, tempor rutrum.",
      icon: <ViewBoard />,
    },
    {
      title: "Benefit No.3",
      content:
        "Purus lobortis volutpat posuere id integer nunc tellus. Non mauris malesuada feugiat massa mi pellentesque cum est. Pharetra a varius urna rhoncus, tempor rutrum.",
      icon: <Calendar />,
    },
    {
      title: "Benefit No.4",
      content:
        "Tincidunt sollicitudin interdum nunc sit risus at bibendum vitae. Urna, quam ut sit justo non, consectetur et varius.",
      icon: <Users />,
    },
  ];
  const { container } = render(
    <AthleteBenefits
      title="athletes’ benefits"
      description="Get yourself an opportunity to earn money and interact with your fans at the same time!"
      features={AthleteBenefitsMockData}
    />
  );
  expect(container).toMatchSnapshot();
});
