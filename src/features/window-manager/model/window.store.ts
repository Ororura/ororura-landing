import { create } from "zustand";

import { applications } from "../config/applications";

import type { ApplicationId, WindowPosition, WindowSize, WindowState } from "./window.types";

interface WindowStore {
  windows: WindowState[];

  activeWindowId: ApplicationId | null;

  nextZIndex: number;

  openWindow: (id: ApplicationId) => void;

  closeWindow: (id: ApplicationId) => void;

  focusWindow: (id: ApplicationId) => void;

  minimizeWindow: (id: ApplicationId) => void;

  maximizeWindow: (id: ApplicationId) => void;

  toggleTaskbarWindow: (id: ApplicationId) => void;

  moveWindow: (id: ApplicationId, position: WindowPosition) => void;

  resizeWindow: (id: ApplicationId, size: WindowSize, position: WindowPosition) => void;
}

function getTopWindow(windows: WindowState[]): ApplicationId | null {
  const visibleWindows = windows.filter((window) => !window.minimized);

  if (visibleWindows.length === 0) {
    return null;
  }

  return visibleWindows.reduce((top, current) => (current.zIndex > top.zIndex ? current : top)).id;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],

  activeWindowId: null,

  nextZIndex: 1,

  openWindow: (id) => {
    set((state) => {
      const existingWindow = state.windows.find((window) => window.id === id);

      const zIndex = state.nextZIndex;

      if (existingWindow) {
        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  minimized: false,
                  zIndex,
                }
              : window,
          ),

          activeWindowId: id,

          nextZIndex: zIndex + 1,
        };
      }

      const application = applications[id];

      const newWindow: WindowState = {
        id,

        position: {
          ...application.defaultPosition,
        },

        size: {
          ...application.defaultSize,
        },

        minimized: false,
        maximized: false,

        zIndex,
      };

      return {
        windows: [...state.windows, newWindow],

        activeWindowId: id,

        nextZIndex: zIndex + 1,
      };
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const windows = state.windows.filter((window) => window.id !== id);

      return {
        windows,

        activeWindowId: getTopWindow(windows),
      };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      const target = state.windows.find((window) => window.id === id);

      if (!target || target.minimized) {
        return state;
      }

      const zIndex = state.nextZIndex;

      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                zIndex,
              }
            : window,
        ),

        activeWindowId: id,

        nextZIndex: zIndex + 1,
      };
    });
  },

  minimizeWindow: (id) => {
    set((state) => {
      const windows = state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              minimized: true,
            }
          : window,
      );

      return {
        windows,

        activeWindowId: getTopWindow(windows),
      };
    });
  },

  maximizeWindow: (id) => {
    set((state) => {
      const target = state.windows.find((window) => window.id === id);

      if (!target) {
        return state;
      }

      const zIndex = state.nextZIndex;

      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                maximized: !window.maximized,
                minimized: false,
                zIndex,
              }
            : window,
        ),

        activeWindowId: id,

        nextZIndex: zIndex + 1,
      };
    });
  },

  toggleTaskbarWindow: (id) => {
    set((state) => {
      const target = state.windows.find((window) => window.id === id);

      if (!target) {
        return state;
      }

      if (target.minimized) {
        const zIndex = state.nextZIndex;

        return {
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  minimized: false,
                  zIndex,
                }
              : window,
          ),

          activeWindowId: id,

          nextZIndex: zIndex + 1,
        };
      }

      if (state.activeWindowId === id) {
        const windows = state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                minimized: true,
              }
            : window,
        );

        return {
          windows,

          activeWindowId: getTopWindow(windows),
        };
      }

      const zIndex = state.nextZIndex;

      return {
        windows: state.windows.map((window) =>
          window.id === id
            ? {
                ...window,
                zIndex,
              }
            : window,
        ),

        activeWindowId: id,

        nextZIndex: zIndex + 1,
      };
    });
  },

  moveWindow: (id, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              position,
            }
          : window,
      ),
    }));
  },

  resizeWindow: (id, size, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              size,
              position,
            }
          : window,
      ),
    }));
  },
}));
