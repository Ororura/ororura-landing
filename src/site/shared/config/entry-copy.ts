type Locale = "en" | "ru";

type EntryContent = {
  badge: string;
  bootLabel: string;
  bootLines: string[];
  descriptor: string;
  enterHint: string;
  enterLabel: string;
  languageLabel: string;
  pageLabel: string;
  sanctumHint: string;
  skipHint: string;
  skipLabel: string;
  soundOff: string;
  soundOn: string;
  subtitle: string;
  supportLabel: string;
  supportValue: string;
  systemTag: string;
  title: string;
};

const entryCopy: Record<Locale, EntryContent> = {
  en: {
    badge: "software engineer // 6 years experience",
    bootLabel: "system check",
    bootLines: [
      "profile............... ready",
      "projects.............. loaded",
      "writing............... loaded",
      "contact............... available",
      "main.page............. ready",
    ],
    descriptor: "Frontend-heavy engineer building product interfaces, internal tools, and clear user experiences.",
    enterHint: "Open the main portfolio page.",
    enterLabel: "Open Portfolio",
    languageLabel: "Language",
    pageLabel: "portfolio entry",
    sanctumHint: "Main page ready",
    skipHint: "Skip the intro animation.",
    skipLabel: "Skip Intro",
    soundOff: "Sound off",
    soundOn: "Sound on",
    subtitle: "Portfolio, projects, writing, and contact in one place.",
    supportLabel: "overview",
    supportValue:
      "Software engineer with product experience. The site is focused on real work, selected case studies, and clear navigation.",
    systemTag: "ru/en // portfolio // sound optional",
    title: "ORORURA",
  },
  ru: {
    badge: "инженер-программист // 6 лет опыта",
    bootLabel: "проверка системы",
    bootLines: [
      "profile............... готов",
      "projects.............. загружены",
      "writing............... загружены",
      "contact............... доступен",
      "main.page............. готов",
    ],
    descriptor: "Инженер с сильным фронтендом: продуктовые интерфейсы, внутренние инструменты и понятный UX.",
    enterHint: "Перейти на главную страницу портфолио.",
    enterLabel: "Открыть портфолио",
    languageLabel: "Язык",
    pageLabel: "вход в портфолио",
    sanctumHint: "Главная страница готова",
    skipHint: "Пропустить вступительную анимацию.",
    skipLabel: "Пропустить интро",
    soundOff: "Звук выключен",
    soundOn: "Звук включён",
    subtitle: "Портфолио, проекты, тексты и контакты в одном месте.",
    supportLabel: "кратко",
    supportValue:
      "Инженер-программист с продуктовым опытом. Здесь собраны реальные проекты, стек, заметки и контакты без лишнего шума.",
    systemTag: "ru/en // портфолио // звук по желанию",
    title: "ORORURA",
  },
};

export type { EntryContent, Locale };
export { entryCopy };
