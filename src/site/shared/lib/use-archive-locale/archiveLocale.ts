import type { Locale } from "@/shared/config";

const ARCHIVE_LOCALE_STORAGE_KEY = "archive.locale";
const ARCHIVE_LOCALE_COOKIE_KEY = "archive.locale";
const ARCHIVE_LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const isArchiveLocale = (value: string | null | undefined): value is Locale => value === "en" || value === "ru";

const getArchiveLocaleFromCookie = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const localeCookie = document.cookie
    .split("; ")
    .find((cookieEntry) => cookieEntry.startsWith(`${ARCHIVE_LOCALE_COOKIE_KEY}=`))
    ?.split("=")[1];

  return isArchiveLocale(localeCookie) ? localeCookie : null;
};

const getNavigatorArchiveLocale = (fallbackLocale: Locale) => {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : fallbackLocale;
};

const getPreferredArchiveLocale = (fallbackLocale: Locale) => {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }

  const storedLocale = window.localStorage.getItem(ARCHIVE_LOCALE_STORAGE_KEY);

  if (isArchiveLocale(storedLocale)) {
    return storedLocale;
  }

  return getArchiveLocaleFromCookie() ?? getNavigatorArchiveLocale(fallbackLocale);
};

const persistArchiveLocale = (locale: Locale) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ARCHIVE_LOCALE_STORAGE_KEY, locale);
  document.cookie = `${ARCHIVE_LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${ARCHIVE_LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
  document.documentElement.lang = locale;
};

const resolveArchiveLocale = (value: string | null | undefined, fallbackLocale: Locale = "en") => {
  return isArchiveLocale(value) ? value : fallbackLocale;
};

export {
  ARCHIVE_LOCALE_COOKIE_KEY,
  getPreferredArchiveLocale,
  isArchiveLocale,
  persistArchiveLocale,
  resolveArchiveLocale
};
