"use client";

import { useWindowStore } from "@/features/window-manager/model/window.store";

import type { ApplicationId } from "@/features/window-manager/model/window.types";

import styles from "./desktop-icon.module.css";

type DesktopIconProps = Readonly<{
  icon: string;
  label: string;

  applicationId?: ApplicationId;
}>;

export function DesktopIcon({ icon, label, applicationId }: DesktopIconProps) {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <button
      className={styles.icon}
      type="button"
      onDoubleClick={() => {
        if (applicationId) {
          openWindow(applicationId);
        }
      }}
    >
      <span className={styles.image} aria-hidden="true">
        {icon}
      </span>

      <span className={styles.label}>{label}</span>
    </button>
  );
}
