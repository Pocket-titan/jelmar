import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

export const wotfard = localFont({
  src: "../../public/fonts/wotfard-regular-webfont.woff2",
  style: "normal",
  display: "swap",
  variable: "--font-family",
});

export const firaCode = localFont({
  src: "../../public/fonts/FiraCode-VF.woff2",
  display: "swap",
  variable: "--font-monospace",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  style: ["normal"],
  subsets: ["latin-ext"],
  display: "swap",
});
