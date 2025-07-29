import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Recharts imports, added BarChart and Bar


const ShortTermForecastPage = () => {
  const [electricField, setElectricField] = useState('field-a');
  const [timeRange, setTimeRange] = useState('next-3-days'); // Default for short-term forecast

  // Mock data for the chart, now including confidence intervals for short-term (daily)
  const generateChartData = (field: string, range: string) => {
    const now = new Date();
    const data = [];
    let daysAhead = 0;

    switch (range) {
      case 'next-1-day': daysAhead = 1; break;
      case 'next-3-days': daysAhead = 3; break;
      case 'next-7-days': daysAhead = 7; break;
      default: daysAhead = 3;
    }

    for (let i = 0; i <= daysAhead; i++) {
      const date = new Date(now.getTime() + (i * 24 * 60 * 60 * 1000)); // Daily intervals
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      
      // Simulate power data based on field and time for some variation
      let power = 0;
      if (field === 'field-a') {
        power = 1500 + Math.sin(i * 0.8) * 500 + Math.random() * 100;
      } else if (field === 'field-b') {
        power = 1200 + Math.cos(i * 0.7) * 400 + Math.random() * 80;
      } else { // field-c
        power = 1800 + Math.sin(i * 0.9) * 600 + Math.random() * 120;
      }
      power = Math.max(0, Math.round(power)); // Ensure power is non-negative

      // Calculate confidence intervals based on power
      const confidenceDelta = power * 0.15; // 15% confidence interval for demo (slightly wider for short-term)
      const upperBound = Math.round(power + confidenceDelta + Math.random() * 50);
      const lowerBound = Math.round(power - confidenceDelta - Math.random() * 50);

      data.push({ date: formattedDate, power: power, upperBound: Math.max(0, upperBound), lowerBound: Math.max(0, lowerBound) });
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
    { id: 'next-1-day', name: 'Next 1 Day' },
    { id: 'next-3-days', name: 'Next 3 Days' },
    { id: 'next-7-days', name: 'Next 7 Days' },
  ];

  return (
    <div className="p-8 flex flex-col h-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Short-term Wind Power Forecast</h1>
      <p className="text-gray-700 mb-6">Forecast for the upcoming 24-72 hours, essential for operational planning.</p>

      {/* Filter Conditions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Forecast Data</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Electric Field Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="electric-field-short" className="text-sm font-medium text-gray-700">
              Electric Field:
            </label>
            <select
              id="electric-field-short"
              name="electric-field-short"
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

          {/* Time Range Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="time-range-short" className="text-sm font-medium text-gray-700">
              Time Range:
            </label>
            <select
              id="time-range-short"
              name="time-range-short"
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
            <XAxis dataKey="date" /> {/* Changed dataKey to 'date' */}
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

export default ShortTermForecastPage;