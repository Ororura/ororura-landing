import { DesktopIcon } from "./desktop-icon";

import styles from "./desktop.module.css";

const desktopIcons = [
  {
    id: "computer",
    icon: "🖥️",
    label: "My Computer",
  },
  {
    id: "projects",
    icon: "📁",
    label: "My Projects",
  },
  {
    id: "about",
    icon: "📄",
    label: "About Me.txt",
  },
  {
    id: "network",
    icon: "🌐",
    label: "Network",
  },
  {
    id: "recycle-bin",
    icon: "🗑️",
    label: "Recycle Bin",
  },
] as const;

export function Desktop() {
  return (
    <main className={styles.desktop}>
      <div className={styles.icons}>
        {desktopIcons.map((item) => (
          <DesktopIcon key={item.id} icon={item.icon} label={item.label} />
        ))}
      </div>
    </main>
  );
}
