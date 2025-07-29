import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';


const CorrelationAnalysisPage = () => {
  const [selectedWindFarm, setSelectedWindFarm] = useState('farm-1');
  const [selectedRegion, setSelectedRegion] = useState('region-a');
  const [corrStartTime, setCorrStartTime] = useState('2025-07-01T00:00');
  const [corrEndTime, setCorrEndTime] = useState('2025-07-31T23:59');

  const mockWindFarms = [
    { id: 'farm-1', name: 'Wind Farm Alpha' },
    { id: 'farm-2', name: 'Wind Farm Beta' },
    { id: 'farm-3', name: 'Wind Farm Gamma' },
  ];

  const mockRegions = [
    { id: 'region-a', name: 'North Region' },
    { id: 'region-b', name: 'South Region' },
    { id: 'region-c', name: 'East Region' },
  ];

  // Mock data for correlation analysis
  const generateCorrelationData = (farm: string, region: string, start: string, end: string) => {
    return {
      powerVsWindSpeed: (0.85 + Math.random() * 0.1).toFixed(2),
      powerVsTemperature: (-0.2 + Math.random() * 0.1).toFixed(2),
      windSpeedVsNWF: (0.80 + Math.random() * 0.1).toFixed(2),
    };
  };

  // Mock data for a correlation strength bar chart
  const generateCorrelationStrengthData = (farm: string, region: string, start: string, end: string) => {
    return [
      { name: 'Power vs. Wind Speed', correlation: parseFloat((0.85 + Math.random() * 0.1).toFixed(2)) },
      { name: 'Power vs. Temperature', correlation: parseFloat((-0.2 + Math.random() * 0.1).toFixed(2)) },
      { name: 'Wind Speed vs. NWF', correlation: parseFloat((0.80 + Math.random() * 0.1).toFixed(2)) },
    ];
  };


  const [correlationData, setCorrelationData] = useState(() =>
    generateCorrelationData(selectedWindFarm, selectedRegion, corrStartTime, corrEndTime)
  );
  const [correlationStrengthData, setCorrelationStrengthData] = useState(() =>
    generateCorrelationStrengthData(selectedWindFarm, selectedRegion, corrStartTime, corrEndTime)
  );

  useEffect(() => {
    setCorrelationData(generateCorrelationData(selectedWindFarm, selectedRegion, corrStartTime, corrEndTime));
    setCorrelationStrengthData(generateCorrelationStrengthData(selectedWindFarm, selectedRegion, corrStartTime, corrEndTime));
  }, [selectedWindFarm, selectedRegion, corrStartTime, corrEndTime]);

  const handleExportChart = (format: string) => {
    alert(`Exporting chart to ${format} format. (Actual export functionality requires dedicated libraries or backend processing.)`);
  };

  return (
    <div className="p-8 flex flex-col h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Correlation Analysis</h1>
      <p className="text-gray-700 mb-6">
        Analyze the relationships between historical power data, wind measurement data, and numerical weather forecast data.
      </p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="corr-farm-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Wind Farm:
            </label>
            <select
              id="corr-farm-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedWindFarm}
              onChange={(e) => setSelectedWindFarm(e.target.value)}
            >
              {mockWindFarms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="corr-region-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Region:
            </label>
            <select
              id="corr-region-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {mockRegions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="corr-start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="corr-start-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={corrStartTime}
              onChange={(e) => setCorrStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="corr-end-time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="corr-end-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={corrEndTime}
              onChange={(e) => setCorrEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Correlation Analysis Content */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Correlation Coefficients</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>Power vs. Wind Speed:</strong> <span className="text-blue-700 font-bold">{correlationData.powerVsWindSpeed}</span> (Strong positive correlation)
          </p>
          <p className="text-gray-600">
            <strong>Power vs. Temperature:</strong> <span className="text-blue-700 font-bold">{correlationData.powerVsTemperature}</span> (Weak negative correlation)
          </p>
          <p className="text-gray-600">
            <strong>Wind Speed vs. Numerical Weather Forecast Wind Speed:</strong> <span className="text-blue-700 font-bold">{correlationData.windSpeedVsNWF}</span> (High correlation)
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          (Scatter plots and correlation matrices would be displayed here for detailed analysis.)
        </p>
      </div>

      {/* Correlation Strength Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[500px] max-h-[600px] mb-8"> {/* Adjusted min-h and added max-h */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Correlation Strength</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={correlationStrengthData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Correlation Coefficient', angle: -90, position: 'insideLeft' }} domain={[-1, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="correlation" fill="#82ca9d" name="Correlation" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => handleExportChart('SVG')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Export Chart to SVG
          </button>
          <button
            onClick={() => handleExportChart('PNG')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Export Chart to PNG
          </button>
          <button
            onClick={() => handleExportChart('PDF')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Export Chart to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrelationAnalysisPage;