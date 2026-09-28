import type { applications } from "../config/applications";
import type { ProjectId } from "@/features/apps/projects/model/projects";

export type ApplicationId = keyof typeof applications;
export type WindowId = ApplicationId | `project:${ProjectId}`;

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;

  position: WindowPosition;
  size: WindowSize;

  minimized: boolean;
  maximized: boolean;

  zIndex: number;
}
