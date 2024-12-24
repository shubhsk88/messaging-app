import { Button } from '@/components/ui/button';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Info, Search } from 'lucide-react';

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  return (
    <nav className="bg-[#481349] p-1.5 flex item-center justify-between h-10 text-white">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-full"
        >
          <Search className="size-4 mr-2 text-white" />
          <span className="text-xs text-white">Search {workspace?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 mr-2 text-white" />
        </Button>
      </div>
    </nav>
  );
};
