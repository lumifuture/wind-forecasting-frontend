// src/router.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChecker from './components/AuthChecker';
import DashboardPage from './pages/DashboardPage';
import UltraShortTermForecastPage from './pages/UltraShortTermForecastPage'
import ShortTermForecastPage from './pages/ShortTermForecastPage'

import DailyEnergyForecastPage from './pages/energy/DailyEnergyForecastPage'
import LongTermEnergyForecastPage from './pages/energy/LongTermEnergyForecastPage'

import ModelManagementPage from './pages/ModelManagementPage'
import WindSpeedPowerComparisonPage from './pages/WindSpeedPowerComparisonPage'
import { WindSpeedPage, WindDirectionPage, TemperaturePage, HumidityPage, AirPressurePage }  from './pages/weather/WeatherSubmenuPage'
import LoginPage from './pages/Login';

import DataStatisticsPage    from './pages/reports/DataStatisticsPage'
import WindFarmOperationStatisticsPage    from './pages/reports/WindFarmOperationStatisticsPage'
import CorrelationAnalysisPage    from './pages/reports/CorrelationAnalysisPage'
import ErrorStatisticsPage   from './pages/reports/ErrorStatisticsPage'

import ModelLifecyclePage from './pages/ModelManagement/ModelLifecyclePage'
import TrainingHistoryPage from './pages/ModelManagement/TrainingHistoryPage'
import ModelVersionsPage from './pages/ModelManagement/ModelVersionsPage'
import RollbackMechanismPage from './pages/ModelManagement/RollbackMechanismPage'
import ModelPoliciesPage from './pages/ModelManagement/ModelPoliciesPage'

import FarmManagementPage from './pages/farms/FarmManagementPage'
import TurbineManagementPage from './pages/farms/TurbineManagementPage'
import FarmGroupingPage from './pages/farms/FarmGroupingPage'

import DataReportingPage from './pages/reporting/DataReportingPage';
import ReportingSettingsPage from './pages/reporting/ReportingSettingsPage';
import ReportRecordQueryPage from './pages/reporting/ReportRecordQueryPage';

import UserManagementPage from './pages/system/UserManagementPage';
import AuditLogsPage from './pages/system/AuditLogsPage'; 
import AlertsPage from './pages/system/AlertsPage';
import SystemMonitoringPage from './pages/system/SystemMonitoringPage';
import ReportsPage from './pages/system/ReportsPage';

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

          <Route path="/energy-forecast/daily" element={<DailyEnergyForecastPage />} />
          <Route path="/energy-forecast/long-term" element={<LongTermEnergyForecastPage />} />

          <Route path="/models" element={<ModelManagementPage />} />
          <Route path="/comparison" element={<WindSpeedPowerComparisonPage />} />

          <Route path="/reporting/data" element={<DataReportingPage />} />
          <Route path="/reporting/settings" element={<ReportingSettingsPage />} />
          <Route path="/reporting/records" element={<ReportRecordQueryPage />} />
          
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

          {/* Nested Model Management routes */}
          <Route path="/models/model-lifecycle" element={<ModelLifecyclePage />} />
          <Route path="/models/training-history" element={<TrainingHistoryPage />} /> {/* Dynamic route for model details */}
          <Route path="/models/model-versions" element={<ModelVersionsPage />} />
          <Route path="/models/rollback-mechanism" element={<RollbackMechanismPage />} /> {/* Dynamic route for model details */}
          <Route path="/models/model-policies" element={<ModelPoliciesPage />} />
          
          <Route path="/farms/manage" element={<FarmManagementPage />} />
          <Route path="/farms/turbines" element={<TurbineManagementPage />} />
          <Route path="/farms/groups" element={<FarmGroupingPage />} />

          <Route path="/system/user-management" element={<UserManagementPage />} />
          <Route path="/system/audit-logs" element={<AuditLogsPage />} />
          <Route path="/system/alerts" element={<AlertsPage />} />
          <Route path="/system/system-monitoring" element={<SystemMonitoringPage />} />
          <Route path="/system/reports" element={<ReportsPage />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<div className="p-8 text-center text-gray-600">404 - Page Not Found</div>} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}