import styles from "./about-app.module.css";

export function AboutApp() {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <div className={styles.avatar}>🖥️</div>

        <strong>Egor.exe</strong>

        <span>Java Backend Developer</span>
      </div>

      <div className={styles.content}>
        <h1>Hi, I&apos;m Egor</h1>

        <h2>Java Backend Developer</h2>

        <p>I build backend applications using Java, Spring Boot and PostgreSQL.</p>

        <p>
          I enjoy solving real problems, learning new technologies and building things that people can actually use.
        </p>

        <div className={styles.divider} />

        <p className={styles.quote}>Just a developer trying to make cool stuff.</p>
      </div>
    </div>
  );
}
