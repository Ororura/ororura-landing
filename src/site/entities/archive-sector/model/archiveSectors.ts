import type { Locale } from "@/shared/config";

type ArchiveSectorId =
  | "character-record"
  | "loadout"
  | "quests"
  | "codex"
  | "field-notes"
  | "open-channel"
  | "manuscript";

type ArchiveSectorAccent = "gold" | "rust" | "cyan";

type ArchiveSectorRecord = {
  accent: ArchiveSectorAccent;
  href: string;
  id: ArchiveSectorId;
  order: string;
  related: ArchiveSectorId[];
};

type ArchiveSectorContent = {
  description: string;
  featureLine: string;
  navHint: string;
  preview: string;
  records: string[];
  signal: string;
  status: string;
  title: string;
};

type ArchiveSector = ArchiveSectorRecord & ArchiveSectorContent;

const archiveSectorRecords: ArchiveSectorRecord[] = [
  {
    accent: "gold",
    href: "/character-record",
    id: "character-record",
    order: "I",
    related: ["loadout", "manuscript"],
  },
  {
    accent: "rust",
    href: "/loadout",
    id: "loadout",
    order: "II",
    related: ["quests", "codex"],
  },
  {
    accent: "gold",
    href: "/quests",
    id: "quests",
    order: "III",
    related: ["loadout", "field-notes"],
  },
  {
    accent: "cyan",
    href: "/codex",
    id: "codex",
    order: "IV",
    related: ["loadout", "field-notes"],
  },
  {
    accent: "cyan",
    href: "/field-notes",
    id: "field-notes",
    order: "V",
    related: ["quests", "codex"],
  },
  {
    accent: "rust",
    href: "/open-channel",
    id: "open-channel",
    order: "VI",
    related: ["character-record", "manuscript"],
  },
  {
    accent: "gold",
    href: "/manuscript",
    id: "manuscript",
    order: "VII",
    related: ["character-record", "open-channel"],
  },
];

