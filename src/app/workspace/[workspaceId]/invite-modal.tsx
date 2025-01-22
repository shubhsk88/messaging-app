import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { useNewJoinCode } from '@/features/workspaces/api/use-new-join-code';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();

  const handleCopy = () => {
    const link = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success('Copied to clipboard'));
  };
  const handleNewCode = () => {
    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success('New code generated');
        },
        onError: () => {
          toast.error('Error generating new code');
        },
      }
    );
  };
  const { mutate, isPending } = useNewJoinCode();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite People to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-wide uppercase">
            {joinCode}
          </p>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            Copy link
            <CopyIcon className="size-5 ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button
            disabled={isPending}
            onClick={() => handleNewCode()}
            variant="outline"
          >
            New code
            <RefreshCcw className="ml-4 size-4" />
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
