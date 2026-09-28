import { applications } from "@/features/window-manager/config/applications";
import type { ApplicationId } from "@/features/window-manager/model/window.types";

type DesktopIconDefinition =
  | { id: string; icon: string; label: string; applicationId?: never }
  | { id: string; applicationId: ApplicationId; icon?: never; label?: never };

export const desktopIcons: DesktopIconDefinition[] = [
  { id: "computer", icon: "🖥️", label: "My Computer" },
  { id: "projects", applicationId: "projects" },
  { id: "about", applicationId: "about" },
  { id: "network", icon: "🌐", label: "Network" },
  { id: "recycle-bin", icon: "🗑️", label: "Recycle Bin" },
];

export function getDesktopIcon(icon: DesktopIconDefinition) {
  if (icon.applicationId) {
    const application = applications[icon.applicationId];
    return {
      icon: application.icon,
      label: application.desktopLabel ?? application.title,
      applicationId: icon.applicationId,
    };
  }

  return { icon: icon.icon, label: icon.label };
}
