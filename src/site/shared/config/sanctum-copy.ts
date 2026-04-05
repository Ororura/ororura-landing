import type { Locale } from "./entry-copy";

type QuickLinkTone = "gold" | "rust" | "cyan";

type SpotlightCard = {
  eyebrow: string;
  sectorId: "character-record" | "field-notes" | "quests";
  title: string;
};

type QuickAccessLink = {
  external?: boolean;
  href: string;
  hint: string;
  id: string;
  label: string;
  signal: string;
  tone: QuickLinkTone;
};

type SanctumStatusItem = {
  label: string;
  value: string;
};

type SanctumContent = {
  archiveReadyLabel: string;
  archiveStatus: SanctumStatusItem[];
  archiveStatusLabel: string;
  attunementLabel: string;
  attunements: string[];
  chamberDescriptor: string;
  chamberLabel: string;
  chamberStatus: string;
  descriptor: string;
  featuredIntro: string;
  featuredLabel: string;
  identityLabel: string;
  inspectLabel: string;
  languageLabel: string;
  openLabel: string;
  previewHint: string;
  previewLabel: string;
  quickAccessIntro: string;
  quickAccessLabel: string;
  quickLinks: QuickAccessLink[];
  relatedLabel: string;
  returnHint: string;
  returnLabel: string;
  role: string;
  routesHint: string;
  routesLabel: string;
  sectorPayloadLabel: string;
  sectorPlaceholderEyebrow: string;
  sectorStateLabel: string;
  soundOff: string;
  soundOn: string;
  spotlightCards: SpotlightCard[];
  summary: string;
  systemLabel: string;
  systemValue: string;
};

const sanctumCopy: Record<Locale, SanctumContent> = {
  en: {
    archiveReadyLabel: "portfolio ready",
    archiveStatus: [
      { label: "name", value: "ORORURA" },
      { label: "role", value: "software engineer" },
      { label: "experience", value: "6 years" },
      { label: "languages", value: "ru / en" },
    ],
    archiveStatusLabel: "summary",
    attunementLabel: "focus",
    attunements: ["product interfaces", "frontend systems", "internal tools"],
    chamberDescriptor: "main page / portfolio overview",
    chamberLabel: "portfolio // overview",
    chamberStatus: "projects, stack, writing, and contact",
    descriptor: "This is the main page. Use it to open sections with projects, stack, writing, CV, and contact.",
    featuredIntro: "Three sections that quickly explain who I am, what I build, and how I think.",
    featuredLabel: "recommended sections",
    identityLabel: "profile",
    inspectLabel: "section details",
    languageLabel: "Language",
    openLabel: "open section",
    previewHint: "Select a section to see a short description before opening it.",
    previewLabel: "section preview",
    quickAccessIntro: "Direct links if you already know where you want to go.",
    quickAccessLabel: "quick links",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "repositories, code, and commit history",
        id: "github",
        label: "GitHub",
        signal: "external",
        tone: "gold",
      },
      {
        external: true,
        href: "https://t.me/ororura",
        hint: "fast contact for work questions",
        id: "telegram",
        label: "Telegram",
        signal: "contact",
        tone: "cyan",
      },
      {
        href: "/manuscript",
        hint: "resume in document form",
        id: "cv",
        label: "CV",
        signal: "document",
        tone: "rust",
      },
    ],
    relatedLabel: "other sections",
    returnHint: "Back to the main page.",
    returnLabel: "back to main page",
    role: "Software engineer // 6 years experience",
    routesHint: "Choose a section to open it.",
    routesLabel: "sections",
    sectorPayloadLabel: "inside",
    sectorPlaceholderEyebrow: "section overview",
    sectorStateLabel: "current section",
    soundOff: "Sound off",
    soundOn: "Sound on",
    spotlightCards: [
      { eyebrow: "profile", sectorId: "character-record", title: "About me" },
      { eyebrow: "projects", sectorId: "quests", title: "Selected work" },
      { eyebrow: "writing", sectorId: "field-notes", title: "Notes and postmortems" },
    ],
    summary:
      "Software engineer with six years of product work. I focus on interfaces and frontend systems, and take full-stack tasks when the product needs it.",
    systemLabel: "status",
    systemValue: "portfolio ready // ru/en",
  },
  ru: {
    archiveReadyLabel: "портфолио готово",
    archiveStatus: [
      { label: "имя", value: "ORORURA" },
      { label: "роль", value: "инженер-программист" },
      { label: "опыт", value: "6 лет" },
      { label: "языки", value: "ru / en" },
    ],
    archiveStatusLabel: "кратко",
    attunementLabel: "фокус",
    attunements: ["продуктовые интерфейсы", "фронтенд-системы", "внутренние инструменты"],
    chamberDescriptor: "главная страница / обзор портфолио",
    chamberLabel: "портфолио // обзор",
    chamberStatus: "проекты, стек, тексты и контакты",
    descriptor: "Это главная страница. Отсюда можно перейти к проектам, стеку, заметкам, CV и контактам.",
    featuredIntro: "Три раздела, с которых проще всего понять, кто я, что делаю и как работаю.",
    featuredLabel: "рекомендуемые разделы",
    identityLabel: "профиль",
    inspectLabel: "о разделе",
    languageLabel: "Язык",
    openLabel: "открыть раздел",
    previewHint: "Выберите раздел, чтобы сначала увидеть короткое описание.",
    previewLabel: "предпросмотр раздела",
    quickAccessIntro: "Прямые ссылки, если вы уже знаете, куда хотите перейти.",
    quickAccessLabel: "быстрые ссылки",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "репозитории, код и история коммитов",
        id: "github",
        label: "GitHub",
        signal: "внешний",
        tone: "gold",
      },
      {
        external: true,
        href: "https://t.me/ororura",
        hint: "быстрый контакт по рабочим вопросам",
        id: "telegram",
        label: "Telegram",
        signal: "контакт",
        tone: "cyan",
      },
      {
        href: "/manuscript",
        hint: "резюме в документном виде",
        id: "cv",
        label: "CV",
        signal: "документ",
        tone: "rust",
      },
    ],
    relatedLabel: "другие разделы",
    returnHint: "Вернуться на главную страницу.",
    returnLabel: "назад на главную",
    role: "Инженер-программист // 6 лет опыта",
    routesHint: "Выберите раздел, чтобы открыть его.",
    routesLabel: "разделы",
    sectorPayloadLabel: "внутри",
    sectorPlaceholderEyebrow: "обзор раздела",
    sectorStateLabel: "текущий раздел",
    soundOff: "Звук выключен",
    soundOn: "Звук включён",
    spotlightCards: [
      { eyebrow: "профиль", sectorId: "character-record", title: "Обо мне" },
      { eyebrow: "проекты", sectorId: "quests", title: "Ключевые работы" },
      { eyebrow: "тексты", sectorId: "field-notes", title: "Заметки и разборы" },
    ],
    summary:
      "Инженер-программист с шестью годами продуктовой работы. Основной фокус: интерфейсы, фронтенд-системы и внутренние инструменты. При необходимости закрываю и full-stack задачи.",
    systemLabel: "статус",
    systemValue: "портфолио готово // ru/en",
  },
};

export type { QuickAccessLink, QuickLinkTone, SanctumContent, SanctumStatusItem, SpotlightCard };
export { sanctumCopy };
