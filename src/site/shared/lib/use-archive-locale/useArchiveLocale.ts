"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/shared/config";

const ARCHIVE_LOCALE_KEY = "archive.locale";

const useArchiveLocale = (initialLocale: Locale = "en") => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedLocale = window.localStorage.getItem(ARCHIVE_LOCALE_KEY);

    if (storedLocale === "en" || storedLocale === "ru") {
      setLocale(storedLocale);
      return;
    }

    if (window.navigator.language.toLowerCase().startsWith("ru")) {
      setLocale("ru");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(ARCHIVE_LOCALE_KEY, locale);
  }, [locale]);

  return {
    locale,
    setLocale
  };
};

export { useArchiveLocale };
