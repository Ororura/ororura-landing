import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import { getProjectStatusMeta } from "../model/projectRecords";

import type { Locale } from "@/shared/config";
import type { ProjectStatus } from "../model/projectRecords";

type ProjectStatusSealProps = {
  locale: Locale;
  size?: "md" | "sm";
  status: ProjectStatus;
};

const toneClassMap = {
  ash: "border-[#ded2bf18] bg-[#ffffff06] text-[#bfb29e]",
  cyan: "border-[#6d8f8f42] bg-[linear-gradient(180deg,rgba(109,143,143,0.18),rgba(255,255,255,0.02))] text-[#b9d5d5]",
  gold: "border-[#8b755042] bg-[linear-gradient(180deg,rgba(139,117,80,0.18),rgba(255,255,255,0.02))] text-[#e0d0b0]",
  rust: "border-[#8b3b2f42] bg-[linear-gradient(180deg,rgba(139,59,47,0.18),rgba(255,255,255,0.02))] text-[#d7a79a]",
} as const;

const ProjectStatusSeal: FC<ProjectStatusSealProps> = ({ locale, size = "md", status }) => {
  const statusMeta = getProjectStatusMeta(locale, status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-system uppercase tracking-[0.24em]",
        toneClassMap[statusMeta.tone],
        size === "sm" ? "px-2.5 py-1 text-[0.52rem]" : "px-3 py-1.5 text-[0.58rem]",
      )}
    >
      {statusMeta.label}
    </span>
  );
};

export { ProjectStatusSeal };
