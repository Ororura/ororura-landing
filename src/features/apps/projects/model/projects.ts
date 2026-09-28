export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  status: "Public repository";
  stack: readonly string[];
  highlights: readonly string[];
  githubUrl: string;
  demoUrl?: string;
  repositories?: readonly { label: string; url: string }[];
}

export const projects = [
  {
    id: "tutor-learning-platform",
    slug: "tutor-learning-platform",
    title: "Tutor Learning Platform",
    shortDescription: "A learning platform for tutors and students.",
    description:
      "A tutor and student platform with learning programs, lesson materials, assignments and progress tracking. The frontend and backend live in separate repositories.",
    status: "Public repository",
    stack: ["Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL"],
    highlights: ["Learning programs and lesson materials", "Assignments and progress tracking", "Tutor and student workflows"],
    githubUrl: "https://github.com/Ororura/tutorplatform-frontend",
    repositories: [{ label: "Backend", url: "https://github.com/Ororura/tutorplatform-backend" }],
  },
  {
    id: "waves-postoffice",
    slug: "waves-postoffice",
    title: "Waves PostOffice",
    shortDescription: "A post office project with a Waves blockchain integration.",
    description:
      "A Java post office project with a backend and a Waves smart contract. The repository includes parcel and transfer domain models and blockchain integration.",
    status: "Public repository",
    stack: ["Java", "Gradle", "Waves"],
    highlights: ["Post office domain models", "Contract and backend modules", "Waves transaction integration"],
    githubUrl: "https://github.com/Ororura/waves-postoffice",
  },
  {
    id: "ororura-landing",
    slug: "ororura-landing",
    title: "Ororura Landing",
    shortDescription: "A Windows 95 inspired personal portfolio.",
    description:
      "A personal portfolio presented as a classic desktop, with movable application windows and a taskbar.",
    status: "Public repository",
    stack: ["Next.js", "React", "TypeScript", "Zustand"],
    highlights: ["Desktop shortcuts", "Movable and resizable windows", "Taskbar and window state"],
    githubUrl: "https://github.com/Ororura/ororura-landing",
  },
  {
    id: "dotfiles",
    slug: "dotfiles",
    title: "Dotfiles",
    shortDescription: "Personal macOS configuration files.",
    description:
      "A collection of personal macOS configuration files and installation scripts for development tools.",
    status: "Public repository",
    stack: ["Shell", "Neovim", "tmux", "Git"],
    highlights: ["Configuration for development tools", "Installation scripts", "Shell setup"],
    githubUrl: "https://github.com/Ororura/dotfiles",
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof projects)[number]["id"];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
