"use client";

import { Button } from "@react95/core";

import { applications } from "@/features/window-manager/config/applications";
import { getProject } from "@/features/apps/projects/model/projects";

import {
  getWindowApplicationId,
  getWindowProjectId,
  useWindowStore,
} from "@/features/window-manager/model/window.store";

import { TaskbarClock } from "./taskbar-clock";

import styles from "./taskbar.module.css";

export function Taskbar() {
  const windows = useWindowStore((state) => state.windows);

  const activeWindowId = useWindowStore((state) => state.activeWindowId);

  const toggleTaskbarWindow = useWindowStore((state) => state.toggleTaskbarWindow);

  return (
    <footer className={styles.taskbar}>
      <Button className={styles.startButton}>
        <span className={styles.windowsLogo}>▦</span>

        <strong>Start</strong>
      </Button>

      <div className={styles.separator} />

      <div className={styles.tasks}>
        {windows.map((window) => {
          const application = applications[getWindowApplicationId(window.id)];
          const projectId = getWindowProjectId(window.id);
          const title = projectId ? getProject(projectId)?.title : application.title;

          const isActive = activeWindowId === window.id && !window.minimized;

          return (
            <button
              key={window.id}
              type="button"
              className={`${styles.task} ${isActive ? styles.taskActive : ""}`}
              onClick={() => {
                toggleTaskbarWindow(window.id);
              }}
            >
              <span aria-hidden="true">{application.icon}</span>

              <span className={styles.taskTitle}>{title}</span>
            </button>
          );
        })}
      </div>

      <TaskbarClock />
    </footer>
  );
}
