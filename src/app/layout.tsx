import type { ReactNode } from "react";

import type { Metadata } from "next";
import "./globals.css";

const metadata: Metadata = {
  title: "Ororura Archive",
  description: "Ritual entry gate for a faceless software engineer archive."
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export { metadata };
export { RootLayout as default };
