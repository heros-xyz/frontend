import { render } from "@testing-library/react";
import AthleteInfo from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <AthleteInfo
      imagePath="/images/heros.png"
      athleteName="Penguin"
      publishDate="01/01/2020"
    />
  );
  expect(container).toMatchSnapshot();
});
