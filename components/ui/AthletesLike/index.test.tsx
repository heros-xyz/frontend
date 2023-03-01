import { render } from "@testing-library/react";
import AthletesLike from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <AthletesLike
      title="hehe"
      data={[
        {
          id: "1",
          avatar:
            "https://images.pexels.com/photos/127160/pexels-photo-127160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          fullName: "Athlete Name 1",
          createdAt: "",
          sport: "",
        },
      ]}
      onClick={() => console.log("test")}
    />
  );
  expect(container).toMatchSnapshot();
});
