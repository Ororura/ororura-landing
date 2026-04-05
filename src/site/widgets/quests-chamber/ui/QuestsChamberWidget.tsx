"use client";

import { useState } from "react";

import { useArchiveTransition } from "@/features/archive-entry";
import { LanguageSwitch } from "@/features/language-switch";
import { ProjectFilterBar } from "@/features/project-filter";
import { SoundToggle, useShrineAudio } from "@/features/sound-toggle";
import {
  ArchiveRelicCard,
  FeaturedQuestRecord,
  ProjectInspectPanel,
  filterProjectRecords,
  getArchiveProjectRecords,
  getFeaturedProjectRecords,
  getProjectFilterOptions,
  getProjectRecordById,
  getProjectRecords
} from "@/entities/project-record";
import type { ProjectFilterId, ProjectLink } from "@/entities/project-record";
import { questsCopy } from "@/shared/config";
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

const QuestsChamberWidget = () => {
  const { locale, setLocale } = useArchiveLocale("en");
  const [activeFeaturedId, setActiveFeaturedId] = useState("sanctum-console");
  const [activeArchiveFilter, setActiveArchiveFilter] = useState<ProjectFilterId>("all");

  const copy = questsCopy[locale];
  const allProjects = getProjectRecords(locale);
  const featuredProjects = getFeaturedProjectRecords(locale);
  const archiveProjects = getArchiveProjectRecords(locale);
  const visibleArchiveProjects = filterProjectRecords(archiveProjects, activeArchiveFilter);
  const activeFeaturedProject = getProjectRecordById(locale, activeFeaturedId);
  const archiveFilters = getProjectFilterOptions(locale, archiveProjects);
  const uniqueStackCount = new Set(allProjects.flatMap((projectRecord) => projectRecord.stack)).size;
  const { beginTransition, isTransitioning } = useArchiveTransition();
  const { playClick, playHover, soundEnabled, toggleSound } = useShrineAudio();

  const handleLocaleChange = (nextLocale: typeof locale) => {
    setLocale(nextLocale);
    void playClick();
  };

  const handleInspectFeatured = (projectId: string) => {
    setActiveFeaturedId((currentProjectId) => (currentProjectId === projectId ? currentProjectId : projectId));
    void playHover();
  };

  const handleOpenInternalRoute = (href: string) => {
    void playClick();
    beginTransition(href, 420);
  };

  const handleOpenLink = (link: ProjectLink) => {
    void playClick();

    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
      return;
    }

    beginTransition(link.href, 420);
  };

  const handleQuickAccess = (link: QuickAccessLink) => {
    void playClick();

    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
      return;
    }

    beginTransition(link.href, 420);
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

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <PanelFrame className="animate-veil-in px-5 py-6 sm:px-7 sm:py-8 [animation-delay:120ms]">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
              {copy.headingEyebrow}
            </div>
            <h1 className="mt-5 font-display text-[2.6rem] uppercase tracking-[0.24em] text-[#f0e2cb] sm:text-[3.5rem]">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-[1rem] leading-relaxed text-[#d0c4b2]">{copy.intro}</p>
            <p className="mt-4 max-w-3xl text-[0.92rem] leading-relaxed text-[#a89c8b]">{copy.descriptor}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.25rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="font-system text-[0.56rem] uppercase tracking-[0.28em] text-[#8b7550]">
                  {copy.statsLabels.featuredCount}
                </div>
                <div className="mt-3 font-display text-[1.35rem] uppercase tracking-[0.14em] text-[#efe2cb]">
                  {featuredProjects.length}
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="font-system text-[0.56rem] uppercase tracking-[0.28em] text-[#8b7550]">
                  {copy.statsLabels.archiveCount}
                </div>
                <div className="mt-3 font-display text-[1.35rem] uppercase tracking-[0.14em] text-[#efe2cb]">
                  {archiveProjects.length}
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="font-system text-[0.56rem] uppercase tracking-[0.28em] text-[#8b7550]">
                  {copy.statsLabels.stackCount}
                </div>
                <div className="mt-3 font-display text-[1.35rem] uppercase tracking-[0.14em] text-[#efe2cb]">
                  {uniqueStackCount}
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="font-system text-[0.56rem] uppercase tracking-[0.28em] text-[#8b7550]">
                  {copy.statsLabels.workSpan}
                </div>
                <div className="mt-3 font-display text-[1.35rem] uppercase tracking-[0.14em] text-[#efe2cb]">
                  2019-2026
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="rounded-[1.15rem] border border-[#8b755056] bg-[linear-gradient(180deg,rgba(139,117,80,0.18),rgba(91,22,21,0.15))] px-5 py-3 font-system text-[0.64rem] uppercase tracking-[0.28em] text-[#efe2cb] transition-all duration-300 hover:border-[#ded2bf66] hover:bg-[linear-gradient(180deg,rgba(139,117,80,0.28),rgba(91,22,21,0.22))]"
                onClick={() => {
                  handleOpenInternalRoute("/sanctum");
                }}
                onPointerEnter={playHover}
                type="button"
              >
                {copy.returnLabel}
              </button>

              <button
                className="rounded-[1.15rem] border border-[#ded2bf1f] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-3 font-system text-[0.64rem] uppercase tracking-[0.28em] text-[#c9bca8] transition-all duration-300 hover:border-[#6d8f8f52] hover:text-[#e4d7c1]"
                onClick={() => {
                  handleOpenInternalRoute("/open-channel");
                }}
                onPointerEnter={playHover}
                type="button"
              >
                {copy.openChannelLabel}
              </button>
            </div>
          </PanelFrame>

          <div className="grid gap-4">
            <PanelFrame className="animate-veil-in px-5 py-5 [animation-delay:220ms]">
              <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                {copy.quickLinksLabel}
              </div>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-[#b9ad9b]">{copy.quickLinksIntro}</p>

              <div className="mt-5 grid gap-3">
                {copy.quickLinks.map((quickLink) => (
                  <button
                    className={cn(
                      "group rounded-[1.2rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] px-4 py-4 text-left transition-all duration-300",
                      quickLinkToneClassMap[quickLink.tone]
                    )}
                    key={`${quickLink.id}-${quickLink.label}`}
                    onClick={() => {
                      handleQuickAccess(quickLink);
                    }}
                    onPointerEnter={playHover}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-display text-[0.98rem] uppercase tracking-[0.16em] text-[#efe2cb]">
                        {quickLink.label}
                      </div>
                      <div className="font-system text-[0.56rem] uppercase tracking-[0.26em] text-[#8f887c]">
                        {quickLink.signal}
                      </div>
                    </div>
                    <div className="mt-2 text-[0.84rem] leading-relaxed text-[#bfb39f]">{quickLink.hint}</div>
                  </button>
                ))}
              </div>
            </PanelFrame>

            <PanelFrame className="animate-veil-in px-5 py-5 [animation-delay:320ms]">
              <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                {copy.systemLabel}
              </div>
              <div className="mt-4 rounded-[1.2rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="flex items-center gap-3 font-system text-[0.62rem] uppercase tracking-[0.24em] text-[#6d8f8f]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6d8f8f] shadow-[0_0_12px_rgba(109,143,143,0.45)]" />
                  <span>{copy.systemValue}</span>
                  <span className="animate-cursor-blink text-[#d5cab6]">_</span>
                </div>
              </div>
              <div className="mt-4 rounded-[1.2rem] border border-[#ded2bf12] bg-[#ffffff04] px-4 py-4">
                <div className="font-system text-[0.56rem] uppercase tracking-[0.28em] text-[#8b7550]">
                  {copy.currentFilterLabel}
                </div>
                <div className="mt-3 font-display text-[1rem] uppercase tracking-[0.16em] text-[#efe2cb]">
                  {archiveFilters.find((filterOption) => filterOption.id === activeArchiveFilter)?.label}
                </div>
              </div>
            </PanelFrame>
          </div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
          <PanelFrame className="animate-veil-in px-5 py-5 sm:px-6 [animation-delay:200ms]">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
              {copy.featuredLabel}
            </div>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-[#b9ad9b]">{copy.featuredIntro}</p>
            <p className="mt-3 text-[0.8rem] uppercase tracking-[0.22em] text-[#8f8475]">{copy.inspectHint}</p>

            <div className="mt-5 space-y-3">
              {featuredProjects.map((projectRecord) => (
                <FeaturedQuestRecord
                  isActive={projectRecord.id === activeFeaturedProject.id}
                  key={projectRecord.id}
                  locale={locale}
                  onInspect={() => {
                    handleInspectFeatured(projectRecord.id);
                  }}
                  project={projectRecord}
                />
              ))}
            </div>
          </PanelFrame>

          <PanelFrame className="animate-veil-in px-5 py-5 sm:px-6 [animation-delay:280ms]">
            <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
              {copy.inspectLabel}
            </div>
            <div className="mt-5" key={`${locale}-${activeFeaturedProject.id}`}>
              <ProjectInspectPanel
                labels={{
                  linksLabel: copy.linksLabel,
                  outcomeLabel: copy.outcomeLabel,
                  recordLabel: copy.recordLabel,
                  roleLabel: copy.roleLabel,
                  stackLabel: copy.stackLabel
                }}
                locale={locale}
                onHover={playHover}
                onOpenLink={handleOpenLink}
                project={activeFeaturedProject}
              />
            </div>
          </PanelFrame>
        </div>

        <PanelFrame className="mt-4 animate-veil-in px-5 py-5 sm:px-6 sm:py-6 [animation-delay:360ms]">
          <div className="grid gap-6 xl:grid-cols-[0.4fr_1.6fr]">
            <div>
              <div className="font-system text-[0.58rem] uppercase tracking-[0.34em] text-[#8b7550]">
                {copy.archiveLabel}
              </div>
              <p className="mt-4 text-[0.96rem] leading-relaxed text-[#d0c4b2]">{copy.archiveIntro}</p>

              <div className="mt-6">
                <ProjectFilterBar
                  activeFilter={activeArchiveFilter}
                  filters={archiveFilters}
                  label={copy.filterLabel}
                  onChange={(nextFilter) => {
                    setActiveArchiveFilter(nextFilter);
                    void playClick();
                  }}
                  onHover={playHover}
                />
              </div>
            </div>

            <div>
              {visibleArchiveProjects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {visibleArchiveProjects.map((projectRecord) => (
                    <ArchiveRelicCard
                      key={projectRecord.id}
                      locale={locale}
                      onHover={playHover}
                      onOpenLink={handleOpenLink}
                      project={projectRecord}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-[#ded2bf12] bg-[#ffffff04] px-5 py-10 text-center text-[0.95rem] leading-relaxed text-[#b8ac99]">
                  {copy.archiveEmpty}
                </div>
              )}
            </div>
          </div>
        </PanelFrame>
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

export { QuestsChamberWidget };
