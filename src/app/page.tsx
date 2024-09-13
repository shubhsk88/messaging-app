'use client';
import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useAuthActions } from '@convex-dev/auth/react';
import { useEffect, useMemo } from 'react';

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log('workspaceId:', workspaceId);
    } else if (!open) {
      setOpen(true);
      console.log('No workspaces found');
    }
  }, [isLoading, workspaceId]);

  return (
    <div>
      hello worls
      <UserButton />
    </div>
  );
}
