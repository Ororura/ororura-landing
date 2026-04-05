import { RitualButton } from "@/shared/ui/ritual-button";

type ArchiveEntryActionsProps = {
  enterHint: string;
  enterLabel: string;
  isBusy: boolean;
  onEnter: () => void;
  onHover?: () => void;
  onSkip: () => void;
  skipHint: string;
  skipLabel: string;
};

const ArchiveEntryActions = ({
  enterHint,
  enterLabel,
  isBusy,
  onEnter,
  onHover,
  onSkip,
  skipHint,
  skipLabel
}: ArchiveEntryActionsProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <RitualButton
        disabled={isBusy}
        hint={enterHint}
        onClick={onEnter}
        onPointerEnter={onHover}
        type="button"
        variant="primary"
      >
        {enterLabel}
      </RitualButton>

      <RitualButton
        disabled={isBusy}
        hint={skipHint}
        onClick={onSkip}
        onPointerEnter={onHover}
        type="button"
        variant="secondary"
      >
        {skipLabel}
      </RitualButton>
    </div>
  );
};

export { ArchiveEntryActions };

