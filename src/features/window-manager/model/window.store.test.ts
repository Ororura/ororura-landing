import { beforeEach, describe, expect, it } from "vitest";

import { restoreWindows, useWindowStore } from "./window.store";

describe("Window Store", () => {
  beforeEach(() => {
    localStorage.clear();
    useWindowStore.setState({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
      desktopSize: null,
    });
  });

  describe("openWindow", () => {
    it("opens a new window", () => {
      useWindowStore.getState().openWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows).toHaveLength(1);

      expect(state.windows[0]).toMatchObject({
        id: "about",
        minimized: false,
        maximized: false,
        zIndex: 1,
      });

      expect(state.activeWindowId).toBe("about");
    });

    it("does not create duplicate windows", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.openWindow("about");

      expect(useWindowStore.getState().windows).toHaveLength(1);
    });

    it("restores a minimized window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.minimizeWindow("about");
      store.openWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows[0].minimized).toBe(false);

      expect(state.activeWindowId).toBe("about");
    });

    it("uses application default position and size", () => {
      useWindowStore.getState().openWindow("about");

      const window = useWindowStore.getState().windows[0];

      expect(window.position).toEqual({
        x: 160,
        y: 90,
      });

      expect(window.size).toEqual({
        width: 650,
        height: 440,
      });
    });
  });

  describe("closeWindow", () => {
    it("closes an existing window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.closeWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows).toHaveLength(0);

      expect(state.activeWindowId).toBeNull();
    });
  });

  describe("focusWindow", () => {
    it("increases zIndex", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");

      const previousZIndex = useWindowStore.getState().windows[0].zIndex;

      store.focusWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows[0].zIndex).toBeGreaterThan(previousZIndex);

      expect(state.activeWindowId).toBe("about");
    });

    it("does not focus a closed window", () => {
      useWindowStore.getState().focusWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows).toHaveLength(0);

      expect(state.activeWindowId).toBeNull();
    });

    it("does not focus a minimized window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.minimizeWindow("about");

      const previousState = useWindowStore.getState();

      store.focusWindow("about");

      const state = useWindowStore.getState();

      expect(state.activeWindowId).toBeNull();

      expect(state.nextZIndex).toBe(previousState.nextZIndex);
    });
  });

  describe("minimizeWindow", () => {
    it("minimizes an existing window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.minimizeWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows[0].minimized).toBe(true);

      expect(state.activeWindowId).toBeNull();
    });
  });

  describe("maximizeWindow", () => {
    it("maximizes an existing window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.maximizeWindow("about");

      expect(useWindowStore.getState().windows[0].maximized).toBe(true);
    });

    it("restores a maximized window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");

      store.maximizeWindow("about");
      store.maximizeWindow("about");

      expect(useWindowStore.getState().windows[0]).toMatchObject({
        maximized: false,
        position: { x: 160, y: 90 },
        size: { width: 650, height: 440 },
      });
    });
  });

  describe("toggleTaskbarWindow", () => {
    it("minimizes the active window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.toggleTaskbarWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows[0].minimized).toBe(true);

      expect(state.activeWindowId).toBeNull();
    });

    it("restores a minimized window", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");
      store.minimizeWindow("about");

      store.toggleTaskbarWindow("about");

      const state = useWindowStore.getState();

      expect(state.windows[0].minimized).toBe(false);

      expect(state.activeWindowId).toBe("about");
      expect(state.windows[0].zIndex).toBe(state.nextZIndex - 1);
    });

    it("keeps a maximized window maximized when restored", () => {
      const store = useWindowStore.getState();
      store.openWindow("about");
      store.maximizeWindow("about");
      store.minimizeWindow("about");
      store.toggleTaskbarWindow("about");

      expect(useWindowStore.getState().windows[0]).toMatchObject({
        minimized: false,
        maximized: true,
      });
    });
  });

  describe("moveWindow", () => {
    it("updates window position", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");

      store.moveWindow("about", {
        x: 300,
        y: 200,
      });

      const window = useWindowStore.getState().windows[0];

      expect(window.position).toEqual({
        x: 300,
        y: 200,
      });
    });
  });

  describe("resizeWindow", () => {
    it("updates window size and position", () => {
      const store = useWindowStore.getState();

      store.openWindow("about");

      store.resizeWindow(
        "about",

        {
          width: 900,
          height: 600,
        },

        {
          x: 100,
          y: 50,
        },
      );

      const window = useWindowStore.getState().windows[0];

      expect(window.size).toEqual({
        width: 900,
        height: 600,
      });

      expect(window.position).toEqual({
        x: 100,
        y: 50,
      });
    });

    it("enforces application minimum size and desktop bounds", () => {
      const store = useWindowStore.getState();
      store.setDesktopSize({ width: 500, height: 350 });
      store.openWindow("about");
      store.resizeWindow("about", { width: 100, height: 100 }, { x: 900, y: -20 });

      expect(useWindowStore.getState().windows[0]).toMatchObject({
        size: { width: 400, height: 300 },
        position: { x: 100, y: 0 },
      });
    });
  });

  describe("desktop geometry", () => {
    it("brings a moved window fully inside the desktop", () => {
      const store = useWindowStore.getState();
      store.setDesktopSize({ width: 800, height: 600 });
      store.openWindow("about");
      store.moveWindow("about", { x: -500, y: 900 });

      expect(useWindowStore.getState().windows[0].position).toEqual({ x: 0, y: 160 });
    });

    it("normalizes open windows after viewport shrink", () => {
      const store = useWindowStore.getState();
      store.openWindow("about");
      store.setDesktopSize({ width: 320, height: 500 });

      expect(useWindowStore.getState().windows[0]).toMatchObject({
        position: { x: 0, y: 60 },
        size: { width: 320, height: 440 },
      });
    });
  });

  describe("persistence", () => {
    it("restores open windows and derives active state and z-index", async () => {
      useWindowStore.setState({ desktopSize: { width: 500, height: 350 } });
      localStorage.setItem(
        "desktop-windows",
        JSON.stringify({
          state: {
            windows: [
              {
                id: "about",
                position: { x: 1000, y: -50 },
                size: { width: 650, height: 440 },
                minimized: false,
                maximized: true,
                zIndex: 42,
              },
            ],
          },
          version: 0,
        }),
      );
      await useWindowStore.persist.rehydrate();

      expect(useWindowStore.getState()).toMatchObject({
        activeWindowId: "about",
        nextZIndex: 2,
        windows: [
          {
            position: { x: 0, y: 0 },
            size: { width: 500, height: 350 },
            maximized: true,
            zIndex: 1,
          },
        ],
      });
    });

    it("ignores invalid and duplicate saved windows", () => {
      const windows = restoreWindows(
        [
          { id: "unknown" },
          { id: "about", position: { x: Infinity, y: 10 }, size: { width: -1, height: 20 }, zIndex: 2 },
          { id: "about", position: { x: 1, y: 1 } },
        ],
        null,
      );

      expect(windows).toHaveLength(1);
      expect(windows[0]).toMatchObject({
        position: { x: 160, y: 90 },
        size: { width: 650, height: 440 },
      });
    });
  });
});

describe("project detail windows", () => {
  beforeEach(() => {
    localStorage.clear();
    useWindowStore.setState({ windows: [], activeWindowId: null, nextZIndex: 1, desktopSize: null });
  });

  it("keeps different project windows independent and reuses the same project window", () => {
    const store = useWindowStore.getState();
    store.openProjectWindow("dotfiles");
    store.openProjectWindow("waves-postoffice");
    store.openProjectWindow("dotfiles");
    expect(useWindowStore.getState().windows.map((window) => window.id)).toEqual([
      "project:dotfiles",
      "project:waves-postoffice",
    ]);
    expect(useWindowStore.getState().activeWindowId).toBe("project:dotfiles");
    store.closeWindow("project:dotfiles");
    expect(useWindowStore.getState().windows.map((window) => window.id)).toEqual(["project:waves-postoffice"]);
  });

  it("restores valid project windows and ignores unknown project ids", () => {
    const windows = restoreWindows([{ id: "project:dotfiles" }, { id: "project:unknown" }], null);
    expect(windows.map((window) => window.id)).toEqual(["project:dotfiles"]);
  });
});
