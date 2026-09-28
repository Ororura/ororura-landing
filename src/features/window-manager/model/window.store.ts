import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { applications } from "../config/applications";

import type { ApplicationId, WindowPosition, WindowSize, WindowState } from "./window.types";

interface WindowStore {
  windows: WindowState[];
  activeWindowId: ApplicationId | null;
  nextZIndex: number;
  desktopSize: WindowSize | null;
  setDesktopSize: (size: WindowSize) => void;
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
  const visible = windows.filter((window) => !window.minimized);
  return visible.length ? visible.reduce((top, window) => (window.zIndex > top.zIndex ? window : top)).id : null;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function constrainWindow(window: WindowState, desktopSize: WindowSize | null): WindowState {
  if (!desktopSize || desktopSize.width <= 0 || desktopSize.height <= 0) return window;

  const application = applications[window.id];
  const width = clamp(window.size.width, Math.min(application.minWidth, desktopSize.width), desktopSize.width);
  const height = clamp(window.size.height, Math.min(application.minHeight, desktopSize.height), desktopSize.height);

  return {
    ...window,
    size: { width, height },
    position: {
      x: clamp(window.position.x, 0, desktopSize.width - width),
      y: clamp(window.position.y, 0, desktopSize.height - height),
    },
  };
}

function isApplicationId(value: unknown): value is ApplicationId {
  return typeof value === "string" && Object.hasOwn(applications, value);
}

function isPosition(value: unknown): value is WindowPosition {
  return (
    typeof value === "object" &&
    value !== null &&
    "x" in value &&
    typeof value.x === "number" &&
    Number.isFinite(value.x) &&
    "y" in value &&
    typeof value.y === "number" &&
    Number.isFinite(value.y)
  );
}

function isSize(value: unknown): value is WindowSize {
  return (
    typeof value === "object" &&
    value !== null &&
    "width" in value &&
    typeof value.width === "number" &&
    Number.isFinite(value.width) &&
    value.width > 0 &&
    "height" in value &&
    typeof value.height === "number" &&
    Number.isFinite(value.height) &&
    value.height > 0
  );
}

export function restoreWindows(persisted: unknown, desktopSize: WindowSize | null): WindowState[] {
  if (!Array.isArray(persisted)) return [];
  const seen = new Set<ApplicationId>();
  const windows: WindowState[] = [];

  for (const entry of persisted) {
    const item: unknown = entry;
    if (typeof item !== "object" || item === null || !("id" in item) || !isApplicationId(item.id) || seen.has(item.id))
      continue;
    const application = applications[item.id];
    seen.add(item.id);
    const window: WindowState = {
      id: item.id,
      position: "position" in item && isPosition(item.position) ? item.position : application.defaultPosition,
      size: "size" in item && isSize(item.size) ? item.size : application.defaultSize,
      minimized: "minimized" in item && item.minimized === true,
      maximized: "maximized" in item && item.maximized === true,
      zIndex:
        "zIndex" in item && typeof item.zIndex === "number" && Number.isFinite(item.zIndex) && item.zIndex > 0
          ? item.zIndex
          : windows.length + 1,
    };
    windows.push(constrainWindow(window, desktopSize));
  }
  const ordered = [...windows].sort((left, right) => left.zIndex - right.zIndex);
  const zIndices = new Map(ordered.map((window, index) => [window.id, index + 1]));
  return windows.map((window) => ({ ...window, zIndex: zIndices.get(window.id) ?? 1 }));
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set) => ({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
      desktopSize: null,

      setDesktopSize: (size) =>
        set((state) => ({
          desktopSize: size,
          windows: state.windows.map((window) => constrainWindow(window, size)),
        })),

      openWindow: (id) =>
        set((state) => {
          const zIndex = state.nextZIndex;
          const existing = state.windows.find((window) => window.id === id);
          if (existing)
            return {
              windows: state.windows.map((window) =>
                window.id === id ? { ...window, minimized: false, zIndex } : window,
              ),
              activeWindowId: id,
              nextZIndex: zIndex + 1,
            };

          const application = applications[id];
          const window = constrainWindow(
            {
              id,
              position: { ...application.defaultPosition },
              size: { ...application.defaultSize },
              minimized: false,
              maximized: false,
              zIndex,
            },
            state.desktopSize,
          );
          return { windows: [...state.windows, window], activeWindowId: id, nextZIndex: zIndex + 1 };
        }),

      closeWindow: (id) =>
        set((state) => {
          const windows = state.windows.filter((window) => window.id !== id);
          return {
            windows,
            activeWindowId: state.activeWindowId === id ? getTopWindow(windows) : state.activeWindowId,
          };
        }),

      focusWindow: (id) =>
        set((state) => {
          const target = state.windows.find((window) => window.id === id);
          if (!target || target.minimized) return state;
          const zIndex = state.nextZIndex;
          return {
            windows: state.windows.map((window) => (window.id === id ? { ...window, zIndex } : window)),
            activeWindowId: id,
            nextZIndex: zIndex + 1,
          };
        }),

      minimizeWindow: (id) =>
        set((state) => {
          const target = state.windows.find((window) => window.id === id);
          if (!target || target.minimized) return state;
          const windows = state.windows.map((window) => (window.id === id ? { ...window, minimized: true } : window));
          return {
            windows,
            activeWindowId: state.activeWindowId === id ? getTopWindow(windows) : state.activeWindowId,
          };
        }),

      maximizeWindow: (id) =>
        set((state) => {
          if (!state.windows.some((window) => window.id === id)) return state;
          const zIndex = state.nextZIndex;
          return {
            windows: state.windows.map((window) =>
              window.id === id ? { ...window, maximized: !window.maximized, minimized: false, zIndex } : window,
            ),
            activeWindowId: id,
            nextZIndex: zIndex + 1,
          };
        }),

      toggleTaskbarWindow: (id) =>
        set((state) => {
          const target = state.windows.find((window) => window.id === id);
          if (!target) return state;
          if (!target.minimized && state.activeWindowId === id) {
            const windows = state.windows.map((window) => (window.id === id ? { ...window, minimized: true } : window));
            return { windows, activeWindowId: getTopWindow(windows) };
          }
          const zIndex = state.nextZIndex;
          return {
            windows: state.windows.map((window) =>
              window.id === id ? { ...window, minimized: false, zIndex } : window,
            ),
            activeWindowId: id,
            nextZIndex: zIndex + 1,
          };
        }),

      moveWindow: (id, position) =>
        set((state) => ({
          windows: state.windows.map((window) =>
            window.id === id && !window.maximized
              ? constrainWindow({ ...window, position }, state.desktopSize)
              : window,
          ),
        })),

      resizeWindow: (id, size, position) =>
        set((state) => ({
          windows: state.windows.map((window) =>
            window.id === id && !window.maximized
              ? constrainWindow(
                  {
                    ...window,
                    size: {
                      width: Math.max(size.width, applications[id].minWidth),
                      height: Math.max(size.height, applications[id].minHeight),
                    },
                    position,
                  },
                  state.desktopSize,
                )
              : window,
          ),
        })),
    }),
    {
      name: "desktop-windows",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ windows: state.windows }),
      merge: (persisted, current) => {
        const saved =
          typeof persisted === "object" && persisted !== null && "windows" in persisted ? persisted.windows : null;
        const windows = restoreWindows(saved, current.desktopSize);
        return {
          ...current,
          windows,
          activeWindowId: getTopWindow(windows),
          nextZIndex: Math.max(0, ...windows.map((window) => window.zIndex)) + 1,
        };
      },
    },
  ),
);
