import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspaceOptions, isLoading: workspaceOptionsLoading } =
    useGetWorkspaces();

  const filteredWorkspaces = workspaceOptions?.filter(
    (w) => w._id !== workspaceId
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ababad] hover:bg-[#ababad]/80 font-semibold tex-xl">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer capitalize flex-col justify-start items-start"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((w) => (
          <DropdownMenuItem
            key={w._id}
            onClick={() => router.push(`/workspace/${w._id}`)}
            className="cursor-pointer capitalize overflow-hidden"
          >
            <div className="size-9 flex items-center justify-center mr-2 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md">
              {w.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{w.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 flex items-center justify-center mr-2 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
