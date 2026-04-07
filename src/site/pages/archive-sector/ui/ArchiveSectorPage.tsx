import type { FC } from "react";

import { ArchiveSectorShellWidget } from "@/widgets/archive-sector-shell";

import type { ArchiveSectorId } from "@/entities/archive-sector";

type ArchiveSectorPageProps = {
  sectorId: ArchiveSectorId;
};

const ArchiveSectorPage: FC<ArchiveSectorPageProps> = ({ sectorId }) => {
  return <ArchiveSectorShellWidget sectorId={sectorId} />;
};

export { ArchiveSectorPage };
