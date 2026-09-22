import { beforeEach, describe, expect, it } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import { useWindowStore } from "@/features/window-manager/model/window.store";

import { Taskbar } from "./taskbar";

describe("Taskbar", () => {
  beforeEach(() => {
    useWindowStore.setState({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
    });
  });

  it("renders Start button", () => {
    render(<Taskbar />);

    expect(
      screen.getByRole("button", {
        name: /start/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders opened windows", () => {
    useWindowStore.getState().openWindow("about");

    render(<Taskbar />);

    expect(
      screen.getByRole("button", {
        name: /about egor/i,
      }),
    ).toBeInTheDocument();
  });

  it("minimizes active window on taskbar click", () => {
    useWindowStore.getState().openWindow("about");

    render(<Taskbar />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /about egor/i,
      }),
    );

    const state = useWindowStore.getState();

    expect(state.windows[0].minimized).toBe(true);

    expect(state.activeWindowId).toBeNull();
  });
});
