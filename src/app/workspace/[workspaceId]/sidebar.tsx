import { UserButton } from '@/features/auth/components/user-button';
import { WorkspaceSwitcher } from './workspace-switcher';
import { SidebarButton } from './sidebar-button';
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full flex flex-col gap-y-4 bg-[#481349] items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive />
      <SidebarButton icon={MessagesSquare} label="Dms" isActive />
      <SidebarButton icon={Bell} label="Activity" isActive />
      <SidebarButton icon={MoreHorizontal} label="More" isActive />
      <div className="flex flex-col gap-y-4 mt-auto justify-center items-center">
        <UserButton />
      </div>
    </aside>
  );
};
