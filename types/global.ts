import type { ElementType } from "react";

export type ProfileProps = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  imageUrl: string | null;
};

export type SocialLink = {
  platform: string;
  url: string;
  Icon: ElementType;
};
