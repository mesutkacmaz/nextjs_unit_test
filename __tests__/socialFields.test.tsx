import { SocialFields } from "@/components/input-fields/SocialFields";
import { useState } from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { SocialLink } from "@/types/global";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/input-fields/Icons";

export default function TestWrapper({
  initialSocials,
}: {
  initialSocials: SocialLink[];
}) {
  const [socials, setSocials] = useState(initialSocials);

  const onSocialChange = (index: number, value: string) => {
    setSocials((prevSocials) =>
      prevSocials.map((social, i) =>
        i === index ? { ...social, url: value } : social,
      ),
    );
  };

  return <SocialFields socials={socials} onChange={onSocialChange} />;
}

describe("SocialFields Component", () => {
  const user = userEvent.setup();

  const mockSocials = [
    { platform: "x", url: "", Icon: TwitterIcon },
    { platform: "linkedin", url: "", Icon: LinkedInIcon },
    { platform: "github", url: "", Icon: GitHubIcon },
  ];

  it("should show an error message for an invalid URL immediately", async () => {
    render(<TestWrapper initialSocials={mockSocials} />);

    const linkedInInput = screen.getByPlaceholderText(
      /linkedin\.com\/username/i,
    );

    await user.type(linkedInInput, "github.com/invalid-url");

    expect(
      screen.getByText(/Please enter a valid linkedin URL/i),
    ).toBeInTheDocument();
  });

  it("should clear error when valid URL is entered", async () => {
    render(<TestWrapper initialSocials={mockSocials} />);

    const linkedInInput = screen.getByPlaceholderText(
      /linkedin\.com\/username/i,
    );

    await user.type(linkedInInput, "github.com/invalid-url");
    expect(
      screen.getByText(/Please enter a valid linkedin URL/i),
    ).toBeInTheDocument();

    await user.clear(linkedInInput);
    await user.type(linkedInInput, "linkedin.com/mesut");

    expect(
      screen.queryByText(/Please enter a valid linkedin URL/i),
    ).not.toBeInTheDocument();
  });

  it("should not show an error for empty input", async () => {
    render(<TestWrapper initialSocials={mockSocials} />);

    const linkedInInput = screen.getByPlaceholderText(
      /linkedin\.com\/username/i,
    );

    await user.type(linkedInInput, "github.com/invalid-url");
    expect(
      screen.getByText(/Please enter a valid linkedin URL/i),
    ).toBeInTheDocument();

    await user.clear(linkedInInput);

    expect(
      screen.queryByText(/Please enter a valid linkedin URL/i),
    ).not.toBeInTheDocument();
  });
});
