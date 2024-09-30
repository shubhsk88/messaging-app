'use client';
import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
      console.log('No workspaces found');
    }
  }, [isLoading, open, router, setOpen, workspaceId]);

  return (
    <div>
      hello worls
      <UserButton />
    </div>
  );
}
