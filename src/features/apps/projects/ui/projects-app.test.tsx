import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { desktopIcons, getDesktopIcon } from "@/features/desktop/config/desktop-icons";
import { DesktopIcon } from "@/features/desktop/ui/desktop-icon";
import { useWindowStore } from "@/features/window-manager/model/window.store";

import { projects } from "../model/projects";

import { ProjectDetailsApp } from "./project-details-app";
import { ProjectsApp } from "./projects-app";

describe("Projects application", () => {
  beforeEach(() => {
    localStorage.clear();
    useWindowStore.setState({ windows: [], activeWindowId: null, nextZIndex: 1, desktopSize: null });
  });

  it("opens My Projects from its desktop shortcut", () => {
    const icon = desktopIcons.find((item) => item.id === "projects");
    expect(icon).toBeDefined();
    render(<DesktopIcon {...getDesktopIcon(icon!)} />);
    fireEvent.doubleClick(screen.getByRole("button", { name: "My Projects" }));
    expect(useWindowStore.getState().windows.map((window) => window.id)).toEqual(["projects"]);
  });

  it("shows catalog data and opens project details in a separate window", () => {
    useWindowStore.getState().openWindow("projects");
    render(<ProjectsApp />);
    for (const project of projects) {
      expect(screen.getByRole("button", { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.shortDescription)).toBeInTheDocument();
    }

    const tutor = screen.getByRole("button", { name: "Tutor Learning Platform" });
    fireEvent.click(tutor);
    expect(tutor).toHaveAttribute("aria-pressed", "true");
    fireEvent.doubleClick(tutor);
    fireEvent.doubleClick(screen.getByRole("button", { name: "Dotfiles" }));

    expect(useWindowStore.getState().windows.map((window) => window.id)).toEqual([
      "projects",
      "project:tutor-learning-platform",
      "project:dotfiles",
    ]);
    expect(useWindowStore.getState().activeWindowId).toBe("project:dotfiles");
  });

  it("renders verified external links with safe new-tab attributes", () => {
    render(<ProjectDetailsApp projectId="tutor-learning-platform" />);
    expect(screen.getByText(/learning programs, lesson materials/i)).toBeInTheDocument();
    expect(screen.getByText("Public repository")).toBeInTheDocument();
    expect(screen.getByText(/Next.js, TypeScript/)).toBeInTheDocument();
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/Ororura/tutorplatform-frontend");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Backend" })).toHaveAttribute(
      "href",
      "https://github.com/Ororura/tutorplatform-backend",
    );
    expect(screen.queryByRole("link", { name: "Live Demo" })).not.toBeInTheDocument();
  });
});
