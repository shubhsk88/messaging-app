'use client';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';
import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Loader, TriangleAlert } from 'lucide-react';
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
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({
    workspaceId,
  });
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === 'admin', [member]);


  useEffect(() => {
    if (
      isWorkspaceLoading ||
      isChannelsLoading ||
      isMemberLoading ||
      !member ||
      !workspace
    ) {
      return;
    }
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    isWorkspaceLoading,
    isChannelsLoading,
    workspace,
    open,
    setOpen,
    isMemberLoading,
    member,
    channelId,
    isAdmin,
    router,
    workspaceId,
  ]);

  if (isWorkspaceLoading || isChannelsLoading || isMemberLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!workspace || !member) {
    return (
      <div className="h-full flex items-center flex-col  gap-2 flex-1 justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          No workspace found
        </span>
      </div>
    );
  }
  return (
    <div className="h-full flex items-center flex-col  gap-2 flex-1 justify-center">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-muted-foreground text-sm">No channels found</span>
    </div>
  );
};

export default WorkspaceIdPage;
