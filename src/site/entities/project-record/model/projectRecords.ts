import type { Locale } from "@/shared/config";

type ProjectCategory = "archived" | "experiments" | "tools" | "web";
type ProjectFilterId = "all" | ProjectCategory;
type ProjectStatus = "archived" | "live" | "maintenance" | "prototype" | "shipped";
type ProjectLinkKind = "contact" | "github" | "live" | "writeup";

type ProjectLink = {
  external?: boolean;
  href: string;
  kind: ProjectLinkKind;
  label: string;
};

type ProjectLocalizedContent = {
  archiveNote: string;
  description: string;
  outcome: string;
  role: string;
  summary: string;
  title: string;
};

type ProjectRecordBase = {
  archiveId: string;
  category: ProjectCategory;
  featured: boolean;
  id: string;
  links: ProjectLink[];
  stack: string[];
  status: ProjectStatus;
  yearLabel: string;
};

type ProjectRecord = ProjectRecordBase & ProjectLocalizedContent;

type ProjectSourceRecord = ProjectRecordBase & {
  content: Record<Locale, ProjectLocalizedContent>;
};

type ProjectFilterOption = {
  count: number;
  id: ProjectFilterId;
  label: string;
};

type ProjectStatusMeta = {
  label: string;
  tone: "ash" | "cyan" | "gold" | "rust";
};

type ProjectCategoryMeta = {
  label: string;
  tone: "ash" | "cyan" | "gold" | "rust";
};

