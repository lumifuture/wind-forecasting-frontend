// src/components/Sidebar.tsx
import MiniDrawer from './MiniDrawer';
import SidebarNavItem from './SidebarNavItem';

import {
  LayoutDashboard,
  LineChartIcon,
  Settings,
  Wind,
  FileText,
  Sun,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard Overview', path: '/', icon: LayoutDashboard },
  { name: 'Wind Power Forecast',
    path: '/forecast',
    icon: LineChartIcon, // Using LineChartIcon
    children: [
      { name: 'Ultra-short-term forecast', path: '/forecast/ultra-short-term' },
      { name: 'Short-term forecast', path: '/forecast/short-term' },
    ],
  },
  { name: 'Model Management',
    path: '/models',
    icon: Settings,
    children: [
      { name: 'Model Lifecycle', path: '/models/model-lifecycle' },
      { name: 'Training History', path: '/models/training-history' },
      { name: 'Model Versions', path: '/models/model-versions' },
      { name: 'Rollback Mechanism', path: '/models/rollback-mechanism' },
      { name: 'Model Policies', path: '/models/model-policies' },
    ],
  },
  { name: 'Wind Speed Comparison', path: '/comparison', icon: Wind }, // This will now point to WindSpeedPowerComparisonPage
  { name: 'Reports & Analytics',
    path: '/reports',
    icon: FileText,
    children: [
      { name: 'Data Statistics', path: '/reports/data-statistics' },
      { name: 'Operation Parameters', path: '/reports/operation-parameters' },
      { name: 'Correlation Analysis', path: '/reports/correlation-analysis' },
      { name: 'Error Statistics', path: '/reports/error-statistics' },
    ],
  },
  { name: 'Weather Information',
    path: '/weather',
    icon: Sun,
    children: [
      { name: 'Wind Speed', path: '/weather/wind-speed' },
      { name: 'Wind Direction', path: '/weather/wind-direction' },
      { name: 'Temperature', path: '/weather/temperature' },
      { name: 'Humidity', path: '/weather/humidity' },
      { name: 'Air Pressure', path: '/weather/air-pressure' },
    ],
  },
];

export default function Sidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <MiniDrawer isOpen={isOpen} onToggle={onToggle} title="WindFlow">
      <div className="space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isOpen={isOpen}
            children={item.children}
          />
        ))}
      </div>
    </MiniDrawer>
  );
}