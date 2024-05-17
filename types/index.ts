// types/index.ts

import { PortableTextBlock } from "@portabletext/types";

export type ProfileType = {
  _id: string,
  fullName: string,
  headline: string,
  profileImage: {
    alt: string,
    image: string
  },
  shortBio: string,
  email: string,
  fullBio: PortableTextBlock[],
  location: string,
  resumeURL: string,
  socialLinks: {
    github: string,
    linkedin: string,
    twitter: string,
    twitch: string
  }[],
  skills: string[],
};