const projectSourceRecords: ProjectSourceRecord[] = [
  {
    archiveId: "PRJ-001",
    category: "web",
    content: {
      en: {
        archiveNote: "Large operational interface with high information density, but kept calm and readable.",
        description:
          "A multi-role control room for operations teams handling schedules, alerts, and live dispatch. I led the frontend architecture, dense layout logic, and interaction model for critical workflows.",
        outcome:
          "Unified fragmented operator tools into one surface and reduced dispatch friction during the busiest shifts. The console became the default daily interface for the team using it.",
        role: "Lead frontend engineer // interaction architecture // design-engineering bridge",
        summary: "Operations dashboard for logistics and live dispatch.",
        title: "Operations Console",
      },
      ru: {
        archiveNote: "Большой рабочий интерфейс с высокой информационной плотностью, но без перегруза.",
        description:
          "Многоуровневый центр управления для команд, работающих с расписаниями, алертами и живым диспетчингом. Я вёл фронтенд-архитектуру, логику плотных лейаутов и модель взаимодействия для критических сценариев.",
        outcome:
          "Собрал разрозненные операторские инструменты в одну систему и уменьшил трение в самые загруженные смены. Консоль стала основным ежедневным интерфейсом команды.",
        role: "Lead frontend engineer // архитектура взаимодействия // мост между дизайном и инженерией",
        summary: "Операционная панель для логистики и живого диспетчинга.",
        title: "Операционная консоль",
      },
    },
    featured: true,
    id: "sanctum-console",
    links: [
      { href: "/field-notes", kind: "writeup", label: "case notes" },
      { external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" },
      { href: "/open-channel", kind: "contact", label: "request details" },
    ],
    stack: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS", "PostgreSQL"],
    status: "live",
    yearLabel: "2025",
  },
  {
    archiveId: "PRJ-002",
    category: "web",
    content: {
      en: {
        archiveNote: "Realtime map interface where the interaction model had to stay clear under pressure.",
        description:
          "A realtime spatial dashboard for incident intelligence, field status, and cross-team response. I owned the map interaction layer, streaming state surfaces, and the logic that kept the interface readable under load.",
        outcome:
          "Turned an anxious monitoring screen into a stable working instrument. Teams could triage live conditions faster without drowning in visual noise.",
        role: "Senior frontend engineer // realtime UI systems // state model ownership",
        summary: "Realtime geospatial dashboard for incident response and field visibility.",
        title: "Incident Map Dashboard",
      },
      ru: {
        archiveNote: "Realtime-карта, где особенно важна понятная модель взаимодействия под нагрузкой.",
        description:
          "Реалтайм-панель для пространственного мониторинга инцидентов, статусов полевых команд и координации реакции. Я отвечал за слой взаимодействия с картой, потоковые интерфейсные состояния и читаемость под нагрузкой.",
        outcome:
          "Превратил тревожный мониторинговый экран в устойчивый рабочий инструмент. Команды стали быстрее разбирать живые ситуации без визуального перегруза.",
        role: "Senior frontend engineer // realtime UI systems // владение state model",
        summary: "Географическая realtime-панель для обработки инцидентов и обзора ситуации.",
        title: "Карта инцидентов",
      },
    },
    featured: true,
    id: "relay-atlas",
    links: [
      { href: "/field-notes", kind: "writeup", label: "notes" },
      { href: "/open-channel", kind: "contact", label: "contact" },
    ],
    stack: ["React", "TypeScript", "WebSocket", "Mapbox", "Node.js"],
    status: "shipped",
    yearLabel: "2024",
  },
  {
    archiveId: "PRJ-003",
    category: "tools",
    content: {
      en: {
        archiveNote: "Internal release tool for teams working with shared UI packages and conventions.",
        description:
          "A release workbench for a product team juggling UI packages, tokens, component conventions, and deployment rituals. I designed the interface structure and implemented the frontends that made the platform legible to non-platform people.",
        outcome:
          "Normalized release flow, reduced 'tribal knowledge' friction, and made the toolchain easier to trust. Less heroics, more repeatability.",
        role: "Frontend systems engineer // internal tooling // design system integration",
        summary: "Internal release and tooling workspace for teams shipping shared UI.",
        title: "Release Workbench",
      },
      ru: {
        archiveNote: "Внутренний инструмент для релизов и совместной работы над UI-пакетами.",
        description:
          "Релизный workbench для команды, которая одновременно ведёт UI-пакеты, токены, component conventions и ритуалы деплоя. Я спроектировал структуру интерфейса и реализовал фронтенды, делающие платформу понятной не только платформенной команде.",
        outcome:
          "Нормализовал релизный процесс, сократил зависимость от 'племенного знания' и сделал toolchain предсказуемее. Меньше героизма, больше повторяемости.",
        role: "Frontend systems engineer // внутренние инструменты // интеграция дизайн-системы",
        summary: "Внутренний инструмент для релизов, токенов и общего UI.",
        title: "Релизный кабинет",
      },
    },
    featured: true,
    id: "forge-ledger",
    links: [
      { external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" },
      { href: "/manuscript", kind: "writeup", label: "CV excerpt" },
      { href: "/open-channel", kind: "contact", label: "request details" },
    ],
    stack: ["Next.js", "TypeScript", "Turborepo", "Storybook", "Changesets"],
    status: "maintenance",
    yearLabel: "2023-2025",
  },
  {
    archiveId: "LAB-011",
    category: "tools",
    content: {
      en: {
        archiveNote: "Small utility that saved a noticeable amount of release prep time.",
        description:
          "A markdown assembly tool that turned scattered notes, changelog fragments, and component docs into one shippable artifact. Useful when documentation exists, but not yet in one shape.",
        outcome:
          "Cut the time needed to prepare internal releases and public notes. More signal, less copy-paste ritual.",
        role: "Solo build // utility design // implementation",
        summary: "Utility for compiling fragmented notes into one structured release document.",
        title: "Release Notes Builder",
      },
      ru: {
        archiveNote: "Небольшая утилита, которая заметно экономила время на подготовке релизов.",
        description:
          "Инструмент сборки markdown, превращающий разрозненные заметки, changelog-фрагменты и component docs в один пригодный к публикации артефакт.",
        outcome:
          "Сократил время подготовки внутренних релизов и публичных заметок. Больше сигнала, меньше ручного копипаста.",
        role: "Соло-сборка // проектирование утилиты // реализация",
        summary: "Утилита для сборки разрозненных заметок в один структурированный релизный документ.",
        title: "Сборщик релизных заметок",
      },
    },
    featured: false,
    id: "patch-notes-engine",
    links: [
      { external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" },
      { href: "/field-notes", kind: "writeup", label: "build notes" },
    ],
    stack: ["Node.js", "TypeScript", "Markdown", "CLI"],
    status: "shipped",
    yearLabel: "2024",
  },
  {
    archiveId: "LAB-012",
    category: "experiments",
    content: {
      en: {
        archiveNote: "Small interface experiment that became a useful way to think about presentation.",
        description:
          "An experiment for composing faceless portfolio identities from symbols, tags, and metadata instead of portraits. Part UI toy, part narrative engine.",
        outcome:
          "Helped test how much identity can be communicated through structure, tone, and selective signals alone.",
        role: "Concept, UI direction, implementation",
        summary: "Interface experiment for presenting identity through structure instead of a portrait.",
        title: "Persona Builder",
      },
      ru: {
        archiveNote: "Небольшой интерфейсный эксперимент, который оказался полезным способом думать о подаче.",
        description:
          "Эксперимент по сборке faceless identity из символов, тегов и метаданных вместо портретов. Наполовину UI toy, наполовину narrative engine.",
        outcome:
          "Помог проверить, сколько идентичности можно передать через структуру, тон и точечные сигналы без лица.",
        role: "Концепт, UI-направление, реализация",
        summary: "Эксперимент по сборке образа из структуры, символов и метаданных без портрета.",
        title: "Persona Builder",
      },
    },
    featured: false,
    id: "terminal-persona-builder",
    links: [
      { href: "/field-notes", kind: "writeup", label: "notes" },
      { external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" },
    ],
    stack: ["React", "TypeScript", "CSS Motion", "SVG"],
    status: "prototype",
    yearLabel: "2025",
  },
  {
    archiveId: "LAB-013",
    category: "experiments",
    content: {
      en: {
        archiveNote: "Debugging tool for seeing latency and reconnection behavior more clearly.",
        description:
          "A monitoring sketch that visualized websocket drift and reconnection behavior in a more human-readable way than raw numbers usually allow.",
        outcome:
          "Useful as a debugging aid and a reminder that invisible network behavior becomes much easier to reason about when it is given shape.",
        role: "Solo tool // debugging interface // visualization",
        summary: "Latency and reconnection visualizer for websocket-heavy systems.",
        title: "Latency Visualizer",
      },
      ru: {
        archiveNote: "Инструмент для более наглядного наблюдения за задержками и переподключениями.",
        description:
          "Мониторинговый скетч, визуализирующий websocket drift и поведение reconnection куда понятнее, чем это обычно делают одни числа.",
        outcome:
          "Оказался полезен как отладочный инструмент и как напоминание: невидимое сетевое поведение проще осмыслять, когда у него есть форма.",
        role: "Соло-инструмент // интерфейс отладки // визуализация",
        summary: "Визуализатор задержки и переподключения для систем с активным websocket.",
        title: "Визуализатор задержек",
      },
    },
    featured: false,
    id: "latency-lantern",
    links: [{ external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" }],
    stack: ["React", "D3", "WebSocket", "TypeScript"],
    status: "prototype",
    yearLabel: "2023",
  },
  {
    archiveId: "LAB-014",
    category: "web",
    content: {
      en: {
        archiveNote: "Static publishing project built for speed, structure, and long-term maintenance.",
        description:
          "A static publishing experiment for notes, fragments, and authored weirdness, tuned for fast delivery and long-term maintainability.",
        outcome: "Served as a testbed for information architecture choices later reused in portfolio and note systems.",
        role: "Design, frontend, content structure",
        summary: "Static publishing site for notes, fragments, and long-lived authored pages.",
        title: "Static Publishing Site",
      },
      ru: {
        archiveNote: "Статический publishing-проект, собранный ради скорости, структуры и поддержки.",
        description:
          "Эксперимент с static publishing для заметок, фрагментов и авторских странностей, настроенный на быструю выдачу и долгую поддержку.",
        outcome:
          "Стал полигоном для решений по информационной архитектуре, позже использованных в системах заметок и портфолио.",
        role: "Дизайн, фронтенд, структура контента",
        summary: "Статический сайт для заметок, фрагментов и длинных авторских страниц.",
        title: "Статический publishing site",
      },
    },
    featured: false,
    id: "static-relic-press",
    links: [{ href: "/field-notes", kind: "writeup", label: "system notes" }],
    stack: ["Next.js", "MDX", "TypeScript", "Tailwind CSS"],
    status: "maintenance",
    yearLabel: "2022-2024",
  },
  {
    archiveId: "LAB-015",
    category: "archived",
    content: {
      en: {
        archiveNote: "Search prototype for screenshots, fragments, and old web material.",
        description:
          "An indexing experiment around screenshots, captions, fragments, and tags from dead or dying corners of the web. Half search tool, half cultural filing cabinet.",
        outcome:
          "Never became a product, but informed later metadata and tagging patterns across archive-like interfaces.",
        role: "Research, taxonomy, prototype engineering",
        summary: "Indexing experiment for screenshots, captions, and searchable metadata.",
        title: "Media Archive Index",
      },
      ru: {
        archiveNote: "Поисковый прототип по скриншотам, фрагментам и старым веб-материалам.",
        description:
          "Эксперимент по индексации скриншотов, подписей, фрагментов и тегов из мёртвых или умирающих уголков сети. Наполовину search tool, наполовину культурный шкаф-картотека.",
        outcome:
          "Не стал продуктом, но повлиял на дальнейшие паттерны метаданных и тегирования в archive-like интерфейсах.",
        role: "Исследование, таксономия, прототипирование",
        summary: "Эксперимент по индексации скриншотов, подписей и материалов с поисковыми метаданными.",
        title: "Индекс медиа-архива",
      },
    },
    featured: false,
    id: "meme-archaeology-index",
    links: [
      { external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" },
      { href: "/field-notes", kind: "writeup", label: "notes" },
    ],
    stack: ["Node.js", "SQLite", "TypeScript", "Fuse.js"],
    status: "archived",
    yearLabel: "2021",
  },
  {
    archiveId: "LAB-016",
    category: "tools",
    content: {
      en: {
        archiveNote: "Niche editor for fixing awkward sprite atlas formats.",
        description:
          "A utility for inspecting and repacking sprite atlases, mostly born from annoyance with repetitive manual cleanup work.",
        outcome: "Saved time, reduced repetitive grunt work, and made a formerly annoying task mildly tolerable.",
        role: "Utility design and implementation",
        summary: "Sprite atlas inspection and repacking tool for UI asset cleanup.",
        title: "Sprite Atlas Editor",
      },
      ru: {
        archiveNote: "Нишевый редактор для случаев, когда sprite atlas приходят в неудобном формате.",
        description:
          "Утилита для осмотра и перепаковки sprite atlases, родившаяся в основном из раздражения ручной чисткой.",
        outcome: "Сэкономила время, убрала часть рутинной возни и сделала бывшую раздражающей задачу хотя бы терпимой.",
        role: "Проектирование и реализация утилиты",
        summary: "Инструмент для осмотра и перепаковки sprite atlas при чистке UI-ассетов.",
        title: "Редактор sprite atlas",
      },
    },
    featured: false,
    id: "sprite-sheet-confessional",
    links: [{ external: true, href: "https://github.com/ororura", kind: "github", label: "GitHub" }],
    stack: ["Electron", "TypeScript", "Canvas API"],
    status: "maintenance",
    yearLabel: "2022",
  },
];

const projectCategoryMeta: Record<Locale, Record<ProjectCategory, ProjectCategoryMeta>> = {
  en: {
    archived: { label: "archive", tone: "ash" },
    experiments: { label: "experiment", tone: "cyan" },
    tools: { label: "tool", tone: "rust" },
    web: { label: "product", tone: "gold" },
  },
  ru: {
    archived: { label: "архив", tone: "ash" },
    experiments: { label: "эксперимент", tone: "cyan" },
    tools: { label: "инструмент", tone: "rust" },
    web: { label: "продукт", tone: "gold" },
  },
};

const projectStatusMeta: Record<Locale, Record<ProjectStatus, ProjectStatusMeta>> = {
  en: {
    archived: { label: "archived", tone: "ash" },
    live: { label: "live", tone: "cyan" },
    maintenance: { label: "maintenance", tone: "gold" },
    prototype: { label: "prototype", tone: "rust" },
    shipped: { label: "shipped", tone: "gold" },
  },
  ru: {
    archived: { label: "архив", tone: "ash" },
    live: { label: "в проде", tone: "cyan" },
    maintenance: { label: "поддержка", tone: "gold" },
    prototype: { label: "прототип", tone: "rust" },
    shipped: { label: "завершён", tone: "gold" },
  },
};

const projectFilterLabels: Record<Locale, Record<ProjectFilterId, string>> = {
  en: {
    all: "all",
    archived: "archive",
    experiments: "experiments",
    tools: "tools",
    web: "product",
  },
  ru: {
    all: "все",
    archived: "архив",
    experiments: "эксперименты",
    tools: "инструменты",
    web: "продукт",
  },
};

const getProjectRecords = (locale: Locale) => {
  return projectSourceRecords.map(({ content, ...projectRecord }) => ({
    ...projectRecord,
    ...content[locale],
  }));
};

const getFeaturedProjectRecords = (locale: Locale) => {
  return getProjectRecords(locale).filter((projectRecord) => projectRecord.featured);
};

const getArchiveProjectRecords = (locale: Locale) => {
  return getProjectRecords(locale).filter((projectRecord) => !projectRecord.featured);
};

const getProjectRecordById = (locale: Locale, projectId: string) => {
  return (
    getProjectRecords(locale).find((projectRecord) => projectRecord.id === projectId) ?? getProjectRecords(locale)[0]
  );
};

const getProjectFilterOptions = (locale: Locale, projectRecords: ProjectRecord[]) => {
  const filterIds: ProjectFilterId[] = ["all", "web", "tools", "experiments", "archived"];

  return filterIds.map((filterId) => ({
    count:
      filterId === "all"
        ? projectRecords.length
        : projectRecords.filter((projectRecord) => projectRecord.category === filterId).length,
    id: filterId,
    label: projectFilterLabels[locale][filterId],
  }));
};

const filterProjectRecords = (projectRecords: ProjectRecord[], filterId: ProjectFilterId) => {
  if (filterId === "all") {
    return projectRecords;
  }

  return projectRecords.filter((projectRecord) => projectRecord.category === filterId);
};

const getProjectStatusMeta = (locale: Locale, status: ProjectStatus) => {
  return projectStatusMeta[locale][status];
};

const getProjectCategoryMeta = (locale: Locale, category: ProjectCategory) => {
  return projectCategoryMeta[locale][category];
};

export type {
  ProjectCategory,
  ProjectCategoryMeta,
  ProjectFilterId,
  ProjectFilterOption,
  ProjectLink,
  ProjectLinkKind,
  ProjectRecord,
  ProjectStatus,
  ProjectStatusMeta,
};
export {
  filterProjectRecords,
  getArchiveProjectRecords,
  getFeaturedProjectRecords,
  getProjectCategoryMeta,
  getProjectFilterOptions,
  getProjectRecordById,
  getProjectRecords,
  getProjectStatusMeta,
};
