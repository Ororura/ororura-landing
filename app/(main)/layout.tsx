import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css";

const openSans = Open_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Ororura",
  description: "Ororura's card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>{children}</body>
    </html>
  );
}
