import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import type { ArchiveSector } from "../model/archiveSectors";

type ArchiveSectorRouteItemProps = {
  isActive: boolean;
  onInspect?: () => void;
  onOpen: () => void;
  sector: ArchiveSector;
};

const accentClassMap = {
  cyan: {
    active:
      "border-[#6d8f8f66] bg-[linear-gradient(180deg,rgba(109,143,143,0.12),rgba(12,15,16,0.46))] shadow-[0_0_0_1px_rgba(109,143,143,0.08),0_18px_40px_rgba(0,0,0,0.28)]",
    glow: "bg-[#6d8f8f]",
  },
  gold: {
    active:
      "border-[#8b755066] bg-[linear-gradient(180deg,rgba(139,117,80,0.16),rgba(19,17,15,0.56))] shadow-[0_0_0_1px_rgba(139,117,80,0.08),0_18px_40px_rgba(0,0,0,0.28)]",
    glow: "bg-[#8b7550]",
  },
  rust: {
    active:
      "border-[#8b3b2f66] bg-[linear-gradient(180deg,rgba(139,59,47,0.16),rgba(19,15,15,0.56))] shadow-[0_0_0_1px_rgba(139,59,47,0.08),0_18px_40px_rgba(0,0,0,0.28)]",
    glow: "bg-[#8b3b2f]",
  },
} as const;

const ArchiveSectorRouteItem: FC<ArchiveSectorRouteItemProps> = ({ isActive, onInspect, onOpen, sector }) => {
  const accentClasses = accentClassMap[sector.accent];

  return (
    <button
      className={cn(
        "group relative w-full overflow-hidden rounded-[1.35rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-4 text-left transition-all duration-300 hover:border-[#ded2bf32] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] focus:outline-none focus:ring-1 focus:ring-[#ded2bf4d]",
        isActive && accentClasses.active,
      )}
      onClick={onOpen}
      onFocus={onInspect}
      onPointerEnter={onInspect}
      type="button"
    >
      <div className="pointer-events-none absolute inset-y-3 left-2 w-px bg-gradient-to-b from-transparent via-[#ded2bf1f] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.04),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className="min-w-[2.75rem] pt-1">
          <div className="font-display text-[1rem] uppercase tracking-[0.26em] text-[#e5d8c2]">{sector.order}</div>
          <div
            className={cn(
              "mt-2 h-[2px] w-8 rounded-full bg-[#ded2bf22] transition-all duration-300",
              isActive && accentClasses.glow,
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-display text-[1.02rem] uppercase tracking-[0.18em] text-[#efe2cb]">{sector.title}</div>
          <div className="mt-2 text-[0.83rem] leading-relaxed text-[#c6baa8]">{sector.navHint}</div>
        </div>

        <div className="flex items-center pt-1">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-[#ded2bf22] bg-transparent transition-all duration-300",
              isActive && accentClasses.glow,
            )}
          />
        </div>
      </div>
    </button>
  );
};

export { ArchiveSectorRouteItem };
