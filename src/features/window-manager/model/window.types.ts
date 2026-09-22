export type ApplicationId = "about";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: ApplicationId;

  position: WindowPosition;
  size: WindowSize;

  minimized: boolean;
  maximized: boolean;

  zIndex: number;
}
