'use client';
import { Toolbar } from './toolbar';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="h-full bg-red-200">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkspaceLayout;