const archiveSectorContent: Record<Locale, Record<ArchiveSectorId, ArchiveSectorContent>> = {
  en: {
    "character-record": {
      description: "Background, working style, experience, and the practical way I approach engineering work.",
      featureLine: "about me / experience / work style",
      navHint: "about me / experience / work style",
      preview: "Short profile: who I am, what I do, and how I work.",
      records: ["background", "work principles", "experience"],
      signal: "profile ready",
      status: "available",
      title: "About Me",
    },
    loadout: {
      description: "Technologies, tools, and workflow I use to turn ideas into shipped product work.",
      featureLine: "stack / tools / workflow",
      navHint: "stack / tools / workflow",
      preview: "Languages, frameworks, and tools I use in real projects.",
      records: ["frontend", "backend", "workflow"],
      signal: "stack listed",
      status: "updated",
      title: "Stack",
    },
    quests: {
      description: "Selected cases with the clearest examples of product problems, constraints, and outcomes.",
      featureLine: "projects / case studies / outcomes",
      navHint: "projects / case studies",
      preview: "Real work with context, decisions, and results.",
      records: ["selected projects", "case studies", "results"],
      signal: "projects loaded",
      status: "ready",
      title: "Projects",
    },
    codex: {
      description: "Engineering principles, patterns, and references that shape how I design and build systems.",
      featureLine: "principles / patterns / references",
      navHint: "principles / patterns / references",
      preview: "The thinking behind the work, not just the final interface.",
      records: ["engineering principles", "system patterns", "references"],
      signal: "approach listed",
      status: "ready",
      title: "Approach",
    },
    "field-notes": {
      description: "Notes, essays, and postmortems about product work, interface decisions, and lessons learned.",
      featureLine: "notes / essays / postmortems",
      navHint: "writing / notes / postmortems",
      preview: "Writing about the work while it is still fresh enough to be useful.",
      records: ["essays", "build notes", "observations"],
      signal: "notes available",
      status: "open",
      title: "Notes",
    },
    "open-channel": {
      description: "Contact details, preferred communication channels, and the simplest route to a real conversation.",
      featureLine: "contact / collaboration / availability",
      navHint: "contact / collaboration",
      preview: "For hiring, collaboration, or any work-related message.",
      records: ["contact routes", "response protocol", "availability window"],
      signal: "contact available",
      status: "ready",
      title: "Contact",
    },
    manuscript: {
      description: "A clean document version of the portfolio for people who prefer a straightforward CV format.",
      featureLine: "cv / resume / document",
      navHint: "cv / timeline / export",
      preview: "The portfolio compressed into a document for quick review or download.",
      records: ["resume", "experience", "download"],
      signal: "cv ready",
      status: "available",
      title: "CV",
    },
  },
  ru: {
    "character-record": {
      description: "Бэкграунд, рабочий подход, опыт и то, как я обычно решаю инженерные задачи.",
      featureLine: "обо мне / опыт / стиль работы",
      navHint: "обо мне / опыт / стиль работы",
      preview: "Короткий профиль: кто я, чем занимаюсь и как работаю.",
      records: ["бэкграунд", "рабочие принципы", "опыт"],
      signal: "профиль готов",
      status: "доступен",
      title: "Обо мне",
    },
    loadout: {
      description: "Технологии, инструменты и рабочий процесс, которыми я пользуюсь в продуктовой разработке.",
      featureLine: "стек / инструменты / процесс",
      navHint: "стек / инструменты / процесс",
      preview: "Языки, фреймворки и инструменты, которые использую в реальных проектах.",
      records: ["фронтенд", "бэкенд", "процесс"],
      signal: "стек указан",
      status: "обновлён",
      title: "Стек",
    },
    quests: {
      description: "Избранные кейсы с понятными примерами задач, ограничений и итогового результата.",
      featureLine: "проекты / кейсы / результаты",
      navHint: "проекты / кейсы",
      preview: "Реальная работа с контекстом, решениями и результатами.",
      records: ["ключевые проекты", "кейсы", "результаты"],
      signal: "проекты загружены",
      status: "готово",
      title: "Проекты",
    },
    codex: {
      description: "Инженерные принципы, паттерны и референсы, которые влияют на мои проектные решения.",
      featureLine: "принципы / паттерны / референсы",
      navHint: "принципы / паттерны / референсы",
      preview: "Как я думаю о системах, а не только о том, как они выглядят.",
      records: ["инженерные принципы", "системные паттерны", "референсы"],
      signal: "подход описан",
      status: "готово",
      title: "Подход",
    },
    "field-notes": {
      description: "Заметки, эссе и постмортемы о продуктовой работе, интерфейсах и выводах по ходу дела.",
      featureLine: "заметки / эссе / постмортемы",
      navHint: "тексты / заметки / постмортемы",
      preview: "Тексты о работе, пока контекст ещё свежий и полезный.",
      records: ["эссе", "заметки по сборкам", "наблюдения"],
      signal: "заметки доступны",
      status: "открыто",
      title: "Заметки",
    },
    "open-channel": {
      description: "Контакты, удобные каналы связи и самый простой путь к нормальному разговору.",
      featureLine: "контакты / сотрудничество / доступность",
      navHint: "контакты / сотрудничество",
      preview: "Для найма, сотрудничества или любого рабочего сообщения.",
      records: ["маршруты связи", "протокол ответа", "окно доступности"],
      signal: "контакт доступен",
      status: "готово",
      title: "Контакты",
    },
    manuscript: {
      description: "Чистая документная версия портфолио для тех, кому удобнее смотреть всё в формате CV.",
      featureLine: "cv / резюме / документ",
      navHint: "cv / таймлайн / экспорт",
      preview: "Портфолио, собранное в документ для быстрого просмотра или скачивания.",
      records: ["резюме", "опыт", "скачивание"],
      signal: "cv готово",
      status: "доступно",
      title: "CV",
    },
  },
};

const featuredArchiveSectorIds: ArchiveSectorId[] = ["quests", "loadout", "field-notes"];

const getArchiveSectors = (locale: Locale) => {
  return archiveSectorRecords.map((sectorRecord) => ({
    ...sectorRecord,
    ...archiveSectorContent[locale][sectorRecord.id],
  }));
};

const getArchiveSector = (locale: Locale, sectorId: ArchiveSectorId) => {
  return getArchiveSectors(locale).find((sector) => sector.id === sectorId) ?? getArchiveSectors(locale)[0];
};

const getRelatedArchiveSectors = (locale: Locale, sectorId: ArchiveSectorId) => {
  const currentSector = getArchiveSector(locale, sectorId);

  return currentSector.related.map((relatedSectorId) => getArchiveSector(locale, relatedSectorId));
};

const getFeaturedArchiveSectors = (locale: Locale) => {
  return featuredArchiveSectorIds.map((sectorId) => getArchiveSector(locale, sectorId));
};

export type { ArchiveSector, ArchiveSectorAccent, ArchiveSectorContent, ArchiveSectorId, ArchiveSectorRecord };
export {
  featuredArchiveSectorIds,
  getArchiveSector,
  getArchiveSectors,
  getFeaturedArchiveSectors,
  getRelatedArchiveSectors,
};
