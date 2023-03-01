import { render } from "@testing-library/react";
import { UploadIcon } from "@/components/svg/UploadIcon";
import FileUpload from ".";

describe("FileUpload", () => {
  it("renders file upload", () => {
    const onChange = jest.fn();
    const { container } = render(
      <FileUpload
        text={"upload image"}
        icon={<UploadIcon />}
        onChange={onChange}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
