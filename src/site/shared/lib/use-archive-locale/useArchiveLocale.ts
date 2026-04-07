"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/shared/config";
import { getPreferredArchiveLocale, persistArchiveLocale } from "./archiveLocale";
import { useArchiveLocaleContext } from "./ArchiveLocaleProvider";

const useArchiveLocale = (initialLocale: Locale = "en") => {
  const contextLocale = useArchiveLocaleContext();
  const fallbackLocale = contextLocale ?? initialLocale;
  const [locale, setLocale] = useState<Locale>(fallbackLocale);
  const [hasResolvedLocale, setHasResolvedLocale] = useState(false);

  useEffect(() => {
    setLocale(getPreferredArchiveLocale(fallbackLocale));
    setHasResolvedLocale(true);
  }, [fallbackLocale]);

  useEffect(() => {
    if (!hasResolvedLocale) {
      return;
    }

    persistArchiveLocale(locale);
  }, [hasResolvedLocale, locale]);

  return {
    locale,
    setLocale
  };
};

export { useArchiveLocale };
