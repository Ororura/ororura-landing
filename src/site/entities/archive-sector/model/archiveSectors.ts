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
    related: ["loadout", "manuscript"]
  },
  {
    accent: "rust",
    href: "/loadout",
    id: "loadout",
    order: "II",
    related: ["quests", "codex"]
  },
  {
    accent: "gold",
    href: "/quests",
    id: "quests",
    order: "III",
    related: ["loadout", "field-notes"]
  },
  {
    accent: "cyan",
    href: "/codex",
    id: "codex",
    order: "IV",
    related: ["loadout", "field-notes"]
  },
  {
    accent: "cyan",
    href: "/field-notes",
    id: "field-notes",
    order: "V",
    related: ["quests", "codex"]
  },
  {
    accent: "rust",
    href: "/open-channel",
    id: "open-channel",
    order: "VI",
    related: ["character-record", "manuscript"]
  },
  {
    accent: "gold",
    href: "/manuscript",
    id: "manuscript",
    order: "VII",
    related: ["character-record", "open-channel"]
  }
];

const archiveSectorContent: Record<Locale, Record<ArchiveSectorId, ArchiveSectorContent>> = {
  en: {
    "character-record": {
      description:
        "The grounded version of the persona. Background, working stance, experience arc, and the practical engineer behind the mask.",
      featureLine: "human profile / methods / operating stance",
      navHint: "identity / background / operating mode",
      preview: "A readable operator file: who is here, what they do, and how they tend to build.",
      records: ["origin log", "working principles", "experience timeline"],
      signal: "identity verified",
      status: "profile stable",
      title: "Character Record"
    },
    loadout: {
      description:
        "Tooling inventory, stack preferences, and the practical chain from idea to shipped interface.",
      featureLine: "stack / tooling / workflow",
      navHint: "gear rack / frameworks / habits",
      preview: "Languages, frameworks, and instruments currently kept sharp enough to ship.",
      records: ["frontend stack", "backend utilities", "workflow habits"],
      signal: "gear calibrated",
      status: "loadout maintained",
      title: "Loadout"
    },
    quests: {
      description:
        "Selected project dossiers. The work with the cleanest signal, strongest scars, or the best lessons attached to it.",
      featureLine: "projects / shipped missions / case files",
      navHint: "project dossiers / shipped work",
      preview: "Where the archive stops implying things and starts showing actual builds.",
      records: ["flagship projects", "case studies", "problem-solving trail"],
      signal: "mission archive loaded",
      status: "quest board active",
      title: "Quests"
    },
    codex: {
      description:
        "A compact doctrine shelf: engineering principles, patterns, mental models, and references worth keeping nearby.",
      featureLine: "knowledge / principles / doctrine",
      navHint: "principles / patterns / references",
      preview: "Notes on how the systems are thought through, not just how they are rendered.",
      records: ["engineering principles", "system patterns", "preferred references"],
      signal: "knowledge shelf indexed",
      status: "codex synchronized",
      title: "Codex"
    },
    "field-notes": {
      description:
        "Short dispatches, essays, fragments, and postmortems. Less polished than the manuscript. More alive.",
      featureLine: "blog / fragments / postmortems",
      navHint: "writing / dispatches / live notes",
      preview: "The part of the archive that still smells slightly like fresh solder and open tabs.",
      records: ["essays", "build notes", "observations"],
      signal: "note relay live",
      status: "field journal open",
      title: "Field Notes"
    },
    "open-channel": {
      description:
        "Contact protocols, preferred signal paths, and the least ceremonial route to a real conversation.",
      featureLine: "contact / signal / collaboration",
      navHint: "contact paths / signal access",
      preview: "For hiring, collaboration, or sending something worth reading.",
      records: ["contact routes", "response protocol", "availability window"],
      signal: "channel open",
      status: "relay stable",
      title: "Open Channel"
    },
    manuscript: {
      description:
        "The printable record. CV, condensed history, and the clean version for people who need the archive translated into document form.",
      featureLine: "cv / resume / formal record",
      navHint: "curriculum / timeline / export",
      preview: "The archive compressed into a document for humans who still require PDFs.",
      records: ["resume sheet", "experience ledger", "downloadable record"],
      signal: "manuscript sealed",
      status: "record export ready",
      title: "Manuscript"
    }
  },
  ru: {
    "character-record": {
      description:
        "Более земная версия персоны. Бэкграунд, рабочая оптика, дуга опыта и реальный инженер за маской.",
      featureLine: "профиль человека / методы / режим работы",
      navHint: "идентичность / бэкграунд / режим",
      preview: "Читаемое досье оператора: кто здесь находится, чем занимается и как именно строит вещи.",
      records: ["журнал происхождения", "рабочие принципы", "линия опыта"],
      signal: "идентичность подтверждена",
      status: "профиль стабилен",
      title: "Character Record"
    },
    loadout: {
      description:
        "Инвентарь инструментов, предпочтения по стеку и реальная цепочка от идеи до отправленного интерфейса.",
      featureLine: "стек / инструменты / workflow",
      navHint: "стойка снаряжения / фреймворки / привычки",
      preview: "Языки, фреймворки и инструменты, которые сейчас действительно заточены под прод.",
      records: ["фронтенд-стек", "бэкенд-утилиты", "рабочие привычки"],
      signal: "снаряжение откалибровано",
      status: "комплект поддерживается",
      title: "Loadout"
    },
    quests: {
      description:
        "Избранные досье проектов. Работа с самым чистым сигналом, лучшими шрамами или полезными выводами.",
      featureLine: "проекты / завершённые миссии / кейсы",
      navHint: "досье проектов / реальная работа",
      preview: "Здесь архив перестаёт намекать и начинает показывать реальные сборки.",
      records: ["флагманские проекты", "кейсы", "след решения задач"],
      signal: "архив миссий загружен",
      status: "доска заданий активна",
      title: "Quests"
    },
    codex: {
      description:
        "Компактная полка доктрины: инженерные принципы, паттерны, ментальные модели и опорные референсы.",
      featureLine: "знание / принципы / доктрина",
      navHint: "принципы / паттерны / референсы",
      preview: "Раздел о том, как системы продумываются, а не только о том, как они выглядят.",
      records: ["инженерные принципы", "системные паттерны", "полезные референсы"],
      signal: "полка знаний индексирована",
      status: "кодекс синхронизирован",
      title: "Codex"
    },
    "field-notes": {
      description:
        "Короткие заметки, эссе, фрагменты и постмортемы. Менее полировано, чем manuscript. И потому живее.",
      featureLine: "блог / фрагменты / постмортемы",
      navHint: "тексты / заметки / живой журнал",
      preview: "Та часть архива, от которой всё ещё немного пахнет свежей пайкой и открытыми вкладками.",
      records: ["эссе", "заметки по сборкам", "наблюдения"],
      signal: "ретранслятор заметок активен",
      status: "полевой журнал открыт",
      title: "Field Notes"
    },
    "open-channel": {
      description:
        "Протоколы связи, предпочтительные каналы и наименее церемониальный путь к нормальному разговору.",
      featureLine: "контакт / сигнал / сотрудничество",
      navHint: "каналы связи / доступ к сигналу",
      preview: "Для найма, коллаборации или отправки чего-то действительно стоящего.",
      records: ["маршруты связи", "протокол ответа", "окно доступности"],
      signal: "канал открыт",
      status: "ретранслятор стабилен",
      title: "Open Channel"
    },
    manuscript: {
      description:
        "Печатная версия записи. CV, сжатая история и чистая форма для тех, кому архив всё ещё нужно переводить в документ.",
      featureLine: "cv / резюме / формальная запись",
      navHint: "curriculum / таймлайн / экспорт",
      preview: "Архив, сжатый в документ для людей, которым по-прежнему нужен PDF.",
      records: ["лист резюме", "реестр опыта", "выгружаемая запись"],
      signal: "манускрипт запечатан",
      status: "экспорт записи готов",
      title: "Manuscript"
    }
  }
};

const featuredArchiveSectorIds: ArchiveSectorId[] = ["quests", "loadout", "field-notes"];

const getArchiveSectors = (locale: Locale) => {
  return archiveSectorRecords.map((sectorRecord) => ({
    ...sectorRecord,
    ...archiveSectorContent[locale][sectorRecord.id]
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
export { featuredArchiveSectorIds, getArchiveSector, getArchiveSectors, getFeaturedArchiveSectors, getRelatedArchiveSectors };
