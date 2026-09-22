"use client";

import { useWindowStore } from "../model/window.store";

import { AppWindow } from "./app-window";

import styles from "./window-manager.module.css";

export function WindowManager() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <div className={styles.layer}>
      {windows.map((window) => (
        <AppWindow key={window.id} window={window} />
      ))}
    </div>
  );
}
