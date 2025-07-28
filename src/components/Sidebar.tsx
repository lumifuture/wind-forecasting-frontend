// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard Overview', path: '/', icon: '📊' },
  { name: 'Wind Power Forecast', path: '/forecast', icon: '📈' },
  { name: 'Model Management', path: '/models', icon: '⚙️' },
  { name: 'Wind Speed Comparison', path: '/comparison', icon: '💨' },
  { name: 'Reports & Analytics', path: '/reports', icon: '📄' },
  { name: 'Weather Information', path: '/weather', icon: '☀️' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  const baseLinkClasses =
    'flex items-center px-4 py-3 rounded-lg transition-colors duration-200 font-medium text-gray-700';

  const linkClass = (path: string) =>
    `${baseLinkClasses} ${
      location.pathname === path
        ? 'bg-blue-600 text-white shadow-lg'
        : 'hover:bg-blue-100 hover:text-blue-700'
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-md h-screen fixed top-0 left-0 z-20 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-700">WindFlow</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-600 hover:text-gray-900"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={linkClass(item.path)}>
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}
