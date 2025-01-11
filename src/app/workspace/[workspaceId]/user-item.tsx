import { cva, VariantProps } from 'class-variance-authority';
import { Id } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

interface UserItemProps {
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemsVariants>['variant'];
  id: Id<'members'>;
}

const userItemsVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const UserItem = ({ variant, id, label, image }: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label?.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparent"
      className={cn(userItemsVariants({ variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspaces/${workspaceId}/member/${id}`}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage src={image} className="rounded-md" />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
