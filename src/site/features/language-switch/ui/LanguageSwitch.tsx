import type { Locale } from "@/shared/config";

import { cn } from "@/shared/lib/cn";

type LanguageSwitchProps = {
  currentLocale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
  onHover?: () => void;
};

const locales: Locale[] = ["en", "ru"];

const LanguageSwitch = ({ currentLocale, label, onChange, onHover }: LanguageSwitchProps) => {
  return (
    <div className="rounded-full border border-[#ded2bf14] bg-[#0d0b0dc9] px-2 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="px-2 pb-1 font-system text-[0.55rem] uppercase tracking-[0.28em] text-[#8f887c]">{label}</div>
      <div className="flex gap-1">
        {locales.map((locale) => {
          const isActive = locale === currentLocale;

          return (
            <button
              key={locale}
              className={cn(
                "rounded-full px-3 py-1.5 font-system text-[0.67rem] uppercase tracking-[0.28em] transition-all duration-300",
                isActive
                  ? "bg-[linear-gradient(180deg,rgba(139,117,80,0.3),rgba(91,22,21,0.22))] text-bone"
                  : "text-[#8f887c] hover:bg-[#ded2bf0b] hover:text-[#d1c4b1]"
              )}
              onClick={() => onChange(locale)}
              onPointerEnter={onHover}
              type="button"
            >
              {locale}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { LanguageSwitch };

