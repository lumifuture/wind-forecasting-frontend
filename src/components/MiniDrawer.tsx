// src/components/MiniDrawer.tsx
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type MiniDrawerProps = {
  isOpen: boolean;
  onToggle: () => void;
  title?: string;
  children: ReactNode;
  collapsedWidth?: number | string;
  expandedWidth?: number | string;
};

export default function MiniDrawer({
  isOpen,
  onToggle,
  title,
  children,
  collapsedWidth = '4rem',
  expandedWidth = '16rem',
}: MiniDrawerProps) {
  return (
    <aside
      className={cn(
        'h-screen border-r border-gray-200 bg-white shadow-sm top-0 left-0 z-10 transition-all duration-300 ease-in-out',
        isOpen ? `w-[${expandedWidth}]` : `w-[${collapsedWidth}]`
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 h-16 border-b border-gray-200">
        {isOpen && (
          <span className="text-blue-700 font-bold text-lg tracking-wide truncate">
            {title}
          </span>
        )}
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
      <div className="mt-4 px-2">{children}</div>
    </aside>
  );
}