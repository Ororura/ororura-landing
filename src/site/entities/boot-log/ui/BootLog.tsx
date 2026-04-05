import { cn } from "@/shared/lib/cn";

type BootLogProps = {
  label: string;
  lines: string[];
  status: string;
  visibleCount: number;
};

const BootLog = ({ label, lines, status, visibleCount }: BootLogProps) => {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.28em] text-[#8b7550]">
        <span>{label}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#8b75504f] to-transparent" />
      </div>

      <div className="mt-4 space-y-2">
        {lines.map((line, index) => {
          const isVisible = index < visibleCount;

          return (
            <div
              key={line}
              className={cn(
                "flex items-center gap-3 font-system text-[0.68rem] uppercase tracking-[0.16em] text-[#9f988c] transition-all duration-500",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
            >
              <span className="w-6 text-[#6d8f8f]">{String(index + 1).padStart(2, "0")}</span>
              <span>{line}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-3 font-system text-[0.66rem] uppercase tracking-[0.22em] text-[#6d8f8f]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f] shadow-[0_0_10px_rgba(109,143,143,0.5)]" />
        <span>{status}</span>
        <span className="animate-cursor-blink text-[#bdb4a6]">_</span>
      </div>
    </div>
  );
};

export { BootLog };

