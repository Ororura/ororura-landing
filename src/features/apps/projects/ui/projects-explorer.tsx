"use client";

import { useState } from "react";

import { projects, type ProjectId } from "../model/projects";

import { ProjectIcon } from "./project-icon";

import styles from "./projects-explorer.module.css";

interface ProjectsExplorerProps {
  onOpenProject: (id: ProjectId) => void;
}

export function ProjectsExplorer({ onOpenProject }: ProjectsExplorerProps) {
  const [selectedId, setSelectedId] = useState<ProjectId | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar} role="toolbar" aria-label="Projects toolbar">
        <button type="button" onClick={() => setSelectedId(null)} disabled={!selectedId}>
          <span aria-hidden="true">⬆</span> Up
        </button>
        <span className={styles.separator} aria-hidden="true" />
        <button type="button" onClick={() => selectedId && onOpenProject(selectedId)} disabled={!selectedId}>
          <span aria-hidden="true">📂</span> Open
        </button>
      </div>
      <div className={styles.address}>
        <span>Address</span>
        <strong>🖥️ My Computer \ My Projects</strong>
      </div>
      <div className={styles.contents} aria-label="Projects">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.item} ${selectedId === project.id ? styles.selected : ""}`}
            aria-label={project.title}
            aria-pressed={selectedId === project.id}
            onClick={() => setSelectedId(project.id)}
            onDoubleClick={() => onOpenProject(project.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onOpenProject(project.id);
            }}
          >
            <span className={styles.icon}>
              <ProjectIcon open={selectedId === project.id} />
            </span>
            <span className={styles.itemText}>
              <strong>{project.title}</strong>
              <small>{project.shortDescription}</small>
            </span>
          </button>
        ))}
      </div>
      <div className={styles.status} role="status">
        <span>{selectedProject ? selectedProject.title : `${projects.length} object(s)`}</span>
        <span>{selectedProject ? "1 object selected" : "My Projects"}</span>
      </div>
    </div>
  );
}
