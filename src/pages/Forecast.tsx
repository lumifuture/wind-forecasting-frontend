import { useEffect } from 'react';
import { useForecastStore } from '../store/forecastStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Forecast() {
  const { data, loading, error, fetchForecast } = useForecastStore();

  useEffect(() => {
    if (data.length === 0) {
      fetchForecast();
    }
  }, [fetchForecast, data]);

  if (loading) return <div>Loading forecast data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forecast Chart (with Zustand)</h2>

      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual_power" stroke="#8884d8" name="Actual Power" />
            <Line type="monotone" dataKey="predicted_power" stroke="#82ca9d" name="Predicted Power" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}