import { render } from "@testing-library/react";
import ProfilePreview from "@/components/ProfilePreview";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/input-fields/Icons";

describe("ProfilePreview Component", () => {
  const mockProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "contact@example.com",
    description: "A passionate developer.",
    imageUrl: "/test/sample-image.webp",
  };

  const mockSocials = [
    { platform: "x", url: "twitter.com/johndoe", Icon: TwitterIcon },
    { platform: "linkedin", url: "linkedin.com/johndoe", Icon: LinkedInIcon },
    { platform: "github", url: "github.com/johndoe", Icon: GitHubIcon },
  ];

  it("should render correctly and match snapshot", () => {
    const { asFragment: profileFragment } = render(
      <ProfilePreview profile={mockProfile} socials={mockSocials} />,
    );

    expect(profileFragment()).toMatchSnapshot();
  });
});
