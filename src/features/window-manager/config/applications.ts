import type { ComponentType } from "react";

import { AboutApp } from "@/features/apps/about/ui/about-app";
import { ProjectDetailsApp } from "@/features/apps/projects/ui/project-details-app";
import { ProjectsApp } from "@/features/apps/projects/ui/projects-app";
import type { ProjectId } from "@/features/apps/projects/model/projects";

import type { WindowPosition, WindowSize } from "../model/window.types";

export interface ApplicationDefinition {
  id: string;

  title: string;
  icon: string;
  desktopLabel?: string;

  component: ComponentType<{ projectId?: ProjectId }>;

  defaultPosition: WindowPosition;
  defaultSize: WindowSize;

  minWidth: number;
  minHeight: number;
}

export const applications = {
  about: {
    id: "about",

    title: "About Egor",
    icon: "🖥️",
    desktopLabel: "About Me.txt",

    component: AboutApp,

    defaultPosition: {
      x: 160,
      y: 90,
    },

    defaultSize: {
      width: 650,
      height: 440,
    },

    minWidth: 400,
    minHeight: 300,
  },
  projects: {
    id: "projects",
    title: "My Projects",
    icon: "📁",
    desktopLabel: "My Projects",
    component: ProjectsApp,
    defaultPosition: { x: 100, y: 65 },
    defaultSize: { width: 720, height: 490 },
    minWidth: 360,
    minHeight: 290,
  },
  "project-details": {
    id: "project-details",
    title: "Project Details",
    icon: "📂",
    desktopLabel: "Project Details",
    component: ProjectDetailsApp,
    defaultPosition: { x: 210, y: 115 },
    defaultSize: { width: 590, height: 460 },
    minWidth: 340,
    minHeight: 300,
  },
} satisfies Record<string, ApplicationDefinition>;
