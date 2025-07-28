import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Recharts imports, added BarChart and Bar


interface WeatherPageProps {
  title: string;
  yAxisLabel: string;
  dataKey: string;
  generateData: (station: string, turbine: string, start: string, end: string) => any[];
}

const WeatherSubmenuPage: React.FC<WeatherPageProps> = ({ title, yAxisLabel, dataKey, generateData }) => {
  const [station, setStation] = useState('station-1');
  const [windTurbineNumber, setWindTurbineNumber] = useState('turbine-a');
  const [startTime, setStartTime] = useState('2025-07-20T00:00');
  const [endTime, setEndTime] = useState('2025-07-21T00:00');

  const stations = [
    { id: 'station-1', name: 'Weather Station 1' },
    { id: 'station-2', name: 'Weather Station 2' },
    { id: 'station-3', name: 'Weather Station 3' },
  ];

  const windTurbineNumbers = [
    { id: 'turbine-a', name: 'Turbine A' },
    { id: 'turbine-b', name: 'Turbine B' },
    { id: 'turbine-c', name: 'Turbine C' },
  ];

  const [chartData, setChartData] = useState(() => generateData(station, windTurbineNumber, startTime, endTime));

  const handleConfirm = () => {
    console.log('Filters confirmed:', { station, windTurbineNumber, startTime, endTime });
    setChartData(generateData(station, windTurbineNumber, startTime, endTime));
  };

  const handleExport = () => {
    console.log('Exporting data for:', { station, windTurbineNumber, startTime, endTime });
    alert('Export functionality not implemented in this demo.');
  };

  return (
    <div className="p-8 flex flex-col h-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{title}</h1>
      <p className="text-gray-700 mb-6">View historical data for {title.toLowerCase()}.</p>

      {/* Filter Conditions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
          {/* Station Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="station" className="text-sm font-medium text-gray-700">
              Station:
            </label>
            <select
              id="station"
              name="station"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={station}
              onChange={(e) => setStation(e.target.value)}
            >
              {stations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Wind Turbine Number Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="turbine-number" className="text-sm font-medium text-gray-700">
              Turbine No.:
            </label>
            <select
              id="turbine-number"
              name="turbine-number"
              className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={windTurbineNumber}
              onChange={(e) => setWindTurbineNumber(e.target.value)}
            >
              {windTurbineNumbers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="flex items-center gap-2">
            <label htmlFor="weather-start-time" className="text-sm font-medium text-gray-700">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="weather-start-time"
              name="weather-start-time"
              className="flex-1 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          {/* End Time */}
          <div className="flex items-center gap-2">
            <label htmlFor="weather-end-time" className="text-sm font-medium text-gray-700">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="weather-end-time"
              name="weather-end-time"
              className="flex-1 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
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
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} name={title} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


// Specific Weather Data Generators
const generateWindSpeedData = (station: string, turbine: string, start: string, end: string) => {
  const data = [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const interval = 15 * 60 * 1000; // 15 minutes

  for (let t = startTime; t <= endTime; t += interval) {
    const time = new Date(t);
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Simulate wind speed (m/s)
    let windSpeed = 5 + Math.sin(t / (3 * 3600000)) * 4 + Math.random() * 2;
    if (station === 'station-2') windSpeed += 1; // Slightly higher for station 2
    if (turbine === 'turbine-b') windSpeed += 0.5; // Slightly higher for turbine B
    windSpeed = Math.max(0, windSpeed); // Ensure non-negative

    data.push({ time: `${formattedDate} ${formattedTime}`, windSpeed: parseFloat(windSpeed.toFixed(2)) });
  }
  return data;
};

const generateWindDirectionData = (station: string, turbine: string, start: string, end: string) => {
  const data = [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const interval = 15 * 60 * 1000; // 15 minutes

  for (let t = startTime; t <= endTime; t += interval) {
    const time = new Date(t);
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Simulate wind direction (degrees, 0-360)
    let windDirection = 180 + Math.sin(t / (4 * 3600000)) * 90 + Math.random() * 30;
    windDirection = (windDirection + 360) % 360; // Keep within 0-360
    if (station === 'station-3') windDirection = (windDirection + 45) % 360; // Shift for station 3

    data.push({ time: `${formattedDate} ${formattedTime}`, windDirection: parseFloat(windDirection.toFixed(1)) });
  }
  return data;
};

const generateTemperatureData = (station: string, turbine: string, start: string, end: string) => {
  const data = [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const interval = 15 * 60 * 1000; // 15 minutes

  for (let t = startTime; t <= endTime; t += interval) {
    const time = new Date(t);
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Simulate temperature (°C)
    let temperature = 20 + Math.sin(t / (6 * 3600000)) * 5 + Math.random() * 2;
    if (station === 'station-1') temperature += 2; // Slightly warmer for station 1
    temperature = parseFloat(temperature.toFixed(1));

    data.push({ time: `${formattedDate} ${formattedTime}`, temperature: temperature });
  }
  return data;
};

const generateHumidityData = (station: string, turbine: string, start: string, end: string) => {
  const data = [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const interval = 15 * 60 * 1000; // 15 minutes

  for (let t = startTime; t <= endTime; t += interval) {
    const time = new Date(t);
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Simulate humidity (%)
    let humidity = 70 + Math.cos(t / (5 * 3600000)) * 15 + Math.random() * 5;
    humidity = Math.min(100, Math.max(0, humidity)); // Keep within 0-100%
    humidity = parseFloat(humidity.toFixed(1));

    data.push({ time: `${formattedDate} ${formattedTime}`, humidity: humidity });
  }
  return data;
};

const generateAirPressureData = (station: string, turbine: string, start: string, end: string) => {
  const data = [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const interval = 15 * 60 * 1000; // 15 minutes

  for (let t = startTime; t <= endTime; t += interval) {
    const time = new Date(t);
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Simulate air pressure (hPa)
    let airPressure = 1010 + Math.sin(t / (7 * 3600000)) * 10 + Math.random() * 3;
    airPressure = parseFloat(airPressure.toFixed(1));

    data.push({ time: `${formattedDate} ${formattedTime}`, airPressure: airPressure });
  }
  return data;
  }; // This brace was missing, causing the "constant must be initialized" error


// Define Weather Submenu Page components before App and Layout
export const WindSpeedPage = () => (
  <WeatherSubmenuPage
    title="Wind Speed"
    yAxisLabel="Wind Speed (m/s)"
    dataKey="windSpeed"
    generateData={generateWindSpeedData}
  />
);

export const WindDirectionPage = () => (
  <WeatherSubmenuPage
    title="Wind Direction"
    yAxisLabel="Wind Direction (°)"
    dataKey="windDirection"
    generateData={generateWindDirectionData}
  />
);

export const TemperaturePage = () => (
  <WeatherSubmenuPage
    title="Temperature"
    yAxisLabel="Temperature (°C)"
    dataKey="temperature"
    generateData={generateTemperatureData}
  />
);

export const HumidityPage = () => (
  <WeatherSubmenuPage
    title="Humidity"
    yAxisLabel="Humidity (%)"
    dataKey="humidity"
    generateData={generateHumidityData}
  />
);

export const AirPressurePage = () => (
  <WeatherSubmenuPage
    title="Air Pressure"
    yAxisLabel="Air Pressure (hPa)"
    dataKey="airPressure"
    generateData={generateAirPressureData}
  />
);