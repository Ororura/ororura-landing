import type { Metadata } from "next";

import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "@react95/icons/icons.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Egor.exe",
  description: "Personal website of Egor — Java Backend Developer",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
