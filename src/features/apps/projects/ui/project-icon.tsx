interface ProjectIconProps {
  open?: boolean;
}

export function ProjectIcon({ open = false }: ProjectIconProps) {
  return <span aria-hidden="true">{open ? "📂" : "📁"}</span>;
}
