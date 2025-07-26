import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import ModelManagement from './pages/ModelManagement';
import Navbar from './components/Navbar';

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/models" element={<ModelManagement />} />
        </Routes>
      </div>
    </Router>
  );
}