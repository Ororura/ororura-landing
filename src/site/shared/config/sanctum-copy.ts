import type { Locale } from "./entry-copy";

type QuickLinkTone = "gold" | "rust" | "cyan";

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
  summary: string;
  systemLabel: string;
  systemValue: string;
};

const sanctumCopy: Record<Locale, SanctumContent> = {
  en: {
    archiveReadyLabel: "archive initialized // sanctum stable",
    archiveStatus: [
      { label: "operator", value: "real human // active" },
      { label: "discipline", value: "software engineering" },
      { label: "experience", value: "6 years shipped" },
      { label: "interface", value: "ru / en ready" }
    ],
    archiveStatusLabel: "archive status",
    attunementLabel: "attunement",
    attunements: ["frontend systems", "design-engineering", "networked tools"],
    chamberDescriptor: "central chamber // authored portfolio hub",
    chamberLabel: "sanctum // control room",
    chamberStatus: "real operator confirmed // shrine awake",
    descriptor:
      "Projects, stack, writing, CV, and contact are filed here as explorable chambers. Slightly theatrical. Still a real engineering archive.",
    featuredIntro: "Three reliable first stops if you want the short route through the archive.",
    featuredLabel: "featured passages",
    identityLabel: "operator record",
    inspectLabel: "inspect route",
    languageLabel: "Language",
    openLabel: "open chamber",
    previewHint: "hover a route to inspect its filing",
    previewLabel: "route inspection",
    quickAccessIntro: "Direct exits for people who already know what they need.",
    quickAccessLabel: "quick access",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "repositories / commits / source trace",
        id: "github",
        label: "GitHub",
        signal: "external mirror",
        tone: "gold"
      },
      {
        external: true,
        href: "https://t.me/ororura",
        hint: "direct signal / async contact",
        id: "telegram",
        label: "Telegram",
        signal: "open relay",
        tone: "cyan"
      },
      {
        href: "/manuscript",
        hint: "cv / record / printable version",
        id: "cv",
        label: "CV",
        signal: "sealed manuscript",
        tone: "rust"
      }
    ],
    relatedLabel: "adjacent chambers",
    returnHint: "Back to the central hall.",
    returnLabel: "return to sanctum",
    role: "Software engineer // year 06 // faceless node",
    routesHint: "hover to inspect // select to descend",
    routesLabel: "world map",
    sectorPayloadLabel: "contained records",
    sectorPlaceholderEyebrow: "sector access // archive branch",
    sectorStateLabel: "sector state",
    soundOff: "Sound: muted",
    soundOn: "Sound: active",
    summary:
      "Software engineer with six years of shipped product work across interfaces, systems, and internet oddities. Frontend-heavy by instinct, full-stack when the structure demands it. No headshot. The artifacts can do the introduction.",
    systemLabel: "system signal",
    systemValue: "archive.route.sanctum == stable"
  },
  ru: {
    archiveReadyLabel: "архив инициализирован // sanctum стабилен",
    archiveStatus: [
      { label: "оператор", value: "реальный человек // активен" },
      { label: "дисциплина", value: "инженерия ПО" },
      { label: "опыт", value: "6 лет в продакшене" },
      { label: "интерфейс", value: "ru / en готов" }
    ],
    archiveStatusLabel: "статус архива",
    attunementLabel: "настройка",
    attunements: ["фронтенд-системы", "design-engineering", "сетевые инструменты"],
    chamberDescriptor: "центральная камера // авторский хаб-портфолио",
    chamberLabel: "sanctum // узел управления",
    chamberStatus: "оператор подтверждён // святилище активно",
    descriptor:
      "Проекты, стек, тексты, CV и контакты собраны здесь как отдельные камеры архива. Немного театрально. Всё ещё реальное инженерное портфолио.",
    featuredIntro: "Три надёжные точки входа, если нужен короткий маршрут по архиву.",
    featuredLabel: "избранные проходы",
    identityLabel: "досье оператора",
    inspectLabel: "осмотреть маршрут",
    languageLabel: "Язык",
    openLabel: "открыть камеру",
    previewHint: "наведите на маршрут, чтобы посмотреть содержимое",
    previewLabel: "осмотр маршрута",
    quickAccessIntro: "Прямые выходы для тех, кто уже знает, что ищет.",
    quickAccessLabel: "быстрый доступ",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "репозитории / коммиты / след кода",
        id: "github",
        label: "GitHub",
        signal: "внешнее зеркало",
        tone: "gold"
      },
      {
        external: true,
        href: "https://t.me/ororura",
        hint: "прямой сигнал / асинхронная связь",
        id: "telegram",
        label: "Telegram",
        signal: "открытый ретранслятор",
        tone: "cyan"
      },
      {
        href: "/manuscript",
        hint: "cv / запись / печатная версия",
        id: "cv",
        label: "CV",
        signal: "запечатанный манускрипт",
        tone: "rust"
      }
    ],
    relatedLabel: "соседние камеры",
    returnHint: "Назад в центральный зал.",
    returnLabel: "вернуться в sanctum",
    role: "Инженер-программист // год 06 // узел без лица",
    routesHint: "навести, чтобы осмотреть // выбрать, чтобы спуститься",
    routesLabel: "карта мира",
    sectorPayloadLabel: "содержимое сектора",
    sectorPlaceholderEyebrow: "доступ к сектору // ветка архива",
    sectorStateLabel: "состояние сектора",
    soundOff: "Звук: выключен",
    soundOn: "Звук: активен",
    summary:
      "Инженер-программист с шестью годами реальной продуктовой работы: интерфейсы, системы и аккуратно собранные интернет-артефакты. Фронтенд по инстинкту, фуллстек по необходимости. Без портрета. Для знакомства достаточно артефактов.",
    systemLabel: "системный сигнал",
    systemValue: "archive.route.sanctum == stable"
  }
};

export type { QuickAccessLink, QuickLinkTone, SanctumContent, SanctumStatusItem };
export { sanctumCopy };
