// src/router.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UltraShortTermForecastPage from './pages/UltraShortTermForecastPage'
import ShortTermForecastPage from './pages/ShortTermForecastPage'
import ModelManagementPage from './pages/ModelManagementPage'
import WindSpeedPowerComparisonPage from './pages/WindSpeedPowerComparisonPage'
import ReportsAnalyticsPage from './pages/ReportsAnalyticsPage'
import { WindSpeedPage, WindDirectionPage, TemperaturePage, HumidityPage, AirPressurePage }  from './pages/weather/WeatherSubmenuPage'
import LoginPage from './pages/Login';

import Layout  from './layout/Layout'


export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/forecast/ultra-short-term" element={<UltraShortTermForecastPage />} />
          <Route path="/forecast/short-term" element={<ShortTermForecastPage />} />
          <Route path="/models" element={<ModelManagementPage />} />
          <Route path="/comparison" element={<WindSpeedPowerComparisonPage />} />
          <Route path="/reports" element={<ReportsAnalyticsPage />} />
          {/* Weather Submenu Routes */}
          <Route path="/weather/wind-speed" element={<WindSpeedPage />} />
          <Route path="/weather/wind-direction" element={<WindDirectionPage />} />
          <Route path="/weather/temperature" element={<TemperaturePage />} />
          <Route path="/weather/humidity" element={<HumidityPage />} />
          <Route path="/weather/air-pressure" element={<AirPressurePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<div className="p-8 text-center text-gray-600">404 - Page Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}