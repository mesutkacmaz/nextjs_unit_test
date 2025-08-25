"use client";

import { useState } from "react";
import { GitHubIcon, TwitterIcon, LinkedInIcon } from "@/components/Icons";

import { InputField } from "@/components/InputField";
import { ImageUpload } from "@/components/ImageUpload";
import { TextArea } from "@/components/TextArea";
import { SocialFields } from "@/components/SocialInput";
import { ProfilePreview } from "@/components/ProfilePreview";
import { ProfileProps } from "@/types/global";

export default function ProfileCreatorPage() {
  const [profile, setProfile] = useState<ProfileProps>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@me.com",
    description: "",
    imageUrl: null,
  });
  const [socials, setSocials] = useState([
    { platform: "github", url: "", Icon: GitHubIcon },
    { platform: "twitter", url: "", Icon: TwitterIcon },
    { platform: "linkedin", url: "", Icon: LinkedInIcon },
  ]);

  // Handler for image file selection
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSocialChange = (index: number, value: string) => {
    const newSocials = [...socials];
    newSocials[index].url = value;
    setSocials(newSocials);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl backdrop-blur-lg bg-emerald-500/10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 border border-white/20 rounded-xl overflow-hidden">
        {/* --- LEFT SIDE: INPUT FORM --- */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-cyan-400">
            Profile Details
          </h1>
          <div className="space-y-6">
            {/* Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                placeholder="John"
                required={true}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required={true}
              />
            </div>
            <InputField
              label="Email Address"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required={true}
            />

            {/* Image Upload */}
            <div>
              <ImageUpload handleChange={handleImageChange} />
            </div>

            {/* Description */}
            <div>
              <TextArea
                label="Description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                placeholder="Full Stack Developer specializing in React and Node.js..."
              />
            </div>

            {/* Social Links */}
            <div>
              <SocialFields socials={socials} onChange={handleSocialChange} />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: LIVE PROFILE PREVIEW --- */}
        <div className="flex items-center justify-center p-4">
          <ProfilePreview profile={profile} socials={socials} />
        </div>
      </div>
    </main>
  );
}
