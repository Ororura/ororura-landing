import { cn } from "@/shared/lib/cn";

type SoundToggleProps = {
  enabled: boolean;
  label: string;
  onHover?: () => void;
  onToggle: () => void;
};

const bars = [0, 1, 2];

const SoundToggle = ({ enabled, label, onHover, onToggle }: SoundToggleProps) => {
  return (
    <button
      className="group flex items-center gap-3 rounded-full border border-[#ded2bf14] bg-[#0d0b0dc9] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:border-[#8b755052] focus:outline-none focus:ring-1 focus:ring-[#ded2bf4d]"
      onClick={onToggle}
      onPointerEnter={onHover}
      type="button"
    >
      <span className="flex h-6 items-end gap-1">
        {bars.map((bar) => {
          const isLit = enabled && bar < 3;

          return (
            <span
              key={bar}
              className={cn(
                "w-[3px] rounded-full bg-[#8f887c] transition-all duration-300",
                bar === 0 && "h-2.5",
                bar === 1 && "h-4",
                bar === 2 && "h-5.5",
                isLit && "bg-[#6d8f8f] shadow-[0_0_12px_rgba(109,143,143,0.45)]"
              )}
            />
          );
        })}
      </span>

      <span className="font-system text-[0.65rem] uppercase tracking-[0.24em] text-[#cdc0ad]">{label}</span>
    </button>
  );
};

export { SoundToggle };

