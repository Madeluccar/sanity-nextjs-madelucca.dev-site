import type { Metadata } from "next";
import CvUnavailable from "../components/CvUnavailable";

export const metadata: Metadata = {
  title: "CV update coming soon | Madelucca Dev",
  robots: { index: false, follow: true },
};

export default function Resume() {
  return <CvUnavailable />;
}
