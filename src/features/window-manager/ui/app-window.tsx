"use client";

import { Rnd } from "react-rnd";

import { applications } from "../config/applications";

import { useWindowStore } from "../model/window.store";

import type { WindowState } from "../model/window.types";

import styles from "./app-window.module.css";

interface AppWindowProps {
  window: WindowState;
}

export function AppWindow({ window }: AppWindowProps) {
  const activeWindowId = useWindowStore((state) => state.activeWindowId);

  const closeWindow = useWindowStore((state) => state.closeWindow);

  const focusWindow = useWindowStore((state) => state.focusWindow);

  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);

  const moveWindow = useWindowStore((state) => state.moveWindow);

  const resizeWindow = useWindowStore((state) => state.resizeWindow);

  const application = applications[window.id];

  const ApplicationComponent = application.component;

  const isActive = activeWindowId === window.id;

  if (window.minimized) {
    return null;
  }

  return (
    <Rnd
      bounds="parent"
      position={window.maximized ? { x: 0, y: 0 } : window.position}
      size={
        window.maximized
          ? {
              width: "100%",
              height: "100%",
            }
          : window.size
      }
      minWidth={application.minWidth}
      minHeight={application.minHeight}
      disableDragging={window.maximized}
      enableResizing={!window.maximized}
      dragHandleClassName={styles.titleBar}
      cancel="button"
      onMouseDown={() => {
        if (!isActive) {
          focusWindow(window.id);
        }
      }}
      onDragStop={(_event, data) => {
        moveWindow(window.id, {
          x: data.x,
          y: data.y,
        });
      }}
      onResizeStop={(_event, _direction, ref, _delta, position) => {
        resizeWindow(
          window.id,

          {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          },

          position,
        );
      }}
      style={{
        zIndex: window.zIndex,
        pointerEvents: "auto",
      }}
    >
      <section className={styles.window} aria-label={application.title}>
        <header
          className={`${styles.titleBar} ${isActive ? styles.active : styles.inactive}`}
          onDoubleClick={() => {
            maximizeWindow(window.id);
          }}
        >
          <div className={styles.title}>
            <span aria-hidden="true">{application.icon}</span>

            <span>{application.title}</span>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Minimize"
              onClick={() => {
                minimizeWindow(window.id);
              }}
            >
              _
            </button>

            <button
              type="button"
              aria-label={window.maximized ? "Restore" : "Maximize"}
              onClick={() => {
                maximizeWindow(window.id);
              }}
            >
              {window.maximized ? "❐" : "□"}
            </button>

            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                closeWindow(window.id);
              }}
            >
              ×
            </button>
          </div>
        </header>

        <div className={styles.menuBar}>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>

        <div className={styles.content}>
          <ApplicationComponent />
        </div>

        <footer className={styles.statusBar}>
          <span>Ready</span>
        </footer>
      </section>
    </Rnd>
  );
}
