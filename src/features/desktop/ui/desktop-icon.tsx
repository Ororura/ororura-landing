import styles from "./desktop-icon.module.css";

type DesktopIconProps = Readonly<{
  icon: string;
  label: string;
}>;

export function DesktopIcon({ icon, label }: DesktopIconProps) {
  return (
    <button className={styles.icon} type="button">
      <span className={styles.image} aria-hidden="true">
        {icon}
      </span>

      <span className={styles.label}>{label}</span>
    </button>
  );
}