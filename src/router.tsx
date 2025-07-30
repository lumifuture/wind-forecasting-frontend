// src/router.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChecker from './components/AuthChecker';
import DashboardPage from './pages/DashboardPage';
import UltraShortTermForecastPage from './pages/UltraShortTermForecastPage'
import ShortTermForecastPage from './pages/ShortTermForecastPage'
import ModelManagementPage from './pages/ModelManagementPage'
import WindSpeedPowerComparisonPage from './pages/WindSpeedPowerComparisonPage'
import { WindSpeedPage, WindDirectionPage, TemperaturePage, HumidityPage, AirPressurePage }  from './pages/weather/WeatherSubmenuPage'
import LoginPage from './pages/Login';

import DataStatisticsPage    from './pages/reports/DataStatisticsPage'
import WindFarmOperationStatisticsPage    from './pages/reports/WindFarmOperationStatisticsPage'
import CorrelationAnalysisPage    from './pages/reports/CorrelationAnalysisPage'
import ErrorStatisticsPage   from './pages/reports/ErrorStatisticsPage'


import Layout  from './layout/Layout'


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* AuthChecker wraps all protected routes */}
        <Route element={<AuthChecker />}>
          <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/forecast/ultra-short-term" element={<UltraShortTermForecastPage />} />
          <Route path="/forecast/short-term" element={<ShortTermForecastPage />} />
          <Route path="/models" element={<ModelManagementPage />} />
          <Route path="/comparison" element={<WindSpeedPowerComparisonPage />} />
         {/* Reports & Analytics with sub-routes */}
          <Route path="/reports/*" > {/* Catch all for /reports */}
            <Route index element={<DataStatisticsPage />} /> {/* Default child route for /reports */}
            <Route path="data-statistics" element={<DataStatisticsPage />} />
            <Route path="operation-parameters" element={<WindFarmOperationStatisticsPage />} />
            <Route path="correlation-analysis" element={<CorrelationAnalysisPage />} />
            <Route path="error-statistics" element={<ErrorStatisticsPage />} />
          </Route>
          {/* Weather Submenu Routes */}
          <Route path="/weather/wind-speed" element={<WindSpeedPage />} />
          <Route path="/weather/wind-direction" element={<WindDirectionPage />} />
          <Route path="/weather/temperature" element={<TemperaturePage />} />
          <Route path="/weather/humidity" element={<HumidityPage />} />
          <Route path="/weather/air-pressure" element={<AirPressurePage />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<div className="p-8 text-center text-gray-600">404 - Page Not Found</div>} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}