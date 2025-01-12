import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cva, VariantProps } from 'class-variance-authority';
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from 'lucide-react';
import { WorkspaceHeader } from './workspace-header';
import { SidebarItem } from './sidebar-item';
import { useGetChannels } from '@/features/channels/api/use-get-channels';
import { WorkspaceSection } from './workspace-section';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { UserItem } from './user-item';
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal';

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading || channelsLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] justify-center items-center h-full w-full">
        <Loader className="size-10 animate-spin text-white" />
      </div>
    );
  }
  if (!workspace || !member) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] gap-y-4 justify-center items-center h-full w-full">
        <AlertTriangle className="size-5  text-white" />
        <p className="text-white text-sm">No workspace found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5e2c5f] gap-y-4  h-full w-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === 'admin'}
      />
      <div className="flex flex-col col-2 px-2 mt-3">
        <SidebarItem id="threads" label="Threads" icon={MessageSquareText} />
        <SidebarItem id="drafts" label="Draft & Send" icon={SendHorizonal} />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New"
        onNew={member.role === 'admin' ? () => setOpen(true) : undefined}
      >
        {channels?.map((channelItem) => (
          <SidebarItem
            key={channelItem._id}
            id={channelItem._id}
            label={channelItem.name}
            icon={HashIcon}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((member) => (
          <UserItem
            label={member.user.name}
            key={member._id}
            id={member._id}
            image={member.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
