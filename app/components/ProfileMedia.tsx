// app/components/ProfileMedia.tsx

import Image from "next/image";
import type { ProfileType } from "@/types";

type Props = {
  profile: ProfileType;
  className: string;
  width: number;
  height: number;
  sizes?: string;
};

// Shows the profile video or GIF when one is uploaded, otherwise the profile image.
export default function ProfileMedia({ profile, className, width, height, sizes }: Props) {
  const media = profile.profileMedia;

  if (media?.url && media.mimeType.startsWith("video/")) {
    return (
      <video
        className={className}
        src={media.url}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt || profile.profileImage.alt}
      />
    );
  }

  if (media?.url && media.mimeType === "image/gif") {
    return (
      <Image
        className={className}
        src={media.url}
        width={width}
        height={height}
        unoptimized // keep the GIF animated
        alt={media.alt || profile.profileImage.alt}
      />
    );
  }

  return (
    <Image
      className={className}
      src={profile.profileImage.image}
      width={width}
      height={height}
      sizes={sizes}
      quality={100}
      alt={profile.profileImage.alt}
    />
  );
}
