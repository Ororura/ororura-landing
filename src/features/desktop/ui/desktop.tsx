"use client";

import { useEffect, useRef } from "react";

import { useWindowStore } from "@/features/window-manager/model/window.store";
import { WindowManager } from "@/features/window-manager/ui/window-manager";

import { desktopIcons, getDesktopIcon } from "../config/desktop-icons";

import { DesktopIcon } from "./desktop-icon";

import styles from "./desktop.module.css";

export function Desktop() {
  const desktopRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = desktopRef.current;
    if (!desktop) return;

    const updateSize = () => {
      useWindowStore.getState().setDesktopSize({
        width: desktop.clientWidth,
        height: desktop.clientHeight,
      });
    };

    const observer = new ResizeObserver(updateSize);
    let mounted = true;
    void Promise.resolve(useWindowStore.persist.rehydrate()).then(() => {
      if (!mounted) return;
      updateSize();
      observer.observe(desktop);
    });
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <main ref={desktopRef} className={styles.desktop}>
      <div className={styles.icons}>
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} {...getDesktopIcon(item)} />
        ))}
      </div>

      <WindowManager />
    </main>
  );
}
