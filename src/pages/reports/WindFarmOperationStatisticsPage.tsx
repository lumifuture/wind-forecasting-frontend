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


const WindFarmOperationStatisticsPage = () => {
  const [selectedWindFarm, setSelectedWindFarm] = useState('farm-1');
  const [selectedRegion, setSelectedRegion] = useState('region-a');
  const [opStartTime, setOpStartTime] = useState('2025-07-01T00:00');
  const [opEndTime, setOpEndTime] = useState('2025-07-31T23:59');

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

  // Mock data for operation parameters
  const generateOperationParameters = (farm: string, region: string, start: string, end: string) => {
    return {
      totalGeneration: (45000 + Math.random() * 10000).toFixed(0), // MWh
      effectiveGenerationTime: (700 + Math.random() * 100).toFixed(0), // hours
      maxOutput: (2.0 + Math.random() * 0.5).toFixed(1), // MW
      maxOutputTime: '2025-07-15 14:00', // Mock time
      maxSimultaneousRate: (85 + Math.random() * 10).toFixed(0), // %
      utilizationHours: (2500 + Math.random() * 500).toFixed(0), // hours
      averageLoadRate: (40 + Math.random() * 10).toFixed(0), // %
    };
  };

  // Mock data for daily generation chart
  const generateDailyGenerationData = (farm: string, region: string, start: string, end: string) => {
    const data = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const generation = Math.round(1500 + Math.random() * 500); // MWh daily generation
      data.push({ date: formattedDate, generation: generation });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const [opParams, setOpParams] = useState(() =>
    generateOperationParameters(selectedWindFarm, selectedRegion, opStartTime, opEndTime)
  );
  const [dailyGenerationData, setDailyGenerationData] = useState(() =>
    generateDailyGenerationData(selectedWindFarm, selectedRegion, opStartTime, opEndTime)
  );

  useEffect(() => {
    setOpParams(generateOperationParameters(selectedWindFarm, selectedRegion, opStartTime, opEndTime));
    setDailyGenerationData(generateDailyGenerationData(selectedWindFarm, selectedRegion, opStartTime, opEndTime));
  }, [selectedWindFarm, selectedRegion, opStartTime, opEndTime]);

  const handleExportChart = (format: string) => {
    alert(`Exporting chart to ${format} format. (Actual export functionality requires dedicated libraries or backend processing.)`);
  };

  return (
    <div className="p-8 flex flex-col h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Wind Farm Operation Parameters</h1>
      <p className="text-gray-700 mb-6">
        Statistics on key operational parameters of wind farms, including generation, output, and utilization.
      </p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="op-farm-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Wind Farm:
            </label>
            <select
              id="op-farm-filter"
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
            <label htmlFor="op-region-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Region:
            </label>
            <select
              id="op-region-filter"
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
            <label htmlFor="op-start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="op-start-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={opStartTime}
              onChange={(e) => setOpStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="op-end-time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="op-end-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={opEndTime}
              onChange={(e) => setOpEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Operation Parameters Content */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Operational Metrics</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Total Power Generation</p>
            <p className="text-2xl font-bold text-green-700">{opParams.totalGeneration} MWh</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Effective Generation Time</p>
            <p className="text-2xl font-bold text-green-700">{opParams.effectiveGenerationTime} hrs</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Maximum Output</p>
            <p className="text-2xl font-bold text-green-700">{opParams.maxOutput} MW</p>
            <p className="text-xs text-gray-500">({opParams.maxOutputTime})</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Max Wind Power Simultaneous Rate</p>
            <p className="text-2xl font-bold text-green-700">{opParams.maxSimultaneousRate}%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Utilization Hours</p>
            <p className="text-2xl font-bold text-green-700">{opParams.utilizationHours} hrs</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Average Load Rate</p>
            <p className="text-2xl font-bold text-green-700">{opParams.averageLoadRate}%</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          (This data is based on the selected wind farm and time range. Automatic report generation is supported.)
        </p>
      </div>

      {/* Daily Generation Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[500px] max-h-[600px] mb-8"> {/* Adjusted min-h and added max-h */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Power Generation (MWh)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dailyGenerationData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Generation (MWh)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: number) => `${value} MWh`} />
            <Legend />
            <Bar dataKey="generation" fill="#3b82f6" name="Daily Generation" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => alert('Generating automatic report...')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Generate Automatic Report
          </button>
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

export default WindFarmOperationStatisticsPage;