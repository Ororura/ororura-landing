import { ArchiveSectorShellWidget } from "@/widgets/archive-sector-shell";

import type { ArchiveSectorId } from "@/entities/archive-sector";

type ArchiveSectorPageProps = {
  sectorId: ArchiveSectorId;
};

const ArchiveSectorPage = ({ sectorId }: ArchiveSectorPageProps) => {
  return <ArchiveSectorShellWidget sectorId={sectorId} />;
};

export { ArchiveSectorPage };
