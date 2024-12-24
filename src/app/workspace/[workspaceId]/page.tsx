'use client';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ workspaceId });
  console.log(data, 'data');
  return (
    <div>
      <h1>Workspace ID: {workspaceId}</h1>
    </div>
  );
};

export default WorkspaceIdPage;
