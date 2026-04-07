"use client";

import { createContext, type FC, useContext } from "react";

import type { ReactNode } from "react";

import type { Locale } from "@/shared/config";

const ArchiveLocaleContext = createContext<Locale | null>(null);

type ArchiveLocaleProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
};

const ArchiveLocaleProvider: FC<ArchiveLocaleProviderProps> = ({ children, initialLocale }) => {
  return <ArchiveLocaleContext.Provider value={initialLocale}>{children}</ArchiveLocaleContext.Provider>;
};

const useArchiveLocaleContext = () => {
  return useContext(ArchiveLocaleContext);
};

export { ArchiveLocaleProvider, useArchiveLocaleContext };
