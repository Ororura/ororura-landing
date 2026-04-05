import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type PanelFrameProps = {
  children: ReactNode;
  className?: string;
};

const PanelFrame = ({ children, className }: PanelFrameProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[#ded2bf1f] bg-[linear-gradient(180deg,rgba(17,16,19,0.9),rgba(10,9,10,0.86))] shadow-shrine backdrop-blur-md",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-[12px] rounded-[1.55rem] border border-[#8b755026]" />
      <div className="pointer-events-none absolute inset-[22px] rounded-[1.2rem] border border-[#ded2bf10]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,117,80,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(91,22,21,0.13),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#ded2bf2f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ded2bf24] to-transparent" />

      <span className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-[#8b75507a]" />
      <span className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-[#8b75507a]" />
      <span className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-[#8b75507a]" />
      <span className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-[#8b75507a]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export { PanelFrame };

