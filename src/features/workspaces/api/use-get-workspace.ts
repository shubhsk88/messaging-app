import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseGetWorkspace {
  id: Id<'workspace'>;
}

export const useGetWorkspace = ({ id }: UseGetWorkspace) => {
  return useQuery(convexQuery(api.workspace.getById, { id}));
};
