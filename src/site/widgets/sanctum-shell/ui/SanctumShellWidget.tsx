"use client";

import { useState } from "react";

import { useArchiveTransition } from "@/features/archive-entry";
import { LanguageSwitch } from "@/features/language-switch";
import { SoundToggle, useShrineAudio } from "@/features/sound-toggle";
import {
  ArchiveSectorPreviewCard,
  ArchiveSectorRouteItem,
  getArchiveSector,
  getArchiveSectors,
  getFeaturedArchiveSectors
} from "@/entities/archive-sector";
import type { ArchiveSectorId } from "@/entities/archive-sector";
import { RelicInsignia } from "@/entities/relic-insignia";
import { sanctumCopy } from "@/shared/config";
import type { QuickAccessLink, QuickLinkTone } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { useArchiveLocale } from "@/shared/lib/use-archive-locale";
import { AtmosphericBackground } from "@/shared/ui/atmospheric-background";
import { PanelFrame } from "@/shared/ui/panel-frame";

const quickLinkToneClassMap: Record<QuickLinkTone, string> = {
  cyan: "border-[#6d8f8f42] hover:border-[#6d8f8f7a] hover:bg-[linear-gradient(180deg,rgba(109,143,143,0.12),rgba(255,255,255,0.02))]",
  gold: "border-[#8b755042] hover:border-[#8b75507a] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.12),rgba(255,255,255,0.02))]",
  rust: "border-[#8b3b2f42] hover:border-[#8b3b2f7a] hover:bg-[linear-gradient(180deg,rgba(139,59,47,0.12),rgba(255,255,255,0.02))]"
};

