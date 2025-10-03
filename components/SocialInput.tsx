import type { FC, ElementType } from "react";
import Label from "./Label";

export interface SocialLink {
  platform: string;
  url: string;
  Icon: ElementType;
}

interface SocialFieldsProps {
  socials: SocialLink[];
  onChange: (index: number, value: string) => void;
}

export const SocialFields: FC<SocialFieldsProps> = ({ socials, onChange }) => {
  return (
    <div>
      <Label htmlFor="description" label="Social Links" />

      <div className="space-y-3">
        {socials.map((social, index) => (
          <div key={social.platform} className="flex items-center gap-3">
            <social.Icon className="h-6 w-6 text-gray-500" />
            <input
              type="url"
              value={social.url}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={`https://www.${social.platform}.com/username`}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
