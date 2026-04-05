"use client";

import { ArchiveEntryActions, useArchiveTransition } from "@/features/archive-entry";
import { LanguageSwitch } from "@/features/language-switch";
import { SoundToggle, useShrineAudio } from "@/features/sound-toggle";
import { BootLog } from "@/entities/boot-log";
import { RelicInsignia } from "@/entities/relic-insignia";
import { entryCopy } from "@/shared/config";
import { useArchiveLocale } from "@/shared/lib/use-archive-locale";
import { AtmosphericBackground } from "@/shared/ui/atmospheric-background";
import { PanelFrame } from "@/shared/ui/panel-frame";
import { useGateSequence } from "../model/useGateSequence";

const ArchiveGateWidget = () => {
  const { locale, setLocale } = useArchiveLocale("en");
  const copy = entryCopy[locale];
  const { beginTransition, isTransitioning } = useArchiveTransition();
  const { completeSequence, isRevealed, visibleCount } = useGateSequence(copy.bootLines.length);
  const { playClick, playHover, soundEnabled, toggleSound } = useShrineAudio();

  const handleEnter = () => {
    completeSequence();
    void playClick();
    beginTransition("/sanctum", 960);
  };

  const handleSkip = () => {
    completeSequence();
    void playClick();
    beginTransition("/sanctum", 260);
  };

  const handleLocaleChange = (nextLocale: typeof locale) => {
    setLocale(nextLocale);
    void playClick();
  };

  const handleSoundToggle = () => {
    void toggleSound();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-bone">
      <AtmosphericBackground isTransitioning={isTransitioning} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-5 sm:px-8 sm:pt-8 lg:px-12 lg:pt-10">
          <div className="max-w-xs animate-veil-in">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.32em] text-[#8f887c]">
              gate 01 // archive entry
            </div>
            <div className="mt-3 max-w-[17rem] font-system text-[0.64rem] uppercase tracking-[0.2em] text-[#b2a694]">
              {copy.badge}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <div className="animate-veil-in [animation-delay:120ms]">
              <LanguageSwitch
                currentLocale={locale}
                label={copy.languageLabel}
                onChange={handleLocaleChange}
                onHover={playHover}
              />
            </div>

            <div className="animate-veil-in [animation-delay:220ms]">
              <SoundToggle
                enabled={soundEnabled}
                label={soundEnabled ? copy.soundOn : copy.soundOff}
                onHover={playHover}
                onToggle={handleSoundToggle}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-8 pt-6 sm:px-8 lg:px-12">
          <div className="grid w-full max-w-[92rem] items-center gap-10 lg:grid-cols-[0.78fr_1.02fr_0.78fr]">
            <div className="hidden items-end justify-start lg:flex">
              <div className="animate-veil-in [animation-delay:320ms]">
                <BootLog
                  label={copy.bootLabel}
                  lines={copy.bootLines}
                  status={copy.sanctumHint}
                  visibleCount={visibleCount}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <PanelFrame className="w-full max-w-[44rem] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <div className="flex flex-col items-center text-center">
                  <div className="animate-veil-in [animation-delay:180ms]">
                    <RelicInsignia isAwake={isRevealed} />
                  </div>

                  <div className="mt-8 animate-veil-in [animation-delay:280ms] font-system text-[0.58rem] uppercase tracking-[0.36em] text-[#8b7550]">
                    {copy.supportLabel}
                  </div>

                  <h1 className="mt-4 animate-veil-in text-shadow-ritual [animation-delay:360ms] font-display text-[2.5rem] uppercase tracking-[0.24em] text-[#efe2cb] sm:text-[3.3rem]">
                    {copy.title}
                  </h1>

                  <p className="mt-4 max-w-xl animate-veil-in [animation-delay:460ms] text-[0.96rem] leading-relaxed text-[#c7baa7] sm:text-[1.05rem]">
                    {copy.subtitle}
                  </p>

                  <p className="mt-3 max-w-lg animate-veil-in [animation-delay:520ms] text-[0.8rem] uppercase tracking-[0.2em] text-[#938779] sm:text-[0.84rem]">
                    {copy.descriptor}
                  </p>

                  <div className="mt-7 flex w-full max-w-xl animate-veil-in items-center gap-4 [animation-delay:620ms]">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8b75505a] to-[#8b755014]" />
                    <span className="font-system text-[0.58rem] uppercase tracking-[0.32em] text-[#6d8f8f]">
                      {copy.systemTag}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#8b75505a] to-[#8b755014]" />
                  </div>

                  <div className="mt-8 w-full max-w-xl animate-veil-in [animation-delay:720ms]">
                    <ArchiveEntryActions
                      enterHint={copy.enterHint}
                      enterLabel={copy.enterLabel}
                      isBusy={isTransitioning}
                      onEnter={handleEnter}
                      onHover={playHover}
                      onSkip={handleSkip}
                      skipHint={copy.skipHint}
                      skipLabel={copy.skipLabel}
                    />
                  </div>

                  <div className="mt-7 w-full max-w-xl animate-veil-in rounded-[1.4rem] border border-[#ded2bf12] bg-[#ffffff05] px-4 py-4 text-left [animation-delay:780ms]">
                    <div className="font-system text-[0.58rem] uppercase tracking-[0.3em] text-[#8b7550]">
                      {copy.supportLabel}
                    </div>
                    <div className="mt-2 text-[0.88rem] leading-relaxed text-[#c7baa7]">{copy.supportValue}</div>
                  </div>
                </div>
              </PanelFrame>
            </div>

            <div className="flex items-end justify-center lg:hidden">
              <div className="animate-veil-in [animation-delay:320ms]">
                <BootLog
                  label={copy.bootLabel}
                  lines={copy.bootLines}
                  status={copy.sanctumHint}
                  visibleCount={visibleCount}
                />
              </div>
            </div>

            <div className="hidden lg:flex" />
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(139,117,80,0.16),rgba(7,6,7,0.96)_62%,rgba(7,6,7,1)_100%)] transition-opacity duration-700 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      />
    </main>
  );
};

export { ArchiveGateWidget };
