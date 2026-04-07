import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import { getProjectCategoryMeta } from "../model/projectRecords";
import { ProjectStatusSeal } from "./ProjectStatusSeal";

import type { Locale } from "@/shared/config";
import type { ProjectRecord } from "../model/projectRecords";

type FeaturedQuestRecordProps = {
  isActive: boolean;
  locale: Locale;
  onInspect: () => void;
  project: ProjectRecord;
};

const toneClassMap = {
  ash: "from-[#ded2bf18] via-[#ded2bf08] to-transparent",
  cyan: "from-[#6d8f8f52] via-[#6d8f8f12] to-transparent",
  gold: "from-[#8b755052] via-[#8b755012] to-transparent",
  rust: "from-[#8b3b2f52] via-[#8b3b2f12] to-transparent",
} as const;

const FeaturedQuestRecord: FC<FeaturedQuestRecordProps> = ({ isActive, locale, onInspect, project }) => {
  const categoryMeta = getProjectCategoryMeta(locale, project.category);

  return (
    <button
      className={cn(
        "group relative w-full overflow-hidden rounded-[1.55rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(12,11,12,0.48))] px-4 py-4 text-left transition-all duration-300 hover:border-[#ded2bf32] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(12,11,12,0.58))] focus:outline-none focus:ring-1 focus:ring-[#ded2bf4d]",
        isActive &&
          "border-[#8b75505a] bg-[linear-gradient(180deg,rgba(139,117,80,0.14),rgba(12,11,12,0.62))] shadow-[0_0_0_1px_rgba(139,117,80,0.08),0_18px_40px_rgba(0,0,0,0.28)]",
      )}
      onClick={onInspect}
      onFocus={onInspect}
      onPointerEnter={onInspect}
      type="button"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r",
          toneClassMap[categoryMeta.tone],
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.04),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="font-system text-[0.56rem] uppercase tracking-[0.32em] text-[#8b7550]">{project.archiveId}</div>
        <div className="flex flex-wrap items-center gap-2">
          <ProjectStatusSeal locale={locale} size="sm" status={project.status} />
          <span className="font-system text-[0.54rem] uppercase tracking-[0.24em] text-[#9d9182]">
            {categoryMeta.label}
          </span>
        </div>
      </div>

      <div className="mt-4 font-display text-[1.12rem] uppercase tracking-[0.16em] text-[#efe2cb]">{project.title}</div>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-[#cbc0ad]">{project.summary}</p>

      <div className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-[#a99988]">{project.role}</div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((stackItem) => (
          <span
            className="rounded-full border border-[#ded2bf12] bg-[#ffffff05] px-3 py-1.5 font-system text-[0.52rem] uppercase tracking-[0.2em] text-[#d5cab8]"
            key={stackItem}
          >
            {stackItem}
          </span>
        ))}
      </div>
    </button>
  );
};

export { FeaturedQuestRecord };
