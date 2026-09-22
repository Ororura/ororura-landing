import type { ComponentType } from "react";

import { AboutApp } from "@/features/apps/about/ui/about-app";

import type { ApplicationId, WindowPosition, WindowSize } from "../model/window.types";

export interface ApplicationDefinition {
  id: ApplicationId;

  title: string;
  icon: string;

  component: ComponentType;

  defaultPosition: WindowPosition;
  defaultSize: WindowSize;

  minWidth: number;
  minHeight: number;
}

export const applications: Record<ApplicationId, ApplicationDefinition> = {
  about: {
    id: "about",

    title: "About Egor",
    icon: "🖥️",

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
};
