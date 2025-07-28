// src/components/SidebarNavItem.tsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type SubItem = {
  name: string;
  path: string;
};

type SidebarNavItemProps = {
  name: string;
  path: string;
  icon: IconType;
  isOpen: boolean;
  children?: SubItem[];
};

export default function SidebarNavItem({
  name,
  path,
  icon: Icon,
  isOpen,
  children = [],
}: SidebarNavItemProps) {
  const location = useLocation();
  const isSubmenu = children.length > 0;

  // Determine if the item or any of its children are active
  const isActive =
    location.pathname === path ||
    children.some((child) => location.pathname.startsWith(child.path));

  // State to manage submenu expansion, initialized based on active status
  const [expanded, setExpanded] = useState(isActive);

  // ➤ Submenu Case: Render with toggle logic
  if (isSubmenu) {
    return (
      <div>
        <div
          className={cn(
            'group flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium tracking-wide cursor-pointer',
            isActive
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
          )}
          onClick={() => setExpanded((prev) => !prev)}
          title={!isOpen ? name : undefined} // Tooltip when sidebar is collapsed
        >
          <div className="flex items-center gap-3">
            <Icon className={cn('w-5 h-5', !isOpen && 'mx-auto')} /> {/* Center icon when collapsed */}
            {isOpen && <span className="truncate">{name}</span>} {/* Hide text when collapsed */}
          </div>
          {isOpen && ( // Only show chevron when sidebar is open
            <span>
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </div>

        {isOpen && expanded && ( // Only show submenu when sidebar is open and expanded
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive: childIsActive }) =>
                  cn(
                    'block text-sm rounded-lg px-3 py-1.5 transition-colors duration-200',
                    childIsActive
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  )
                }
              >
                {child.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

    // ➤ Simple NavLink case (no children)
  return (
    <NavLink
      to={path}
      className={({ isActive: navIsActive }) =>
        cn(
          'group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium tracking-wide',
          navIsActive
            ? 'bg-blue-600 text-white shadow'
            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
        )
      }
      title={!isOpen ? name : undefined} // Tooltip when sidebar is collapsed
    >
      <Icon className={cn('w-5 h-5', !isOpen && 'mx-auto')} /> {/* Center icon when collapsed */}
      {isOpen && <span className="truncate">{name}</span>} {/* Hide text when collapsed */}
    </NavLink>
  );
}