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
} from 'recharts';


const ErrorStatisticsPage = () => {
  const [selectedWindFarm, setSelectedWindFarm] = useState('farm-1');
  const [selectedRegion, setSelectedRegion] = useState('region-a');
  const [reportStartTime, setReportStartTime] = useState('2025-07-01T00:00');
  const [reportEndTime, setReportEndTime] = useState('2025-07-31T23:59');

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

  // Mock data for error statistics
  const generateErrorStatistics = (farm: string, region: string, start: string, end: string) => {
    const baseRMSE = 15 + Math.random() * 5;
    const baseMAPE = 8 + Math.random() * 2;

    return {
      predictionError: (Math.random() * 50 - 25).toFixed(2), // Random value between -25 and 25
      deviationRate: (Math.random() * 10 - 5).toFixed(2), // Random value between -5 and 5
      MAPE: baseMAPE.toFixed(2),
      RMSE: baseRMSE.toFixed(2),
      Emae: (baseMAPE * 1.2).toFixed(2),
      Eme: (Math.random() * 10 - 5).toFixed(2),
      R: (0.85 + Math.random() * 0.1).toFixed(2), // Correlation coefficient
      CR: (90 + Math.random() * 8).toFixed(2), // Accuracy
      QR: (95 + Math.random() * 4).toFixed(2), // Qualified rate
      quantile95DeviationRate: (2 + Math.random() * 3).toFixed(2), // 95% quantile deviation rate
      reliability: (98 + Math.random() * 1.5).toFixed(2), // Reliability
      averageBandwidth: (10 + Math.random() * 5).toFixed(2), // Average bandwidth
      quantileLoss: (0.05 + Math.random() * 0.05).toFixed(2), // Quantile loss
    };
  };

  // Mock data for error trends over time
  const generateErrorTrendData = (farm: string, region: string, start: string, end: string) => {
    const data = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const rmse = (10 + Math.random() * 10).toFixed(2); // RMSE between 10-20
      const mape = (5 + Math.random() * 5).toFixed(2); // MAPE between 5-10

      data.push({ date: formattedDate, RMSE: parseFloat(rmse), MAPE: parseFloat(mape) });
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }
    return data;
  };


  const [errorStats, setErrorStats] = useState(() =>
    generateErrorStatistics(selectedWindFarm, selectedRegion, reportStartTime, reportEndTime)
  );
  const [errorTrendData, setErrorTrendData] = useState(() =>
    generateErrorTrendData(selectedWindFarm, selectedRegion, reportStartTime, reportEndTime)
  );

  useEffect(() => {
    setErrorStats(generateErrorStatistics(selectedWindFarm, selectedRegion, reportStartTime, reportEndTime));
    setErrorTrendData(generateErrorTrendData(selectedWindFarm, selectedRegion, reportStartTime, reportEndTime));
  }, [selectedWindFarm, selectedRegion, reportStartTime, reportEndTime]);

  const handleExportChart = (format: string) => {
    alert(`Exporting chart to ${format} format. (Actual export functionality requires dedicated libraries or backend processing.)`);
  };

  return (
    <div className="p-8 flex flex-col h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Error Statistics</h1>
      <p className="text-gray-700 mb-6">
        Analyze prediction errors and evaluate model performance using various statistical indicators.
      </p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="error-farm-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Wind Farm:
            </label>
            <select
              id="error-farm-filter"
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
            <label htmlFor="error-region-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Region:
            </label>
            <select
              id="error-region-filter"
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
            <label htmlFor="error-start-time" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="error-start-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={reportStartTime}
              onChange={(e) => setReportStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="error-end-time" className="block text-sm font-medium text-gray-700 mb-1">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="error-end-time"
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={reportEndTime}
              onChange={(e) => setReportEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Prediction Accuracy Evaluation Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Performance Indicators</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Prediction Error</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.predictionError}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Deviation Rate (%)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.deviationRate}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">MAPE (%)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.MAPE}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">RMSE</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.RMSE}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">MAE</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.Emae}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Mean Error</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.Eme}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Correlation (R)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.R}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Accuracy (CR) (%)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.CR}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Qualified Rate (QR) (%)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.QR}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">95% Quantile Dev.</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.quantile95DeviationRate}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Reliability (%)</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.reliability}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Avg. Bandwidth</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.averageBandwidth}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-sm text-gray-600">Quantile Loss</p>
            <p className="text-2xl font-bold text-blue-700">{errorStats.quantileLoss}</p>
          </div>
        </div>
      </div>

      {/* Error Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[500px] max-h-[600px] mb-8"> {/* Adjusted min-h and added max-h */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Error Trend Over Time</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={errorTrendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="RMSE" stroke="#8884d8" name="RMSE" />
            <Line type="monotone" dataKey="MAPE" stroke="#82ca9d" name="MAPE (%)" />
          </LineChart>
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

export default ErrorStatisticsPage;