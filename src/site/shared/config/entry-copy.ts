type Locale = "en" | "ru";

type EntryContent = {
  badge: string;
  title: string;
  subtitle: string;
  descriptor: string;
  bootLabel: string;
  enterLabel: string;
  skipLabel: string;
  soundOn: string;
  soundOff: string;
  languageLabel: string;
  sanctumHint: string;
  supportLabel: string;
  supportValue: string;
  skipHint: string;
  enterHint: string;
  systemTag: string;
  bootLines: string[];
};

const entryCopy: Record<Locale, EntryContent> = {
  en: {
    badge: "relic node // software engineer // year 06",
    title: "ORORURA ARCHIVE",
    subtitle: "Signal restored. The archive is awake.",
    descriptor: "Systems, interfaces, and engineered strange machinery.",
    bootLabel: "archive.init",
    enterLabel: "Enter Archive",
    skipLabel: "Skip Intro",
    soundOn: "Sound: active",
    soundOff: "Sound: muted",
    languageLabel: "Language",
    sanctumHint: "Sanctum route unlocked",
    supportLabel: "identity",
    supportValue: "faceless authorship // curated portfolio artifact",
    skipHint: "Bypass the ritual sequence.",
    enterHint: "Proceed through the ceremonial gate.",
    systemTag: "stable link // ru/en // no portrait",
    bootLines: [
      "archive.core.......... ready",
      "signal.trace.......... restored",
      "memory.vault.......... synchronized",
      "mask.protocol......... engaged",
      "sanctum.path.......... available"
    ]
  },
  ru: {
    badge: "реликтовый узел // инженер-программист // год 06",
    title: "ORORURA ARCHIVE",
    subtitle: "Сигнал восстановлен. Архив пробуждён.",
    descriptor: "Системы, интерфейсы и аккуратно собранные странные механизмы.",
    bootLabel: "archive.init",
    enterLabel: "Войти в архив",
    skipLabel: "Пропустить интро",
    soundOn: "Звук: активен",
    soundOff: "Звук: выключен",
    languageLabel: "Язык",
    sanctumHint: "Маршрут в Sanctum открыт",
    supportLabel: "идентичность",
    supportValue: "без лица // авторский цифровой артефакт",
    skipHint: "Обойти ритуальную последовательность.",
    enterHint: "Пройти через церемониальный вход.",
    systemTag: "стабильный канал // ru/en // без портрета",
    bootLines: [
      "archive.core.......... готово",
      "signal.trace.......... восстановлен",
      "memory.vault.......... синхронизирован",
      "mask.protocol......... активирован",
      "sanctum.path.......... доступен"
    ]
  }
};

export type { EntryContent, Locale };
export { entryCopy };
