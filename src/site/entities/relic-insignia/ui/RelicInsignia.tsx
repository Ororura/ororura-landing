import { cn } from "@/shared/lib/cn";

type RelicInsigniaProps = {
  isAwake: boolean;
};

const RelicInsignia = ({ isAwake }: RelicInsigniaProps) => {
  return (
    <div
      className={cn(
        "relative flex h-44 w-44 items-center justify-center rounded-full border border-[#8b755038] bg-[radial-gradient(circle,rgba(139,117,80,0.08),transparent_68%)] shadow-glyph transition-all duration-700 sm:h-56 sm:w-56",
        isAwake ? "scale-100 opacity-100" : "scale-[0.96] opacity-70"
      )}
    >
      <div className="absolute inset-0 rounded-full border border-[#ded2bf14]" />
      <div className="absolute inset-[10%] rounded-full border border-[#8b755026] motion-safe:animate-quiet-pulse" />
      <div className="absolute inset-[19%] rounded-full border border-[#6d8f8f24]" />

      <svg
        aria-hidden="true"
        className="relative h-[78%] w-[78%] text-[#d3c4ab]"
        viewBox="0 0 240 240"
        fill="none"
      >
        <defs>
          <linearGradient id="sigilStroke" x1="0" x2="240" y1="0" y2="240">
            <stop offset="0%" stopColor="#8b7550" />
            <stop offset="52%" stopColor="#ded2bf" />
            <stop offset="100%" stopColor="#6d8f8f" />
          </linearGradient>
          <radialGradient id="sigilCore" cx="0" cy="0" r="1" gradientTransform="translate(120 120) rotate(90) scale(72)">
            <stop offset="0%" stopColor="#8b3b2f" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8b3b2f" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="120" cy="120" fill="url(#sigilCore)" r="72" />
        <g className="origin-center motion-safe:animate-slow-spin" opacity="0.85">
          <circle cx="120" cy="120" r="88" stroke="url(#sigilStroke)" strokeDasharray="8 10" strokeWidth="1.3" />
          <path
            d="M120 28L135 61L172 68L146 94L152 132L120 114L88 132L94 94L68 68L105 61L120 28Z"
            stroke="url(#sigilStroke)"
            strokeWidth="1.6"
          />
        </g>

        <circle cx="120" cy="120" r="52" stroke="url(#sigilStroke)" strokeOpacity="0.6" strokeWidth="1.4" />
        <path d="M120 62V178" stroke="url(#sigilStroke)" strokeLinecap="round" strokeWidth="2.1" />
        <path d="M78 120H162" stroke="url(#sigilStroke)" strokeLinecap="round" strokeOpacity="0.42" strokeWidth="1.4" />
        <path d="M120 84L147 120L120 156L93 120L120 84Z" stroke="url(#sigilStroke)" strokeWidth="2" />
        <circle cx="120" cy="120" fill="#ded2bf" fillOpacity="0.12" r="12" stroke="url(#sigilStroke)" strokeWidth="1.3" />
        <path d="M120 102V138" stroke="url(#sigilStroke)" strokeLinecap="round" strokeWidth="1.4" />
        <path d="M108 120H132" stroke="url(#sigilStroke)" strokeLinecap="round" strokeWidth="1.2" />
        <path d="M120 178L137 202" stroke="url(#sigilStroke)" strokeWidth="1.5" />
        <path d="M120 178L103 202" stroke="url(#sigilStroke)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export { RelicInsignia };

