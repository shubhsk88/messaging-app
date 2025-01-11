import { useQuery } from '@tanstack/react-query';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';

interface UseGetMembersProps {
  workspaceId: Id<'workspace'>;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  return useQuery(convexQuery(api.members.get, { workspaceId }));
};
