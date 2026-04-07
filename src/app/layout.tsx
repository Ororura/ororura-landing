import type { ReactNode } from "react";

import type { Metadata } from "next";
import { cookies } from "next/headers";

import {
  ARCHIVE_LOCALE_COOKIE_KEY,
  ArchiveLocaleProvider,
  resolveArchiveLocale
} from "@/shared/lib/use-archive-locale";
import "./globals.css";

const metadata: Metadata = {
  title: "Ororura Archive",
  description: "Ritual entry gate for a faceless software engineer archive."
};

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const cookieStore = await cookies();
  const initialLocale = resolveArchiveLocale(cookieStore.get(ARCHIVE_LOCALE_COOKIE_KEY)?.value);

  return (
    <html lang={initialLocale}>
      <body>
        <ArchiveLocaleProvider initialLocale={initialLocale}>{children}</ArchiveLocaleProvider>
      </body>
    </html>
  );
};

export { metadata };
export { RootLayout as default };
