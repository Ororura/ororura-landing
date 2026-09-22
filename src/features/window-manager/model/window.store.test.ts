import { beforeEach, describe, expect, it } from "vitest";

import { useWindowStore } from "./window.store";

describe("Window Store", () => {
  beforeEach(() => {
    useWindowStore.setState({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
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

      expect(useWindowStore.getState().windows[0].maximized).toBe(false);
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
  });
});
