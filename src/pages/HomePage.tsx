// src/pages/HomePage.tsx
import { useModelStore } from '../store/modelStore';
import { useForecastStore } from '../store/forecastStore';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { models, activeModelId } = useModelStore();
  const { historicalData } = useForecastStore();

  const activeModel = models.find(m => m.id === activeModelId);

  // Example: Get last recorded actual power
  const lastActualPower = historicalData.length > 0 ? historicalData[historicalData.length - 1].actualPower : null;
  const lastActualTimestamp = historicalData.length > 0 ? new Date(historicalData[historicalData.length - 1].timestamp).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';

  return (
    <div className="space-y-8"> {/* More vertical space */}
      <h1 className="text-3xl font-extrabold text-primary-800 mb-6">Dashboard Overview</h1> {/* Stronger heading */}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Consistent gap */}
        <div className="bg-white p-6 rounded-lg shadow-medium border-l-4 border-primary-500 transition-transform hover:scale-102"> {/* Enhanced card style */}
          <h3 className="text-lg font-semibold text-secondary-700 mb-2">Active Forecast Model</h3>
          <p className="text-3xl font-bold text-primary-600">{activeModel?.name || 'No Model Selected'}</p>
          {activeModel && (
            <p className="text-sm text-secondary-500 mt-1">Accuracy: <span className="font-semibold text-success">{(activeModel.accuracy * 100).toFixed(1)}%</span></p>
          )}
          <Link to="/models" className="text-primary-600 hover:text-primary-800 hover:underline text-sm font-medium mt-4 block">
            Manage Models &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-medium border-l-4 border-success transition-transform hover:scale-102">
          <h3 className="text-lg font-semibold text-secondary-700 mb-2">Last Recorded Actual Power</h3>
          <p className="text-3xl font-bold text-success">
            {lastActualPower !== null ? `${lastActualPower.toFixed(2)} MW` : 'N/A'}
          </p>
          <p className="text-sm text-secondary-500 mt-1">At: {lastActualTimestamp}</p>
          <Link to="/forecast" className="text-primary-600 hover:text-primary-800 hover:underline text-sm font-medium mt-4 block">
            View Forecast Chart &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-medium border-l-4 border-warning transition-transform hover:scale-102">
          <h3 className="text-lg font-semibold text-secondary-700 mb-2">Total Models Available</h3>
          <p className="text-3xl font-bold text-warning">{models.length}</p>
          <p className="text-sm text-secondary-500 mt-1">Ready for use in predictions</p>
          <Link to="/models" className="text-primary-600 hover:text-primary-800 hover:underline text-sm font-medium mt-4 block">
            Browse All Models &rarr;
          </Link>
        </div>
      </div>

      {/* Placeholder for a quick chart or important alerts */}
      <div className="bg-white p-6 rounded-lg shadow-medium border border-secondary-200">
        <h3 className="text-xl font-semibold text-primary-700 mb-4">Quick Forecast Overview</h3>
        <div className="text-secondary-600 leading-relaxed">
          This section provides a concise summary of current system status and immediate forecast insights.
          You might see real-time power generation, a simplified trend chart, or critical alerts here.
          This will be populated with a dynamic mini-chart or KWh displays in future updates.
        </div>
        <p className="mt-4 text-sm text-secondary-500">
          For detailed analysis and historical comparisons, please visit the <Link to="/forecast" className="text-primary-600 hover:underline">Wind Power Forecast</Link> page.
        </p>
      </div>
    </div>
  );
}