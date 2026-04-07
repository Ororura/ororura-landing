import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import { getProjectCategoryMeta } from "../model/projectRecords";
import { ProjectLinkCluster } from "./ProjectLinkCluster";
import { ProjectStatusSeal } from "./ProjectStatusSeal";

import type { Locale } from "@/shared/config";
import type { ProjectLink, ProjectRecord } from "../model/projectRecords";

type ArchiveRelicCardProps = {
  locale: Locale;
  onHover?: () => void;
  onOpenLink: (link: ProjectLink) => void;
  project: ProjectRecord;
};

const toneClassMap = {
  ash: "from-[#ded2bf20] via-[#ded2bf06] to-transparent",
  cyan: "from-[#6d8f8f50] via-[#6d8f8f08] to-transparent",
  gold: "from-[#8b755050] via-[#8b755008] to-transparent",
  rust: "from-[#8b3b2f50] via-[#8b3b2f08] to-transparent",
} as const;

const ArchiveRelicCard: FC<ArchiveRelicCardProps> = ({ locale, onHover, onOpenLink, project }) => {
  const categoryMeta = getProjectCategoryMeta(locale, project.category);

  return (
    <article className="group relative overflow-hidden rounded-[1.45rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(12,11,12,0.48))] px-4 py-4 transition-all duration-300 hover:border-[#ded2bf2f] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(12,11,12,0.6))]">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r",
          toneClassMap[categoryMeta.tone],
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.035),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">
            {project.archiveId}
          </div>
          <ProjectStatusSeal locale={locale} size="sm" status={project.status} />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.02rem] uppercase tracking-[0.16em] text-[#efe2cb]">{project.title}</h3>
            <div className="mt-2 font-system text-[0.56rem] uppercase tracking-[0.22em] text-[#9f9485]">
              {categoryMeta.label} // {project.yearLabel}
            </div>
          </div>
        </div>

        <p className="mt-4 text-[0.9rem] leading-relaxed text-[#c6baa8]">{project.summary}</p>
        <p className="mt-3 text-[0.82rem] leading-relaxed text-[#9f9383]">{project.archiveNote}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((stackItem) => (
            <span
              className="rounded-full border border-[#ded2bf10] bg-[#ffffff05] px-3 py-1.5 font-system text-[0.5rem] uppercase tracking-[0.2em] text-[#d3c7b4]"
              key={stackItem}
            >
              {stackItem}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <ProjectLinkCluster links={project.links} onHover={onHover} onOpenLink={onOpenLink} size="compact" />
        </div>
      </div>
    </article>
  );
};

export { ArchiveRelicCard };
