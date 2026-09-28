"use client";

import { WindowManager } from "@/features/window-manager/ui/window-manager";

import { desktopIcons, getDesktopIcon } from "../config/desktop-icons";

import { DesktopIcon } from "./desktop-icon";

import styles from "./desktop.module.css";

export function Desktop() {
  return (
    <main className={styles.desktop}>
      <div className={styles.icons}>
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} {...getDesktopIcon(item)} />
        ))}
      </div>

      <WindowManager />
    </main>
  );
}