const SanctumShellWidget = () => {
  const { locale, setLocale } = useArchiveLocale("en");
  const [activeSectorId, setActiveSectorId] = useState<ArchiveSectorId>("character-record");

  const copy = sanctumCopy[locale];
  const activeSector = getArchiveSector(locale, activeSectorId);
  const sectors = getArchiveSectors(locale);
  const featuredSectors = getFeaturedArchiveSectors(locale);
  const { beginTransition, isTransitioning } = useArchiveTransition();
  const { playClick, playHover, soundEnabled, toggleSound } = useShrineAudio();

  const handleLocaleChange = (nextLocale: typeof locale) => {
    setLocale(nextLocale);
    void playClick();
  };

  const handleInspect = (sectorId: ArchiveSectorId) => {
    setActiveSectorId((currentSectorId) => (currentSectorId === sectorId ? currentSectorId : sectorId));
    void playHover();
  };

  const handleOpenChamber = (href: string) => {
    void playClick();
    beginTransition(href, 420);
  };

  const handleQuickLinkHover = () => {
    void playHover();
  };

  const renderQuickLink = (link: QuickAccessLink) => {
    const className = cn(
      "group rounded-[1.2rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] px-4 py-3 text-left transition-all duration-300",
      quickLinkToneClassMap[link.tone]
    );

    const content = (
      <>
        <div className="flex items-center justify-between gap-3">
          <div className="font-display text-[0.96rem] uppercase tracking-[0.16em] text-[#eee0ca]">{link.label}</div>
          <div className="font-system text-[0.56rem] uppercase tracking-[0.26em] text-[#8f887c]">{link.signal}</div>
        </div>
        <div className="mt-2 text-[0.82rem] leading-relaxed text-[#bfb39f]">{link.hint}</div>
      </>
    );

    if (link.external) {
      return (
        <a
          key={link.id}
          className={className}
          href={link.href}
          onClick={() => {
            void playClick();
          }}
          onPointerEnter={handleQuickLinkHover}
          rel="noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={link.id}
        className={className}
        onClick={() => {
          handleOpenChamber(link.href);
        }}
        onPointerEnter={handleQuickLinkHover}
        type="button"
      >
        {content}
      </button>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-bone">
      <AtmosphericBackground isTransitioning={isTransitioning} />

      <div className="relative z-10 flex min-h-screen flex-col px-4 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-md animate-veil-in">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8f887c]">
              {copy.chamberLabel}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#b0a492]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f] shadow-[0_0_14px_rgba(109,143,143,0.42)]" />
              <span>{copy.chamberStatus}</span>
              <span className="text-[#8b7550]">{copy.chamberDescriptor}</span>
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
          <PanelFrame className="w-full max-w-[96rem] px-4 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
            <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr_0.9fr]">
              <div className="space-y-4 animate-veil-in [animation-delay:180ms]">
                <section className="rounded-[1.8rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(16,14,15,0.82),rgba(9,8,9,0.72))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.routesLabel}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[#b7aa98]">{copy.routesHint}</p>

                  <div className="mt-5 space-y-3">
                    {sectors.map((sector) => (
                      <ArchiveSectorRouteItem
                        isActive={sector.id === activeSector.id}
                        key={sector.id}
                        onInspect={() => {
                          handleInspect(sector.id);
                        }}
                        onOpen={() => {
                          handleOpenChamber(sector.href);
                        }}
                        sector={sector}
                      />
                    ))}
                  </div>
                </section>

                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.archiveStatusLabel}
                  </div>

                  <div className="mt-4 space-y-3">
                    {copy.archiveStatus.map((statusItem) => (
                      <div
                        className="flex items-center justify-between gap-4 border-b border-[#ded2bf0d] pb-3 font-system text-[0.64rem] uppercase tracking-[0.2em] text-[#b4a896]"
                        key={statusItem.label}
                      >
                        <span className="text-[#8e8476]">{statusItem.label}</span>
                        <span className="text-right text-[#ddd0bb]">{statusItem.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#6d8f8f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f] shadow-[0_0_12px_rgba(109,143,143,0.45)]" />
                    <span>{copy.archiveReadyLabel}</span>
                    <span className="animate-cursor-blink text-[#d5cab6]">_</span>
                  </div>
                </section>
              </div>

              <div className="animate-veil-in [animation-delay:260ms]">
                <section className="relative overflow-hidden rounded-[2rem] border border-[#ded2bf14] bg-[radial-gradient(circle_at_top,rgba(139,117,80,0.12),transparent_32%),linear-gradient(180deg,rgba(17,16,19,0.92),rgba(9,8,9,0.82))] px-5 py-6 sm:px-7 sm:py-8">
                  <div className="pointer-events-none absolute inset-0 bg-shrine-grain opacity-50" />
                  <div className="pointer-events-none absolute inset-[14px] rounded-[1.55rem] border border-[#8b755022]" />
                  <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#ded2bf24] to-transparent" />

                  <div className="relative flex flex-col items-center text-center">
                    <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                      {copy.identityLabel}
                    </div>

                    <div className="mt-5">
                      <RelicInsignia isAwake={!isTransitioning} />
                    </div>

                    <h1 className="mt-7 text-shadow-ritual font-display text-[2.8rem] uppercase tracking-[0.26em] text-[#f0e2cb] sm:text-[3.8rem]">
                      ORORURA
                    </h1>

                    <div className="mt-4 font-system text-[0.68rem] uppercase tracking-[0.32em] text-[#9f9485]">
                      {copy.role}
                    </div>

                    <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-[#cdc0ad] sm:text-[1.06rem]">
                      {copy.summary}
                    </p>

                    <p className="mt-4 max-w-2xl text-[0.87rem] leading-relaxed text-[#a99d8c]">{copy.descriptor}</p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      {copy.attunements.map((attunement) => (
                        <div
                          className="rounded-full border border-[#ded2bf16] bg-[#ffffff05] px-4 py-2 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#d8ccb8]"
                          key={attunement}
                        >
                          {attunement}
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 flex w-full max-w-2xl items-center gap-4">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8b75505a] to-[#8b755014]" />
                      <span className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#6d8f8f]">
                        {copy.attunementLabel}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#8b75505a] to-[#8b755014]" />
                    </div>

                    <div className="mt-6 grid w-full gap-3 sm:grid-cols-3">
                      <button
                        className="rounded-[1.2rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4 text-left transition-all duration-300 hover:border-[#8b755056] hover:bg-[#ffffff06]"
                        onClick={() => {
                          handleInspect("character-record");
                        }}
                        onPointerEnter={() => {
                          handleInspect("character-record");
                        }}
                        type="button"
                      >
                        <div className="font-system text-[0.55rem] uppercase tracking-[0.28em] text-[#8b7550]">identity</div>
                        <div className="mt-2 font-display text-[0.98rem] uppercase tracking-[0.16em] text-[#eadcc5]">
                          Human Behind The Mask
                        </div>
                      </button>

                      <button
                        className="rounded-[1.2rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4 text-left transition-all duration-300 hover:border-[#8b3b2f56] hover:bg-[#ffffff06]"
                        onClick={() => {
                          handleInspect("quests");
                        }}
                        onPointerEnter={() => {
                          handleInspect("quests");
                        }}
                        type="button"
                      >
                        <div className="font-system text-[0.55rem] uppercase tracking-[0.28em] text-[#8b3b2f]">work</div>
                        <div className="mt-2 font-display text-[0.98rem] uppercase tracking-[0.16em] text-[#eadcc5]">
                          Shipped Project Dossiers
                        </div>
                      </button>

                      <button
                        className="rounded-[1.2rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4 text-left transition-all duration-300 hover:border-[#6d8f8f56] hover:bg-[#ffffff06]"
                        onClick={() => {
                          handleInspect("field-notes");
                        }}
                        onPointerEnter={() => {
                          handleInspect("field-notes");
                        }}
                        type="button"
                      >
                        <div className="font-system text-[0.55rem] uppercase tracking-[0.28em] text-[#6d8f8f]">writing</div>
                        <div className="mt-2 font-display text-[0.98rem] uppercase tracking-[0.16em] text-[#eadcc5]">
                          Notes, Fragments, Postmortems
                        </div>
                      </button>
                    </div>

                    <div className="mt-7 w-full max-w-2xl rounded-[1.35rem] border border-[#ded2bf12] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(14,13,14,0.62))] px-4 py-4 text-left">
                      <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                        {copy.systemLabel}
                      </div>
                      <div className="mt-3 flex items-center gap-3 font-system text-[0.68rem] uppercase tracking-[0.24em] text-[#cbbda8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f]" />
                        <span>{copy.systemValue}</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-4 animate-veil-in [animation-delay:340ms]">
                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.previewLabel}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[#b7aa98]">{copy.previewHint}</p>

                  <div className="mt-5" key={`${locale}-${activeSector.id}`}>
                    <ArchiveSectorPreviewCard sector={activeSector} />
                  </div>

                  <button
                    className="mt-4 w-full rounded-[1.2rem] border border-[#8b755052] bg-[linear-gradient(180deg,rgba(139,117,80,0.18),rgba(91,22,21,0.15))] px-4 py-3 font-system text-[0.64rem] uppercase tracking-[0.28em] text-[#efe2cb] transition-all duration-300 hover:border-[#ded2bf66] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.28),rgba(91,22,21,0.22))]"
                    onClick={() => {
                      handleOpenChamber(activeSector.href);
                    }}
                    onPointerEnter={handleQuickLinkHover}
                    type="button"
                  >
                    {copy.openLabel}
                  </button>
                </section>

                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.quickAccessLabel}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[#b7aa98]">{copy.quickAccessIntro}</p>

                  <div className="mt-5 grid gap-3">{copy.quickLinks.map(renderQuickLink)}</div>
                </section>

                <section className="rounded-[1.8rem] border border-[#ded2bf10] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,10,11,0.56))] p-5">
                  <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                    {copy.featuredLabel}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[#b7aa98]">{copy.featuredIntro}</p>

                  <div className="mt-5 space-y-3">
                    {featuredSectors.map((sector) => (
                      <button
                        className="w-full text-left"
                        key={sector.id}
                        onClick={() => {
                          handleOpenChamber(sector.href);
                        }}
                        onFocus={() => {
                          handleInspect(sector.id);
                        }}
                        onPointerEnter={() => {
                          handleInspect(sector.id);
                        }}
                        type="button"
                      >
                        <ArchiveSectorPreviewCard sector={sector} variant="compact" />
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
          isTransitioning ? "opacity-100" : "opacity-0"
        )}
      />
    </main>
  );
};

export { SanctumShellWidget };
