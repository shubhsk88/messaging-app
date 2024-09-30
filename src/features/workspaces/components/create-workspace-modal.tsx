import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const CreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useCreateWorkspaceModal();
  const { mutate, isError, error, isPending } = useCreateWorkspace();
  const handleOpen = () => setIsOpen(true);
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
    setName('');
  };
  const [name, setName] = useState('');

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    mutate(
      {
        name: formData.get('name') as string,
      },
      {
        onSuccess(data, variables, context) {
          router.push(`/workspace/${data}`);
          handleClose();
        },
      }
    );
  };
  console.log(isOpen, 'jkjk');
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            onChange={(evt) => setName(evt.target.value)}
            value={name}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name"
          />
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
