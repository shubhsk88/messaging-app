import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { DialogTitle } from '@radix-ui/react-dialog';

export const CreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useCreateWorkspaceModal();
  const handleOpen = () => setIsOpen(true);
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
