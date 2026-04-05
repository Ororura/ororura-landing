"use client";

import type { FC } from "react";

import { useArchiveTransition } from "@/features/archive-entry";
import { LanguageSwitch } from "@/features/language-switch";
import { SoundToggle, useShrineAudio } from "@/features/sound-toggle";
import { ArchiveSectorPreviewCard, getArchiveSector, getRelatedArchiveSectors } from "@/entities/archive-sector";
import type { ArchiveSectorId } from "@/entities/archive-sector";
import { RelicInsignia } from "@/entities/relic-insignia";
import { sanctumCopy } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { useArchiveLocale } from "@/shared/lib/use-archive-locale";
import { AtmosphericBackground } from "@/shared/ui/atmospheric-background";
import { PanelFrame } from "@/shared/ui/panel-frame";

type ArchiveSectorShellWidgetProps = {
  sectorId: ArchiveSectorId;
};

const ArchiveSectorShellWidget: FC<ArchiveSectorShellWidgetProps> = ({ sectorId }) => {
  const { locale, setLocale } = useArchiveLocale("en");
  const copy = sanctumCopy[locale];
  const sector = getArchiveSector(locale, sectorId);
  const openChannelSector = getArchiveSector(locale, "open-channel");
  const relatedSectors = getRelatedArchiveSectors(locale, sectorId);
  const { beginTransition, isTransitioning } = useArchiveTransition();
  const { playClick, playHover, playNavigate, soundEnabled, toggleSound } = useShrineAudio();

  const handleOpenChamber = (href: string) => {
    void playNavigate();
    beginTransition(href, 420);
  };

  const handleLocaleChange = (nextLocale: typeof locale) => {
    setLocale(nextLocale);
    void playClick();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-bone">
      <AtmosphericBackground isTransitioning={isTransitioning} />

      <div className="relative z-10 flex min-h-screen flex-col px-4 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-md animate-veil-in">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8f887c]">
              {copy.sectorPlaceholderEyebrow}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#b0a492]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f] shadow-[0_0_14px_rgba(109,143,143,0.42)]" />
              <span>{sector.status}</span>
              <span className="text-[#8b7550]">{sector.featureLine}</span>
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
                onToggle={() => {
                  void toggleSound();
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center pt-6">
          <PanelFrame className="w-full max-w-[88rem] px-5 py-5 sm:px-7 sm:py-7">
            <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
              <section className="relative overflow-hidden rounded-[1.9rem] border border-[#ded2bf12] bg-[radial-gradient(circle_at_top,rgba(139,117,80,0.12),transparent_28%),linear-gradient(180deg,rgba(17,16,19,0.92),rgba(9,8,9,0.82))] px-5 py-6 sm:px-7 sm:py-8 animate-veil-in [animation-delay:180ms]">
                <div className="pointer-events-none absolute inset-0 bg-shrine-grain opacity-45" />
                <div className="pointer-events-none absolute inset-[14px] rounded-[1.55rem] border border-[#8b755022]" />

                <div className="relative">
                  <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                        {sector.order} // {sector.title}
                      </div>
                      <h1 className="mt-4 font-display text-[2.3rem] uppercase tracking-[0.2em] text-[#f0e2cb] sm:text-[3rem]">
                        {sector.title}
                      </h1>
                      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#d0c4b2]">{sector.preview}</p>
                    </div>

                    <div className="mx-auto lg:mx-0">
                      <RelicInsignia isAwake={!isTransitioning} />
                    </div>
                  </div>

                  <p className="mt-6 max-w-3xl text-[0.92rem] leading-relaxed text-[#b3a895]">{sector.description}</p>

                  <div className="mt-7 flex flex-wrap items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#cbbda8]">
                    <span className="rounded-full border border-[#ded2bf16] bg-[#ffffff05] px-4 py-2">
                      {sector.signal}
                    </span>
                    <span className="rounded-full border border-[#ded2bf16] bg-[#ffffff05] px-4 py-2">
                      {sector.featureLine}
                    </span>
                    <span className="rounded-full border border-[#ded2bf16] bg-[#ffffff05] px-4 py-2">
                      {copy.archiveReadyLabel}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {sector.records.map((record) => (
                      <div
                        className="rounded-[1.25rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4"
                        key={record}
                      >
                        <div className="font-system text-[0.55rem] uppercase tracking-[0.28em] text-[#8b7550]">
                          {copy.sectorPayloadLabel}
                        </div>
                        <div className="mt-2 font-display text-[0.98rem] uppercase tracking-[0.14em] text-[#eadcc5]">
                          {record}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      className="rounded-[1.15rem] border border-[#8b755056] bg-[linear-gradient(180deg,rgba(139,117,80,0.18),rgba(91,22,21,0.15))] px-5 py-3 font-system text-[0.64rem] uppercase tracking-[0.28em] text-[#efe2cb] transition-all duration-300 hover:border-[#ded2bf66] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.28),rgba(91,22,21,0.22))]"
                      onClick={() => {
                        handleOpenChamber("/sanctum");
                      }}
                      onPointerEnter={playHover}
                      type="button"
                    >
                      {copy.returnLabel}
                    </button>

                    <button
                      className="rounded-[1.15rem] border border-[#ded2bf1f] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-3 font-system text-[0.64rem] uppercase tracking-[0.28em] text-[#c9bca8] transition-all duration-300 hover:border-[#6d8f8f52] hover:text-[#e4d7c1]"
                      onClick={() => {
                        handleOpenChamber("/open-channel");
                      }}
                      onPointerEnter={playHover}
                      type="button"
                    >
                      {sectorId === "open-channel"
                        ? copy.inspectLabel
                        : `${copy.openLabel}: ${openChannelSector.title}`}
                    </button>
                  </div>
                </div>
              </section>

              <div className="space-y-4 animate-veil-in [animation-delay:280ms]">
                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.sectorStateLabel}
                  </div>

                  <div className="mt-5">
                    <ArchiveSectorPreviewCard sector={sector} />
                  </div>
                </section>

                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.relatedLabel}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[#b7aa98]">{copy.returnHint}</p>

                  <div className="mt-5 space-y-3">
                    {relatedSectors.map((relatedSector) => (
                      <button
                        className="w-full text-left"
                        key={relatedSector.id}
                        onClick={() => {
                          handleOpenChamber(relatedSector.href);
                        }}
                        onPointerEnter={playHover}
                        type="button"
                      >
                        <ArchiveSectorPreviewCard sector={relatedSector} variant="compact" />
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(139,117,80,0.16),rgba(7,6,7,0.96)_62%,rgba(7,6,7,1)_100%)] transition-opacity duration-700",
          isTransitioning ? "opacity-100" : "opacity-0",
        )}
      />
    </main>
  );
};

export { ArchiveSectorShellWidget };
