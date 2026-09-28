import type { ComponentType } from "react";

import { AboutApp } from "@/features/apps/about/ui/about-app";

import type { WindowPosition, WindowSize } from "../model/window.types";

export interface ApplicationDefinition {
  id: string;

  title: string;
  icon: string;
  desktopLabel?: string;

  component: ComponentType;

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
} satisfies Record<string, ApplicationDefinition>;
