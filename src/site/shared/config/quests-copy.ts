import type { Locale } from "./entry-copy";
import type { QuickAccessLink } from "./sanctum-copy";

type QuestsPageStatLabel =
  | "archiveCount"
  | "featuredCount"
  | "stackCount"
  | "workSpan";

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
    archiveEmpty: "No relics match the current archive filter. Change the filing mode and the shelf repopulates.",
    archiveIntro:
      "Smaller records, stranger tools, prototypes, and useful fragments. Less polished than the featured dossiers. Still worth inspecting.",
    archiveLabel: "archive // side quests // relic shelf",
    chamberLabel: "sanctum.route // quests",
    chamberStatus: "professional work indexed // archive shelf online",
    currentFilterLabel: "active filter",
    descriptor:
      "A project chamber for shipped interfaces, engineering systems, and a few deliberate side-quests. The presentation is atmospheric. The work is real.",
    featuredIntro:
      "Primary case records. Readable enough for hiring panels, structured enough for engineers, still filed like artifacts.",
    featuredLabel: "featured quests",
    filterLabel: "archive filter",
    headingEyebrow: "quest log // professional record chamber",
    inspectHint: "hover or select a dossier to move it into inspect focus",
    inspectLabel: "inspect panel",
    intro:
      "Featured work is presented as quest records: what was built, what role was played, what stack carried it, and why it mattered.",
    languageLabel: "Language",
    linksLabel: "links",
    openChannelLabel: "открыть канал",
    outcomeLabel: "outcome",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "open-source traces / repo index",
        id: "github",
        label: "GitHub",
        signal: "public mirror",
        tone: "gold"
      },
      {
        href: "/manuscript",
        hint: "condensed CV / printable record",
        id: "cv",
        label: "Manuscript",
        signal: "formal record",
        tone: "rust"
      },
      {
        href: "/open-channel",
        hint: "contact / case file requests",
        id: "telegram",
        label: "Open Channel",
        signal: "direct relay",
        tone: "cyan"
      }
    ],
    quickLinksIntro: "Fast exits for readers who want the public trace, the formal document, or a direct signal path.",
    quickLinksLabel: "quick exits",
    recordLabel: "record id",
    returnLabel: "return to sanctum",
    roleLabel: "role",
    soundOff: "Sound: muted",
    soundOn: "Sound: active",
    stackLabel: "stack",
    statsLabel: "quest metrics",
    statsLabels: {
      archiveCount: "archive relics",
      featuredCount: "featured dossiers",
      stackCount: "stacks in rotation",
      workSpan: "work span"
    },
    systemLabel: "system signal",
    systemValue: "quests.index == readable // atmospheric // bilingual-ready",
    title: "Quests"
  },
  ru: {
    archiveEmpty: "Под текущий фильтр ничего не попало. Смените режим архивации и полка снова заполнится.",
    archiveIntro:
      "Меньшие записи, более странные инструменты, прототипы и полезные фрагменты. Менее отполировано, чем featured dossiers. Всё ещё стоит осмотра.",
    archiveLabel: "архив // side quests // полка реликтов",
    chamberLabel: "sanctum.route // quests",
    chamberStatus: "профессиональная работа индексирована // полка архива онлайн",
    currentFilterLabel: "активный фильтр",
    descriptor:
      "Камера проектов для отправленных интерфейсов, инженерных систем и нескольких намеренно странных сайд-квестов. Подача атмосферная. Работа реальная.",
    featuredIntro:
      "Основные кейсы. Достаточно читаемо для найма, достаточно структурно для инженеров, но по-прежнему подано как артефакты.",
    featuredLabel: "featured quests",
    filterLabel: "фильтр архива",
    headingEyebrow: "журнал квестов // камера профессиональных записей",
    inspectHint: "наведите или выберите досье, чтобы перенести его в режим осмотра",
    inspectLabel: "панель осмотра",
    intro:
      "Главная работа подана как квестовые записи: что было собрано, какая была роль, каким стеком это держалось и почему это важно.",
    languageLabel: "Язык",
    linksLabel: "ссылки",
    openChannelLabel: "open channel",
    outcomeLabel: "результат",
    quickLinks: [
      {
        external: true,
        href: "https://github.com/ororura",
        hint: "open-source следы / индекс репозиториев",
        id: "github",
        label: "GitHub",
        signal: "публичное зеркало",
        tone: "gold"
      },
      {
        href: "/manuscript",
        hint: "сжатое CV / печатная запись",
        id: "cv",
        label: "Manuscript",
        signal: "формальная запись",
        tone: "rust"
      },
      {
        href: "/open-channel",
        hint: "контакт / запрос кейсов",
        id: "telegram",
        label: "Open Channel",
        signal: "прямой ретранслятор",
        tone: "cyan"
      }
    ],
    quickLinksIntro: "Быстрые выходы для тех, кому нужен публичный след, формальный документ или прямой канал связи.",
    quickLinksLabel: "быстрые выходы",
    recordLabel: "id записи",
    returnLabel: "вернуться в sanctum",
    roleLabel: "роль",
    soundOff: "Звук: выключен",
    soundOn: "Звук: активен",
    stackLabel: "стек",
    statsLabel: "метрики квестов",
    statsLabels: {
      archiveCount: "архивных реликтов",
      featuredCount: "главных досье",
      stackCount: "стеков в работе",
      workSpan: "рабочий диапазон"
    },
    systemLabel: "системный сигнал",
    systemValue: "quests.index == читаемо // атмосферно // готово к ru/en",
    title: "Quests"
  }
};

export type { QuestsContent, QuestsPageStatLabel };
export { questsCopy };
