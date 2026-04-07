import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import type { ArchiveSector } from "../model/archiveSectors";

type ArchiveSectorPreviewCardProps = {
  className?: string;
  sector: ArchiveSector;
  variant?: "compact" | "detail";
};

const accentClassMap = {
  cyan: {
    line: "from-[#6d8f8f75] via-[#6d8f8f22] to-transparent",
    state: "text-[#9ec0c0]",
  },
  gold: {
    line: "from-[#8b755075] via-[#8b755022] to-transparent",
    state: "text-[#d4c19e]",
  },
  rust: {
    line: "from-[#8b3b2f75] via-[#8b3b2f22] to-transparent",
    state: "text-[#d2a397]",
  },
} as const;

const ArchiveSectorPreviewCard: FC<ArchiveSectorPreviewCardProps> = ({ className, sector, variant = "detail" }) => {
  const accentClasses = accentClassMap[sector.accent];
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "rounded-[1.45rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(12,11,12,0.42))] p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3 font-system text-[0.58rem] uppercase tracking-[0.28em] text-[#8f887c]">
        <span>{sector.order}</span>
        <span className={cn("h-px flex-1 bg-gradient-to-r", accentClasses.line)} />
        <span className={accentClasses.state}>{sector.status}</span>
      </div>

      <div className="mt-4 font-display text-[1.05rem] uppercase tracking-[0.18em] text-[#efe2cb]">{sector.title}</div>
      <div className="mt-2 text-[0.82rem] uppercase tracking-[0.18em] text-[#9a8e7e]">{sector.featureLine}</div>

      <p className={cn("mt-3 text-[0.92rem] leading-relaxed text-[#c8bba8]", isCompact && "text-[0.88rem]")}>
        {isCompact ? sector.preview : sector.description}
      </p>

      {!isCompact ? (
        <>
          <div className="mt-4 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#6d8f8f]">
            {sector.signal}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {sector.records.map((record) => (
              <div
                key={record}
                className="rounded-[1rem] border border-[#ded2bf10] bg-[#ffffff04] px-3 py-2 font-system text-[0.62rem] uppercase tracking-[0.18em] text-[#b4a896]"
              >
                {record}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export { ArchiveSectorPreviewCard };
