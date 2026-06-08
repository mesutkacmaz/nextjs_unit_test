import { TextArea } from "@/components/input-fields/TextArea";
import { useState } from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

type TestWrapperProps = {
  initialValue: string;
  maxWords?: number;
};

export default function TestWrapper({
  initialValue,
  maxWords,
}: TestWrapperProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  return (
    <TextArea
      label="Description"
      name="description"
      value={value}
      onChange={handleChange}
      maxWords={maxWords}
    />
  );
}

describe("TextArea Component", () => {
  it("updates value and does not show error when typing within word limit", async () => {
    const user = userEvent.setup();

    render(<TestWrapper initialValue="" maxWords={10} />);

    const textarea = screen.getByRole("textbox");

    const userInput = "I'm a full-stack developer";

    await user.type(textarea, userInput);

    expect(textarea).toHaveValue(userInput);
    expect(
      screen.queryByText(/Maximum 10 words allowed/),
    ).not.toBeInTheDocument();
  });

  it("clears the error message when the word count becomes valid", async () => {
    const MAX_WORDS = 10;
    const user = userEvent.setup();

    render(<TestWrapper initialValue="" maxWords={MAX_WORDS} />);

    const textarea = screen.getByRole("textbox");

    // 1. Type the text that exceeds the limit
    const invalidUserInput =
      "I'm a full-stack developer and I'm the best developer out there";
    await user.type(textarea, invalidUserInput);

    const errorElement = await screen.findByText(
      `Maximum ${MAX_WORDS} words allowed`,
    );
    expect(errorElement).toBeInTheDocument();

    // 2. Change the value to be within the limit
    const validUserInput = "I'm a full-stack developer";
    await user.clear(textarea);
    await user.type(textarea, validUserInput);

    expect(
      screen.queryByText(`Maximum ${MAX_WORDS} words allowed`),
    ).not.toBeInTheDocument();
  });
});
