import { beforeEach, describe, expect, it } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import { useWindowStore } from "@/features/window-manager/model/window.store";

import { DesktopIcon } from "./desktop-icon";

describe("DesktopIcon", () => {
  beforeEach(() => {
    useWindowStore.setState({
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
    });
  });

  it("renders icon label", () => {
    render(<DesktopIcon icon="📄" label="About Me.txt" applicationId="about" />);

    expect(
      screen.getByRole("button", {
        name: "About Me.txt",
      }),
    ).toBeInTheDocument();
  });

  it("opens application on double click", () => {
    render(<DesktopIcon icon="📄" label="About Me.txt" applicationId="about" />);

    fireEvent.doubleClick(
      screen.getByRole("button", {
        name: "About Me.txt",
      }),
    );

    const state = useWindowStore.getState();

    expect(state.windows).toHaveLength(1);

    expect(state.windows[0].id).toBe("about");
  });
});
