import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateChannelModal } from '../store/use-create-channel-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCreateChannel } from '../api/use-create-channel';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

export const CreateChannelModal = () => {
  const [open, setOpen] = useCreateChannelModal();
  const workspaceId = useWorkspaceId();
  const [name, setName] = useState('');
  const { mutate, isPending } = useCreateChannel();
  const handleClose = () => {
    setName('');
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId },
      {
        onSuccess: (id) => {
          handleClose();
        },
      }
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setName(value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={false}
            placeholder="e.g. #general"
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
          />
          <div className="flex justify-end">
            <Button>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
