interface ProjectLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ProjectLink({ href, children }: ProjectLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
