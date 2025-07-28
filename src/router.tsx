// src/router.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ModelManagement from './pages/ModelManagement';
import Login from './pages/Login';
import DataComparison from './pages/DataComparison';
import Reports from './pages/Reports';
import WeatherInfo from './pages/WeatherInfo';

import DashboardLayout from './layout/DashboardLayout'; // Import the new layout
import { useAuthStore } from './store/authStore';

// Removed ProtectedRoute as DashboardLayout handles the protection
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
//   return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
// }

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* All protected routes are now children of DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/models" element={<ModelManagement />} />
          <Route path="/comparison" element={<DataComparison />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/weather" element={<WeatherInfo />} />
        </Route>
        {/* Redirect any unmatched routes to home or login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}