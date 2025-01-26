'use client';

import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useJoin } from '@/features/workspaces/api/use-join';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const JoinPage = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const { mutate, isPending } = useJoin();
  const router = useRouter();

  const handleComplete = (code: string) => {
    mutate(
      { workspaceId, joincode: code },
      {
        onSuccess: () => {
          router.replace(`/workspace/${workspaceId}`);
          toast.success('Joined workspace');
        },
        onError: () => {
          toast.error('Error joining workspace');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg ">
      <Image src="/logo.svg" alt="logo" width={60} height={60} />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl text-bold"> Join Workspace {data?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter workspace code to join
          </p>
          <InputOTP
            disabled={isPending}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onComplete={handleComplete}
          >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTP>
        </div>
        <div className="flex gap-x-2">
          <Button size="lg" variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
