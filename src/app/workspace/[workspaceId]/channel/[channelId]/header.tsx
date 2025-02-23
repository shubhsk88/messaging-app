import { Button } from '@/components/ui/button';
import { FaChevronDown } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { useUpdateChannel } from '@/features/channels/api/use-update-channel';
import { useChannelId } from '@/hooks/use-channel-id';
import { toast } from 'sonner';
import { useRemoveChannel } from '@/features/channels/api/use-remove-channel';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useCurrentMember } from '@/features/members/api/use-current-member';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(title);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const channelId = useChannelId();
  const { data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: isUpdatingChannel } =
    useUpdateChannel();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setValue(inputValue);
  };

  const handleOpen = (value: boolean) => {
    if (member?.role !== 'admin') return;
    setEditOpen(value);
  };
  const { mutate: removeChannel, isPending: isRemovingChannel } =
    useRemoveChannel();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success('Channel updated successfully');
          setEditOpen(false);
        },
        onError: () => {
          toast.error('Failed to update channel');
        },
      }
    );

    setValue('');
  };

  const handleDelete = () => {
    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success('Channel deleted successfully');
          router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error('Failed to delete channel');
        },
      }
    );
  };
  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 boder-b bg-white">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog onOpenChange={handleOpen} open={editOpen}>
              <DialogTrigger asChild>
                <div className="px-4 py-4 bg-white border rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold"> Channel name</p>
                    {member?.role === 'admin' && (
                      <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm"># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this Channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    value={value}
                    disabled={isUpdatingChannel}
                    onChange={(e) => handleChange(e)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="eg. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingChannel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === 'admin' && (
              <button
                onClick={handleDelete}
                disabled={isRemovingChannel}
                className="flex items-center gap-x-2 px-4 py-4 bg-white border rounded-lg cursor-pointer hover:bg-gray-100 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <span className="text-sm font-semibold">Delete Channel</span>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
