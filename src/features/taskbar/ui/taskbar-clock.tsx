"use client";

import { useEffect, useState } from "react";

import styles from "./taskbar-clock.module.css";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function TaskbarClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const update = () => {
      setTime(formatTime(new Date()));
    };

    const interval = window.setInterval(update, 10_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return <div className={styles.clock}>{time}</div>;
}
