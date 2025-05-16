import * as Dialog from '@radix-ui/react-dialog';
import { ESeason } from '../Store/useGameState';
import type { FC } from 'react';

interface SeasonDialogProps {
  season: ESeason;
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SeasonDialog: FC<SeasonDialogProps> = ({ season, openDialog, onOpenChange }) => {
  return (
    <Dialog.Root open={openDialog} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-2">
            {season === ESeason.WINTER ? `C'est l'hiver 🌨️` : `C'est l'été ☀️`}
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            {season === ESeason.WINTER
              ? `En hiver, les lapins sont cachés, il n'y a plus de nourritures !!`
              : `C'est l'été, la chasse aux lapins est ouverte 😋 !!`}
          </Dialog.Description>

          <Dialog.Close className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Fermer</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SeasonDialog;
