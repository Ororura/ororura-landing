import { getProjectCategoryMeta } from "../model/projectRecords";
import { ProjectLinkCluster } from "./ProjectLinkCluster";
import { ProjectStatusSeal } from "./ProjectStatusSeal";

import type { Locale } from "@/shared/config";
import type { ProjectLink, ProjectRecord } from "../model/projectRecords";

type ProjectInspectLabels = {
  linksLabel: string;
  outcomeLabel: string;
  recordLabel: string;
  roleLabel: string;
  stackLabel: string;
};

type ProjectInspectPanelProps = {
  labels: ProjectInspectLabels;
  locale: Locale;
  onHover?: () => void;
  onOpenLink: (link: ProjectLink) => void;
  project: ProjectRecord;
};

const ProjectInspectPanel = ({
  labels,
  locale,
  onHover,
  onOpenLink,
  project
}: ProjectInspectPanelProps) => {
  const categoryMeta = getProjectCategoryMeta(locale, project.category);

  return (
    <div className="rounded-[1.75rem] border border-[#ded2bf12] bg-[radial-gradient(circle_at_top,rgba(139,117,80,0.12),transparent_32%),linear-gradient(180deg,rgba(17,16,19,0.88),rgba(10,9,10,0.78))] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
          {labels.recordLabel} // {project.archiveId}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ProjectStatusSeal locale={locale} status={project.status} />
          <span className="font-system text-[0.56rem] uppercase tracking-[0.24em] text-[#9d9182]">
            {categoryMeta.label}
          </span>
        </div>
      </div>

      <h3 className="mt-5 font-display text-[1.65rem] uppercase tracking-[0.18em] text-[#f0e2cb] sm:text-[2rem]">
        {project.title}
      </h3>

      <p className="mt-4 text-[1rem] leading-relaxed text-[#d2c6b3]">{project.description}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.25rem] border border-[#ded2bf10] bg-[#ffffff04] px-4 py-4">
          <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">{labels.roleLabel}</div>
          <div className="mt-3 text-[0.9rem] leading-relaxed text-[#c9bdab]">{project.role}</div>
        </div>

        <div className="rounded-[1.25rem] border border-[#ded2bf10] bg-[#ffffff04] px-4 py-4">
          <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">{labels.outcomeLabel}</div>
          <div className="mt-3 text-[0.9rem] leading-relaxed text-[#c9bdab]">{project.outcome}</div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(14,13,14,0.62))] px-4 py-4">
        <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">{labels.stackLabel}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((stackItem) => (
            <span
              className="rounded-full border border-[#ded2bf12] bg-[#ffffff05] px-3 py-1.5 font-system text-[0.54rem] uppercase tracking-[0.22em] text-[#d7ccb8]"
              key={stackItem}
            >
              {stackItem}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-[#ded2bf10] bg-[#ffffff04] px-4 py-4">
        <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">{labels.linksLabel}</div>
        <div className="mt-4">
          <ProjectLinkCluster links={project.links} onHover={onHover} onOpenLink={onOpenLink} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-system text-[0.58rem] uppercase tracking-[0.24em] text-[#9f9384]">
        <span>{project.archiveNote}</span>
        <span className="text-[#6d8f8f]">{project.yearLabel}</span>
      </div>
    </div>
  );
};

export { ProjectInspectPanel };
