'use client';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({
    workspaceId,
  });
  const channelId = useMemo(() => channels?.[0]?._id, []);

  useEffect(() => {
    if (isWorkspaceLoading || isChannelsLoading || !workspace) {
      return;
    }
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isWorkspaceLoading, isChannelsLoading, workspace, open, setOpen]);

  if (isWorkspaceLoading || isChannelsLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!workspace) {
    return (<div className='h-full flex items-center flex-col  gap-2 flex-1 justify-center'>No workspace found

    </div>)
  }
  return (
    <div>
      <h1>Workspace ID: {workspaceId}</h1>
    </div>
  );
};

export default WorkspaceIdPage;
