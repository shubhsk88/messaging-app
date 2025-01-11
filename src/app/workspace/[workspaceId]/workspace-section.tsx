import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, PlusIcon } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';
import { useToggle } from 'react-use';

interface WorkspaceSectionProps {
  label: string;
  onNew?: () => void;
  hint: string;
  children?: React.ReactNode;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  label,
  onNew,
  hint,
  children,
}) => {
  const [on, toggle] = useToggle(true);
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          onClick={toggle}
          className="p-0.5 text-sm shrink-0 size-6 text-[#f9edffcc]"
        >
          <FaCaretDown
            className={cn('size-4 transition-transform', !on && '-rotate-90')}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px]"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              size="iconSm"
              variant="transparent"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6  shrink-0 "
            >
              <PlusIcon size="size-3.5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
