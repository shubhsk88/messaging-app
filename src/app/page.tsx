'use client';
import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import { UserButton } from '@/features/auth/components/user-button';
import { useAuthActions } from '@convex-dev/auth/react';

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      hello worls
      <UserButton />
    </div>
  );
}
