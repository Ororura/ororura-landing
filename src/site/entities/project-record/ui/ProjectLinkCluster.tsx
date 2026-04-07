import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import type { ProjectLink } from "../model/projectRecords";

type ProjectLinkClusterProps = {
  links: ProjectLink[];
  onHover?: () => void;
  onOpenLink: (link: ProjectLink) => void;
  size?: "compact" | "regular";
};

const toneClassMap = {
  contact:
    "border-[#8b3b2f38] hover:border-[#8b3b2f72] hover:bg-[linear-gradient(180deg,rgba(139,59,47,0.14),rgba(255,255,255,0.02))]",
  github:
    "border-[#6d8f8f38] hover:border-[#6d8f8f72] hover:bg-[linear-gradient(180deg,rgba(109,143,143,0.14),rgba(255,255,255,0.02))]",
  live: "border-[#8b755038] hover:border-[#8b755072] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.14),rgba(255,255,255,0.02))]",
  writeup:
    "border-[#ded2bf1c] hover:border-[#ded2bf44] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
} as const;

const ProjectLinkCluster: FC<ProjectLinkClusterProps> = ({ links, onHover, onOpenLink, size = "regular" }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <button
          className={cn(
            "rounded-full border bg-[#ffffff03] font-system uppercase tracking-[0.24em] text-[#d6c9b6] transition-all duration-300",
            toneClassMap[link.kind],
            size === "compact" ? "px-3 py-1.5 text-[0.52rem]" : "px-4 py-2 text-[0.56rem]",
          )}
          key={`${link.href}-${link.label}`}
          onClick={() => {
            onOpenLink(link);
          }}
          onPointerEnter={onHover}
          type="button"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
};

export { ProjectLinkCluster };
