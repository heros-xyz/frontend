import { render } from "@testing-library/react";
import Delete from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Delete
      message="This action cannot be undone. Are you sure you want to delete this interaction?"
      confirm="yes, delete Interaction"
      cancel="Cancel"
      onCancel={() => console.log("cancel")}
      onSubmit={() => console.log("submit")}
    />
  );
  expect(container).toMatchSnapshot();
});
