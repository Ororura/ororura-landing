import type { Locale } from "./entry-copy";
import type { QuickAccessLink } from "./sanctum-copy";

type QuestsPageStatLabel = "archiveCount" | "featuredCount" | "stackCount" | "workSpan";

type QuestsContent = {
  archiveEmpty: string;
  archiveIntro: string;
  archiveLabel: string;
  chamberLabel: string;
  chamberStatus: string;
  currentFilterLabel: string;
  descriptor: string;
  featuredIntro: string;
  featuredLabel: string;
  filterLabel: string;
  headingEyebrow: string;
  inspectHint: string;
  inspectLabel: string;
  intro: string;
  languageLabel: string;
  linksLabel: string;
  openChannelLabel: string;
  outcomeLabel: string;
  quickLinks: QuickAccessLink[];
  quickLinksIntro: string;
  quickLinksLabel: string;
  recordLabel: string;
  returnLabel: string;
  roleLabel: string;
  soundOff: string;
  soundOn: string;
  stackLabel: string;
  statsLabel: string;
  statsLabels: Record<QuestsPageStatLabel, string>;
  systemLabel: string;
  systemValue: string;
  title: string;
};

const questsCopy: Record<Locale, QuestsContent> = {
  en: {
    archiveEmpty: "No projects match the current filter.",
    archiveIntro: "Additional projects, experiments, and utilities beyond the main case studies.",
    archiveLabel: "more projects",
    chamberLabel: "portfolio // projects",
    chamberStatus: "selected work, experiments, and tools",
    currentFilterLabel: "current filter",
    descriptor: "Project list with shipped work, internal tools, and experiments.",
    featuredIntro: "Main case studies with context: task, role, stack, and result.",
    featuredLabel: "selected projects",
    filterLabel: "filter",
    headingEyebrow: "projects // case studies",
    inspectHint: "Select a project to see the details.",
    inspectLabel: "project details",
    intro: "These projects best show how I solve product and engineering problems.",
    languageLabel: "Language",
    linksLabel: "links",
    openChannelLabel: "Contact",
    outcomeLabel: "result",
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
        href: "/manuscript",
        hint: "resume in document form",
        id: "cv",
        label: "CV",
        signal: "document",
        tone: "rust",
      },
      {
        href: "/open-channel",
        hint: "direct contact",
        id: "telegram",
        label: "Contact",
        signal: "contact",
        tone: "cyan",
      },
    ],
    quickLinksIntro: "Fast links to code, CV, and contact.",
    quickLinksLabel: "quick links",
    recordLabel: "project id",
    returnLabel: "back to main page",
    roleLabel: "role",
    soundOff: "Sound off",
    soundOn: "Sound on",
    stackLabel: "stack",
    statsLabel: "project metrics",
    statsLabels: {
      archiveCount: "other projects",
      featuredCount: "selected projects",
      stackCount: "technologies",
      workSpan: "period",
    },
    systemLabel: "status",
    systemValue: "projects ready // ru/en",
    title: "Projects",
  },
  ru: {
    archiveEmpty: "По этому фильтру сейчас нет проектов.",
    archiveIntro: "Дополнительные проекты, эксперименты и утилиты за пределами основных кейсов.",
    archiveLabel: "другие проекты",
    chamberLabel: "портфолио // проекты",
    chamberStatus: "ключевые работы, эксперименты и инструменты",
    currentFilterLabel: "активный фильтр",
    descriptor: "Список проектов с реальной продуктовой работой, внутренними инструментами и экспериментами.",
    featuredIntro: "Основные кейсы с понятным контекстом: задача, роль, стек и результат.",
    featuredLabel: "ключевые проекты",
    filterLabel: "фильтр",
    headingEyebrow: "проекты // кейсы",
    inspectHint: "Выберите проект, чтобы посмотреть детали.",
    inspectLabel: "детали проекта",
    intro: "Эти проекты лучше всего показывают, как я решаю продуктовые и инженерные задачи.",
    languageLabel: "Язык",
    linksLabel: "ссылки",
    openChannelLabel: "Контакты",
    outcomeLabel: "результат",
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
        href: "/manuscript",
        hint: "резюме в документном виде",
        id: "cv",
        label: "CV",
        signal: "документ",
        tone: "rust",
      },
      {
        href: "/open-channel",
        hint: "прямой контакт",
        id: "telegram",
        label: "Контакты",
        signal: "контакт",
        tone: "cyan",
      },
    ],
    quickLinksIntro: "Быстрые ссылки на код, CV и контакты.",
    quickLinksLabel: "быстрые ссылки",
    recordLabel: "id проекта",
    returnLabel: "назад на главную",
    roleLabel: "роль",
    soundOff: "Звук выключен",
    soundOn: "Звук включён",
    stackLabel: "стек",
    statsLabel: "метрики проектов",
    statsLabels: {
      archiveCount: "других проектов",
      featuredCount: "ключевых проектов",
      stackCount: "технологий",
      workSpan: "период",
    },
    systemLabel: "статус",
    systemValue: "проекты готовы // ru/en",
    title: "Проекты",
  },
};

export type { QuestsContent, QuestsPageStatLabel };
export { questsCopy };
