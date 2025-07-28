// src/pages/Forecast.tsx
import { useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useModelStore } from '../store/modelStore';
import { useForecastStore } from '../store/forecastStore';
import { getForecastByModel, getHistoricalData } from '../services/forecastService';
import type { ForecastPoint } from '../types/forecast';

// Import your defined theme colors and shadows directly
import { themeColors, themeShadows } from '../tailwind-theme'; // Adjust path as needed relative to Forecast.tsx


export default function Forecast() {
  const { models, activeModelId, setActiveModel } = useModelStore();
  const {
    forecasts, historicalData,
    setForecast, setHistoricalData,
    loadingForecast, errorForecast,
    loadingHistorical, errorHistorical,
    setLoadingForecast, setErrorForecast,
    setLoadingHistorical, setErrorHistorical,
  } = useForecastStore();

  // Fetch historical data once on component mount
  useEffect(() => {
    if (historicalData.length === 0 && !loadingHistorical && !errorHistorical) {
      setLoadingHistorical(true);
      getHistoricalData()
        .then(setHistoricalData)
        .catch((err) => setErrorHistorical('Failed to load historical data: ' + (err as Error).message))
        .finally(() => setLoadingHistorical(false));
    }
  }, [historicalData, loadingHistorical, errorHistorical, setHistoricalData, setLoadingHistorical, setErrorHistorical]);


  // Fetch forecast data for the active model
  useEffect(() => {
    if (activeModelId && !forecasts[activeModelId] && !loadingForecast && !errorForecast) {
      setLoadingForecast(true);
      getForecastByModel(activeModelId)
        .then((data) => setForecast(activeModelId, data))
        .catch((err) => setErrorForecast(`Failed to load forecast for ${activeModelId}: ` + (err as Error).message))
        .finally(() => setLoadingForecast(false));
    }
  }, [activeModelId, forecasts, loadingForecast, errorForecast, setForecast, setLoadingForecast, setErrorForecast]);

  const currentForecastData = activeModelId ? forecasts[activeModelId] : [];

  // Combine historical and forecast data for charting
  const chartData: ForecastPoint[] = [];
  const historicalMap = new Map(historicalData.map(d => [new Date(d.timestamp).toISOString().split('T')[0] + ' ' + new Date(d.timestamp).getHours(), d]));
  const forecastMap = new Map(currentForecastData.map(d => [new Date(d.timestamp).toISOString().split('T')[0] + ' ' + new Date(d.timestamp).getHours(), d]));

  const allTimestamps = new Set<string>();
  historicalData.forEach(d => allTimestamps.add(new Date(d.timestamp).toISOString().split('T')[0] + ' ' + new Date(d.timestamp).getHours()));
  currentForecastData.forEach(d => allTimestamps.add(new Date(d.timestamp).toISOString().split('T')[0] + ' ' + new Date(d.timestamp).getHours()));

  Array.from(allTimestamps).sort().forEach(tsKey => {
    const hist = historicalMap.get(tsKey);
    const fore = forecastMap.get(tsKey);
    chartData.push({
      timestamp: hist?.timestamp || fore?.timestamp || tsKey,
      actualPower: hist?.actualPower,
      predictedPower: fore?.predictedPower,
    });
  });


  if (!activeModelId) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-medium text-secondary-600 border border-secondary-200">
        <h2 className="text-2xl font-bold mb-4 text-primary-700">Wind Power Forecast</h2>
        <p>Please select a model from the <Link to="/models" className="text-primary-600 hover:underline">Model Management</Link> page to view forecasts.</p>
      </div>
    );
  }

  if (loadingForecast || loadingHistorical) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-medium text-primary-500 border border-secondary-200 flex items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-8 w-8 mr-3 text-primary-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg font-medium">Loading forecast data...</span>
      </div>
    );
  }

  if (errorForecast || errorHistorical) {
    return (
      <div className="bg-danger-100 border border-danger text-danger-700 px-6 py-4 rounded-lg relative shadow-soft">
        <strong className="font-bold">Error Loading Data!</strong>
        <span className="block sm:inline ml-2">
          {errorForecast} {errorHistorical}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-medium border border-secondary-200">
      <h2 className="text-2xl font-bold mb-6 text-primary-700">Wind Power Forecast</h2>

      <div className="mb-6 flex items-center space-x-4">
        <label htmlFor="model-select" className="block text-secondary-700 text-base font-semibold">
          Select Active Model:
        </label>
        <select
          id="model-select"
          className="shadow-soft border border-secondary-300 rounded-lg py-2 px-4 text-secondary-800 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ease-in-out cursor-pointer"
          value={activeModelId}
          onChange={(e) => setActiveModel(e.target.value)}
        >
          {models.length > 0 ? (
            models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} (Accuracy: {(model.accuracy * 100).toFixed(1)}%)
              </option>
            ))
          ) : (
            <option value="">No models available</option>
          )}
        </select>
      </div>

      <div className="bg-secondary-50 p-6 rounded-lg border border-secondary-200 shadow-soft"> {/* Chart container styling */}
        <ResponsiveContainer width="100%" height={450}> {/* Slightly taller chart */}
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={TailwindConfig.theme.extend.colors.secondary['200']} /> {/* Use Tailwind color for grid */}
            <XAxis
              dataKey="timestamp"
              tickFormatter={(t) => new Date(t).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              angle={-30}
              textAnchor="end"
              height={60}
              stroke={TailwindConfig.theme.extend.colors.secondary['600']} // Axis label color
            />
            <YAxis
              label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft', fill: TailwindConfig.theme.extend.colors.secondary['600'] }}
              stroke={TailwindConfig.theme.extend.colors.secondary['600']} // Axis label color
            />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
              formatter={(value: any, name: any) => [`${value?.toFixed(2) || 'N/A'} MW`, name === 'predictedPower' ? 'Predicted Power' : 'Actual Power']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${TailwindConfig.theme.extend.colors.secondary['300']}`,
                borderRadius: '8px',
                padding: '10px',
                boxShadow: TailwindConfig.theme.extend.boxShadow.soft,
              }}
              labelStyle={{ fontWeight: 'bold', color: TailwindConfig.theme.extend.colors.primary['700'] }}
            />
            <Legend verticalAlign="top" height={36} />
            {historicalData.length > 0 && (
              <Line
                type="monotone"
                dataKey="actualPower"
                stroke={TailwindConfig.theme.extend.colors.success}
                strokeWidth={2}
                dot={false}
                name="Actual Power"
                connectNulls={true}
              />
            )}
            {currentForecastData.length > 0 && (
              <Line
                type="monotone"
                dataKey="predictedPower"
                stroke={TailwindConfig.theme.extend.colors.primary['600']} // Use primary blue for prediction
                strokeWidth={2}
                dot={false}
                name="Predicted Power"
                connectNulls={true}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Raw Data Table */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-primary-700">Raw Data Overview</h3>
      <div className="overflow-x-auto bg-secondary-50 rounded-lg shadow-soft border border-secondary-200">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Predicted Power (MW)</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Actual Power (MW)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-100">
            {chartData.map((point, index) => (
              <tr key={point.timestamp + index} className="hover:bg-secondary-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-800">
                  {new Date(point.timestamp).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 font-semibold">
                  {point.predictedPower !== undefined ? point.predictedPower.toFixed(2) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-semibold">
                  {point.actualPower !== undefined ? point.actualPower.toFixed(2) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}