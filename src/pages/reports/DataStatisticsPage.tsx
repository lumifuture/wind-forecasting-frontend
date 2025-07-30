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



const DataStatisticsPage = () => {
  const [selectedWindFarm, setSelectedWindFarm] = useState('farm-1');
  const [selectedRegion, setSelectedRegion] = useState('region-a');
  const [dataStartTime, setDataStartTime] = useState('2025-07-01T00:00');
  const [dataEndTime, setDataEndTime] = useState('2025-07-31T23:59');

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

  // Mock data for data statistics
  const generateDataStatistics = (farm: string, region: string, start: string, end: string) => {
    return {
      powerIntegrity: (98.5 + Math.random() * 1.5).toFixed(1),
      powerDistribution: 'Slightly skewed right (more low power periods)',
      powerChangeRate: (4 + Math.random() * 2).toFixed(1),
      windIntegrity: (97.0 + Math.random() * 2.5).toFixed(1),
      windSpeedDistribution: 'Predominantly 5-12 m/s',
      windDirectionDistribution: 'Prevailing NW winds',
      nwfIntegrity: (99.0 + Math.random() * 1.0).toFixed(1),
      nwfBias: 'Slight over-prediction in calm conditions',
    };
  };

  // Mock data for integrity chart
  const generateIntegrityChartData = () => {
    return [
      { name: 'Power Data', integrity: parseFloat((98.5 + Math.random() * 1.5).toFixed(1)) },
      { name: 'Wind Measurement', integrity: parseFloat((97.0 + Math.random() * 2.5).toFixed(1)) },
      { name: 'NWF Data', integrity: parseFloat((99.0 + Math.random() * 1.0).toFixed(1)) },
    ];
  };

  const [dataStats, setDataStats] = useState(() =>
    generateDataStatistics(selectedWindFarm, selectedRegion, dataStartTime, dataEndTime)
  );
  const [integrityChartData, setIntegrityChartData] = useState(() =>
    generateIntegrityChartData()
  );

  useEffect(() => {
    setDataStats(generateDataStatistics(selectedWindFarm, selectedRegion, dataStartTime, dataEndTime));
    setIntegrityChartData(generateIntegrityChartData());
  }, [selectedWindFarm, selectedRegion, dataStartTime, dataEndTime]);

  const handleExportChart = (format: string) => {
    alert(`Exporting chart to ${format} format. (Actual export functionality requires dedicated libraries or backend processing.)`);
  };

  return (
    <div className="p-8 flex flex-col h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Data Statistics</h1>
      <p className="text-gray-700 mb-6">
        Statistical analysis of historical power, wind measurement, and numerical weather forecast data.
      </p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="data-farm-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Wind Farm:
            </label>
            <select
              id="data-farm-filter"
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
            <label htmlFor="data-region-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Region:
            </label>
            <select
              id="data-region-filter"
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
            <label htmlFor="data-start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="data-start-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={dataStartTime}
              onChange={(e) => setDataStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="data-end-time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="data-end-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={dataEndTime}
              onChange={(e) => setDataEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Data Statistics Content */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Data Statistics</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Historical Power Data</h3>
            <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
              <li>Data Integrity: <strong>{dataStats.powerIntegrity}%</strong></li>
              <li>Distribution Characteristics: <strong>{dataStats.powerDistribution}</strong></li>
              <li>Average Change Rate: <strong>{dataStats.powerChangeRate} MW/hour</strong></li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              (Charts like histograms for distribution and line charts for change rate would be displayed here.)
            </p>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Historical Wind Measurement Data</h3>
            <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
              <li>Data Integrity: <strong>{dataStats.windIntegrity}%</strong></li>
              <li>Wind Speed Distribution: <strong>{dataStats.windSpeedDistribution}</strong></li>
              <li>Wind Direction Distribution: <strong>{dataStats.windDirectionDistribution}</strong></li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              (Charts like wind roses and wind speed histograms would be displayed here.)
            </p>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Numerical Weather Forecast Data</h3>
            <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
              <li>Data Integrity: <strong>{dataStats.nwfIntegrity}%</strong></li>
              <li>Bias Analysis: <strong>{dataStats.nwfBias}</strong></li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              (Comparison charts with actuals and bias plots would be displayed here.)
            </p>
          </div>
        </div>
      </div>

      {/* Data Integrity Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[500px] max-h-[600px] mb-8"> {/* Adjusted min-h and added max-h */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Integrity Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={integrityChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Integrity (%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Legend />
            <Bar dataKey="integrity" fill="#8884d8" name="Data Integrity" />
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

export default DataStatisticsPage;