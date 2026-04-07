import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

type AtmosphericBackgroundProps = {
  isTransitioning?: boolean;
};

const AtmosphericBackground: FC<AtmosphericBackgroundProps> = ({ isTransitioning = false }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-shrine-grain opacity-60" />
      <div className="absolute inset-0 bg-engraved-grid opacity-[0.08]" />

      <div className="absolute inset-0">
        <div className="absolute left-[-12%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(91,22,21,0.25)_0,rgba(91,22,21,0.08)_28%,transparent_68%)] blur-3xl motion-safe:animate-smoke-drift" />
        <div className="absolute bottom-[-18%] right-[-8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(139,117,80,0.2)_0,rgba(139,117,80,0.08)_26%,transparent_64%)] blur-3xl motion-safe:animate-smoke-drift" />
        <div className="absolute left-1/2 top-[12%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,143,143,0.12)_0,rgba(109,143,143,0.02)_34%,transparent_72%)] blur-3xl" />
      </div>

      <div className="absolute inset-y-0 left-0 w-[14vw] bg-[linear-gradient(90deg,rgba(222,210,191,0.06),transparent)] opacity-50" />
      <div className="absolute inset-y-0 right-0 w-[14vw] bg-[linear-gradient(270deg,rgba(222,210,191,0.06),transparent)] opacity-50" />

      <div className="absolute inset-0">
        <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-[#8b755033] to-transparent lg:block" />
        <div className="absolute right-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-[#8b755033] to-transparent lg:block" />
        <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#8b755033] to-transparent lg:block" />
        <div className="absolute bottom-8 left-8 right-8 hidden h-px bg-gradient-to-r from-transparent via-[#8b755033] to-transparent lg:block" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgba(0,0,0,0.36)_70%,rgba(0,0,0,0.82)_100%)]" />

      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,210,191,0.08),rgba(7,6,7,0.9)_54%,rgba(7,6,7,1)_100%)] transition-all duration-1000",
          isTransitioning ? "opacity-100 motion-safe:animate-gate-close" : "opacity-0"
        )}
      />
    </div>
  );
};

export { AtmosphericBackground };
