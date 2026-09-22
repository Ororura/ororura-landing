import { Button } from "@react95/core";

import { TaskbarClock } from "./taskbar-clock";

import styles from "./taskbar.module.css";

export function Taskbar() {
  return (
    <footer className={styles.taskbar}>
      <Button className={styles.startButton}>
        <span className={styles.windowsLogo}>▦</span>
        <strong>Start</strong>
      </Button>

      <div className={styles.separator} />

      <div className={styles.tasks} />

      <TaskbarClock />
    </footer>
  );
}
