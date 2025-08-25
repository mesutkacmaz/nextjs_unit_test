import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "@/components/TextArea";
import Label from "@/components/Label";

// Mock the label component
jest.mock("@/components/Label", () => ({
  __esModule: true,
  default: jest.fn(({ htmlFor, label }) => (
    <label data-testid={`label-${htmlFor}`}>{label}</label>
  )),
}));

describe("TextArea Component", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders label, textarea, and placeholder correctly", () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value=""
        onChange={mockOnChange}
        placeholder="Tell us about yourself..."
      />,
    );

    expect(screen.getByTestId("label-description")).toHaveTextContent(
      "Description",
    );
    const textarea = screen.getByTestId("textarea-description");
    expect(textarea).toHaveAttribute("name", "description");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "Tell us about yourself...",
    );
    expect(textarea).toHaveValue("");
    expect(
      screen.queryByText(/Maximum.*words allowed/),
    ).not.toBeInTheDocument();
  });

  it("uses default placeholder when not provided", () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value=""
        onChange={mockOnChange}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "Full Stack Developer specializing in React and Node.js...",
    );
  });

  it("triggers onChange when typing within word limit", async () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value=""
        onChange={mockOnChange}
        maxWords={3}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    await userEvent.type(textarea, "I am awesome");

    expect(mockOnChange).toHaveBeenCalledTimes(12);
    expect(
      screen.queryByText(/Maximum 3 words allowed/),
    ).not.toBeInTheDocument();
  });

  it("shows error when word limit is exceeded", async () => {
    const user = userEvent.setup();
    render(
      <TextArea
        label="Description"
        name="description"
        value="This is a test"
        onChange={mockOnChange}
        maxWords={3}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    await user.type(textarea, "s"); // Adding a character to exceed the limit

    expect(await screen.findByText("Maximum 3 words allowed")).toBeInTheDocument();
  });

  it("shows error on blur when word limit is exceeded", async () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value="This is a test"
        onChange={mockOnChange}
        maxWords={3}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    fireEvent.blur(textarea);

    expect(await screen.findByText("Maximum 3 words allowed")).toBeInTheDocument();
  });

  it("clears error on blur when within word limit", () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value="I am"
        onChange={mockOnChange}
        maxWords={3}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    fireEvent.blur(textarea);

    expect(
      screen.queryByText("Maximum 3 words allowed"),
    ).not.toBeInTheDocument();
  });

  it("handles custom maxWords correctly", async () => {
    const user = userEvent.setup();
    render(
      <TextArea
        label="Description"
        name="description"
        value="This is a"
        onChange={mockOnChange}
        maxWords={2}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    await user.type(textarea, " test");

    expect(await screen.findByText("Maximum 2 words allowed")).toBeInTheDocument();
  });

  it("handles empty input correctly", async () => {
    render(
      <TextArea
        label="Description"
        name="description"
        value=""
        onChange={mockOnChange}
        maxWords={3}
      />,
    );

    const textarea = screen.getByTestId("textarea-description");
    await userEvent.type(textarea, "   "); // Whitespace only
    fireEvent.blur(textarea);

    expect(mockOnChange).toHaveBeenCalledTimes(3); // Three spaces
    expect(
      screen.queryByText("Maximum 3 words allowed"),
    ).not.toBeInTheDocument();
  });
});
