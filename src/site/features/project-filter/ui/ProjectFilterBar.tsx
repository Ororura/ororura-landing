import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import type { ProjectFilterId, ProjectFilterOption } from "@/entities/project-record";

type ProjectFilterBarProps = {
  activeFilter: ProjectFilterId;
  filters: ProjectFilterOption[];
  label: string;
  onChange: (filterId: ProjectFilterId) => void;
  onHover?: () => void;
};

const ProjectFilterBar: FC<ProjectFilterBarProps> = ({ activeFilter, filters, label, onChange, onHover }) => {
  return (
    <div>
      <div className="font-system text-[0.56rem] uppercase tracking-[0.3em] text-[#8b7550]">{label}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filterOption) => {
          const isActive = filterOption.id === activeFilter;

          return (
            <button
              className={cn(
                "rounded-full border px-3 py-2 font-system text-[0.58rem] uppercase tracking-[0.24em] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#ded2bf4d]",
                isActive
                  ? "border-[#8b755062] bg-[linear-gradient(180deg,rgba(139,117,80,0.18),rgba(91,22,21,0.16))] text-[#f0e2cb]"
                  : "border-[#ded2bf16] bg-[#ffffff04] text-[#bfb4a1] hover:border-[#ded2bf36] hover:bg-[#ffffff08]",
              )}
              key={filterOption.id}
              onClick={() => {
                onChange(filterOption.id);
              }}
              onPointerEnter={onHover}
              type="button"
            >
              {filterOption.label} [{filterOption.count}]
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { ProjectFilterBar };
