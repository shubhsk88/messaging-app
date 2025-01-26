import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseGetWorkspaceInfoProps {
  id: Id<'workspace'>;
}

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
  return useQuery(convexQuery(api.workspace.getInfoById,  { id }));
};
