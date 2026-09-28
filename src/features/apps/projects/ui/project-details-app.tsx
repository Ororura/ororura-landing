import { getProject, type ProjectId } from "../model/projects";

import { ProjectIcon } from "./project-icon";
import { ProjectLink } from "./project-link";

import styles from "./project-details-app.module.css";

interface ProjectDetailsAppProps {
  projectId?: ProjectId;
}

export function ProjectDetailsApp({ projectId }: ProjectDetailsAppProps) {
  const project = projectId ? getProject(projectId) : undefined;
  if (!project) return <p className={styles.empty}>Project unavailable.</p>;

  return (
    <article className={styles.details}>
      <header className={styles.heading}>
        <span className={styles.icon}>
          <ProjectIcon open />
        </span>
        <div>
          <h1>{project.title}</h1>
          <p>{project.shortDescription}</p>
        </div>
      </header>
      <dl className={styles.properties}>
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
        </div>
      </dl>
      <section>
        <h2>Description</h2>
        <p>{project.description}</p>
      </section>
      <section>
        <h2>Highlights</h2>
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Links</h2>
        <div className={styles.links}>
          <ProjectLink href={project.githubUrl}>GitHub</ProjectLink>
          {project.repositories?.map((repository) => (
            <ProjectLink key={repository.url} href={repository.url}>
              {repository.label}
            </ProjectLink>
          ))}
          {project.demoUrl && <ProjectLink href={project.demoUrl}>Live Demo</ProjectLink>}
        </div>
      </section>
    </article>
  );
}
