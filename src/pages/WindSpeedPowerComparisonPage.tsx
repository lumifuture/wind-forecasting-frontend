import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Recharts imports, added BarChart and Bar


const WindSpeedPowerComparisonPage = () => {
  const [electricField, setElectricField] = useState('field-a');
  const [windTower, setWindTower] = useState('tower-1');
  const [height, setHeight] = useState('hub-height');
  const [startTime, setStartTime] = useState('2025-07-20T00:00'); // Example default
  const [endTime, setEndTime] = useState('2025-07-21T00:00'); // Example default

  // Mock data for the chart
  const generateChartData = () => {
    const data = [];
    const start = new Date(startTime);
    const end = new Date(endTime);
    let currentTime = start;

    while (currentTime <= end) {
      const formattedTime = currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

      // Simulate data with some variation
      const actualPower = 1000 + Math.sin(currentTime.getTime() / 3600000 / 2) * 400 + Math.random() * 100; // Power in MW
      const predictedPower = actualPower * (0.95 + Math.random() * 0.1);
      const measuredWindSpeed = 8 + Math.cos(currentTime.getTime() / 3600000 / 3) * 3 + Math.random() * 1; // Speed in m/s
      const predictedWindSpeed = measuredWindSpeed * (0.9 + Math.random() * 0.2);

      data.push({
        time: `${formattedDate} ${formattedTime}`,
        actualPower: Math.round(actualPower),
        predictedPower: Math.round(predictedPower),
        measuredWindSpeed: measuredWindSpeed.toFixed(1),
        predictedWindSpeed: predictedWindSpeed.toFixed(1),
      });

      currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // 15-minute intervals
    }
    return data;
  };

  const [chartData, setChartData] = useState(() => generateChartData());

  const handleConfirm = () => {
    console.log('Filters confirmed:', { electricField, windTower, height, startTime, endTime });
    setChartData(generateChartData()); // Update chart data on confirm
  };

  const handleExport = () => {
    console.log('Exporting data for:', { electricField, windTower, height, startTime, endTime });
    alert('Export functionality not implemented in this demo.');
  };

  const electricFields = [
    { id: 'field-a', name: 'Wind Farm Alpha' },
    { id: 'field-b', name: 'Turbine Group Beta' },
    { id: 'field-c', name: 'Site Gamma' },
  ];

  const windTowers = [
    { id: 'tower-1', name: 'Tower 1' },
    { id: 'tower-2', name: 'Tower 2' },
    { id: 'tower-3', name: 'Tower 3' },
  ];

  const heights = [
    { id: 'hub-height', name: 'Hub Height' },
    { id: '10m', name: '10m' },
    { id: '50m', name: '50m' },
  ];

  return (
    <div className="p-8 flex flex-col h-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Wind Speed & Power Comparison</h1>
      <p className="text-gray-700 mb-6">Compare actual and predicted wind speed and power data.</p>

      {/* Filter Conditions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Comparison Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
          {/* Electric Field Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="comp-electric-field" className="text-sm font-medium text-gray-700">
              Electric Field:
            </label>
            <select
              id="comp-electric-field"
              name="electric-field"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={electricField}
              onChange={(e) => setElectricField(e.target.value)}
            >
              {electricFields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          {/* Wind Tower Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="wind-tower" className="text-sm font-medium text-gray-700">
              Wind Tower:
            </label>
            <select
              id="wind-tower"
              name="wind-tower"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={windTower}
              onChange={(e) => setWindTower(e.target.value)}
            >
              {windTowers.map((tower) => (
                <option key={tower.id} value={tower.id}>
                  {tower.name}
                </option>
              ))}
            </select>
          </div>

          {/* Height Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="height" className="text-sm font-medium text-gray-700">
              Height:
            </label>
            <select
              id="height"
              name="height"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            >
              {heights.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="flex items-center gap-2">
            <label htmlFor="start-time" className="text-sm font-medium text-gray-700">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="start-time"
              name="start-time"
              className="flex-1 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          {/* End Time */}
          <div className="flex items-center gap-2">
            <label htmlFor="end-time" className="text-sm font-medium text-gray-700">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="end-time"
              name="end-time"
              className="flex-1 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
          {/* Confirmation Button */}
            <button
              onClick={handleConfirm}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Curve Chart Display Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex items-center justify-center min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="power" label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft' }} stroke="#8884d8" />
            <YAxis yAxisId="windSpeed" orientation="right" label={{ value: 'Wind Speed (m/s)', angle: 90, position: 'insideRight' }} stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Line yAxisId="power" type="monotone" dataKey="actualPower" stroke="#8884d8" name="Actual Power" dot={false} />
            <Line yAxisId="power" type="monotone" dataKey="predictedPower" stroke="#8884d8" strokeDasharray="3 3" name="Predicted Power" dot={false} />
            <Line yAxisId="windSpeed" type="monotone" dataKey="measuredWindSpeed" stroke="#82ca9d" name="Measured Wind Speed" dot={false} />
            <Line yAxisId="windSpeed" type="monotone" dataKey="predictedWindSpeed" stroke="#82ca9d" strokeDasharray="3 3" name="Predicted Wind Speed" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WindSpeedPowerComparisonPage;