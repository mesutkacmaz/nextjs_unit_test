import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageUpload } from "@/components/ImageUpload";

// Mock the Label component as it's an external dependency
jest.mock("@/components/Label", () => {
  return ({ label }) => <div>{label}</div>;
});

describe("ImageUpload", () => {
  const mockHandleChange = jest.fn();

  it("renders correctly with initial state", () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    expect(screen.getByText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Only one image can be uploaded/i),
    ).not.toBeInTheDocument();
  });

  it("calls handleChange with the correct file when a file is selected", () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file = new File(["dummy content"], "profile.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("file-upload");
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          files: expect.arrayContaining([file]),
        }),
      }),
    );
  });

  it("calls handleChange when a single valid file is dropped", () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file = new File(["dummy content"], "profile.jpg", {
      type: "image/jpeg",
    });
    const dataTransfer = { files: [file] };
    const dropZone = screen.getByText(/Click to upload/i).closest("div");

    if (dropZone) {
      fireEvent.drop(dropZone, { dataTransfer });
    }

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("displays an error message when multiple files are dropped", () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file1 = new File(["file1 content"], "file1.png", {
      type: "image/png",
    });
    const file2 = new File(["file2 content"], "file2.jpg", {
      type: "image/jpeg",
    });
    const dataTransfer = { files: [file1, file2] };

    const dropZone = screen.getByText(/Click to upload/i).closest("div");

    if (dropZone) {
      fireEvent.drop(dropZone, { dataTransfer });
    }

    expect(
      screen.getByText(/Only one image can be uploaded/i),
    ).toBeInTheDocument();
    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it("changes style on drag enter and drag leave events", () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    // Navigate up two levels to find the correct drop zone element.
    // const dropZone = screen
    //   .getByText(/Click to upload/i)
    //   .closest("label").parentElement;

    const dropZone = screen.getByTestId("drop-zone");

    if (dropZone) {
      fireEvent.dragEnter(dropZone);
      expect(dropZone).toHaveClass("bg-gray-600 border-cyan-500");

      fireEvent.dragLeave(dropZone);
      expect(dropZone).toHaveClass("bg-gray-700 hover:bg-gray-600");
    }
  });
});
