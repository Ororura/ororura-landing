import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type RitualButtonVariant = "primary" | "secondary";

type RitualButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  hint?: string;
  variant?: RitualButtonVariant;
};

const variantClasses: Record<RitualButtonVariant, string> = {
  primary:
    "border-[#8b755078] bg-[linear-gradient(180deg,rgba(139,117,80,0.22),rgba(91,22,21,0.18))] text-bone hover:border-[#ded2bf66] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.34),rgba(91,22,21,0.28))]",
  secondary:
    "border-[#ded2bf1f] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] text-[#c2b6a5] hover:border-[#8b755056] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.12),rgba(17,16,19,0.25))]"
};

const RitualButton: FC<RitualButtonProps> = ({
  children,
  className,
  disabled,
  hint,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={cn(
        "group relative flex min-h-[4.5rem] w-full flex-col items-start justify-center overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#ded2bf4d] disabled:cursor-not-allowed disabled:opacity-55",
        variantClasses[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="font-display text-[0.95rem] uppercase tracking-[0.28em]">{children}</span>
      {hint ? (
        <span className="mt-1 font-system text-[0.65rem] uppercase tracking-[0.22em] text-[#8f8a80]">
          {hint}
        </span>
      ) : null}
    </button>
  );
};

export { RitualButton };
