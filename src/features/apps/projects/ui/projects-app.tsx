"use client";

import { useWindowStore } from "@/features/window-manager/model/window.store";

import { ProjectsExplorer } from "./projects-explorer";

export function ProjectsApp() {
  const openProjectWindow = useWindowStore((state) => state.openProjectWindow);
  return <ProjectsExplorer onOpenProject={openProjectWindow} />;
}
