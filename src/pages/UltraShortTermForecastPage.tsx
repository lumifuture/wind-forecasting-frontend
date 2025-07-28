import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Recharts imports, added BarChart and Bar


const UltraShortTermForecastPage = () => {
  const [electricField, setElectricField] = useState('field-a');
  const [timeRange, setTimeRange] = useState('last-6-hours');

  // Mock data for the chart, now including confidence intervals
  const generateChartData = (field: string, range: string) => {
    const now = new Date();
    const data = [];
    let hoursBack = 0;

    switch (range) {
      case 'last-1-hour': hoursBack = 1; break;
      case 'last-3-hours': hoursBack = 3; break;
      case 'last-6-hours': hoursBack = 6; break;
      case 'last-12-hours': hoursBack = 12; break;
      default: hoursBack = 6;
    }

    for (let i = hoursBack * 4; i >= 0; i--) { // 4 data points per hour for more detail
      const time = new Date(now.getTime() - (i * 15 * 60 * 1000)); // 15-minute intervals
      const hour = time.getHours();
      const minute = time.getMinutes();
      const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      
      // Simulate power data based on field and time for some variation
      let power = 0;
      if (field === 'field-a') {
        power = 500 + Math.sin(i * 0.5) * 200 + Math.random() * 50;
      } else if (field === 'field-b') {
        power = 400 + Math.cos(i * 0.4) * 150 + Math.random() * 40;
      } else { // field-c
        power = 600 + Math.sin(i * 0.6) * 250 + Math.random() * 60;
      }
      power = Math.max(0, Math.round(power)); // Ensure power is non-negative

      // Calculate confidence intervals based on power
      const confidenceDelta = power * 0.1; // 10% confidence interval for demo
      const upperBound = Math.round(power + confidenceDelta + Math.random() * 20);
      const lowerBound = Math.round(power - confidenceDelta - Math.random() * 20);

      data.push({ time: formattedTime, power: power, upperBound: Math.max(0, upperBound), lowerBound: Math.max(0, lowerBound) });
    }
    return data;
  };

  const [chartData, setChartData] = useState(() => generateChartData(electricField, timeRange));

  const handleConfirm = () => {
    console.log('Filters confirmed:', { electricField, timeRange });
    setChartData(generateChartData(electricField, timeRange)); // Update chart data on confirm
  };

  const handleExport = () => {
    console.log('Exporting data for:', { electricField, timeRange });
    alert('Export functionality not implemented in this demo.');
  };

  const electricFields = [
    { id: 'field-a', name: 'Wind Farm Alpha' },
    { id: 'field-b', name: 'Turbine Group Beta' },
    { id: 'field-c', name: 'Site Gamma' },
  ];

  const timeRanges = [
    { id: 'last-1-hour', name: 'Last 1 Hour' },
    { id: 'last-3-hours', name: 'Last 3 Hours' },
    { id: 'last-6-hours', name: 'Last 6 Hours' },
    { id: 'last-12-hours', name: 'Last 12 Hours' },
  ];

  return (
    <div className="p-8 flex flex-col h-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Ultra-short-term Wind Power Forecast</h1>
      <p className="text-gray-700 mb-6">Detailed forecast for the next few hours. This data is crucial for real-time grid management.</p>

      {/* Filter Conditions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Forecast Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Electric Field Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="electric-field" className="text-sm font-medium text-gray-700">
              Electric Field:
            </label>
            <select
              id="electric-field"
              name="electric-field"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={electricField}
              onChange={(e) => setElectricField(e.target.value)}>
              {electricFields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time Range Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="time-range" className="text-sm font-medium text-gray-700">
              Time Range:
            </label>
            <select
              id="time-range"
              name="time-range"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>

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
            Export Data
          </button>
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
            <YAxis label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="power" stroke="#8884d8" activeDot={{ r: 8 }} name="Forecast Power" />
            <Line type="monotone" dataKey="upperBound" stroke="#82ca9d" strokeDasharray="5 5" name="Upper Bound" />
            <Line type="monotone" dataKey="lowerBound" stroke="#ffc658" strokeDasharray="5 5" name="Lower Bound" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UltraShortTermForecastPage;