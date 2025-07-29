import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Recharts imports, added BarChart and Bar


const generateTodayForecastData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) { // Hourly forecast for today
    const time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), i, 0);
    const formattedTime = `${String(time.getHours()).padStart(2, '0')}:00`;
    const power = 400 + Math.sin(i * 0.5) * 150 + Math.random() * 50; // Simulate power fluctuations
    data.push({ time: formattedTime, power: Math.round(power) });
  }
  return data;
};

const generateMeteorologicalData = (windTower: string, turbineNumber: string) => {
  // Mock data for a single point in time, based on selected filters
  const windSpeed = 7 + Math.random() * 3; // m/s
  const windDirection = Math.floor(Math.random() * 360); // degrees
  const temperature = 18 + Math.random() * 5; // °C
  const humidity = 60 + Math.random() * 20; // %
  const airPressure = 1000 + Math.random() * 15; // hPa

  return {
    windSpeed: windSpeed.toFixed(1),
    windDirection: windDirection.toFixed(0),
    temperature: temperature.toFixed(1),
    humidity: humidity.toFixed(1),
    airPressure: airPressure.toFixed(1),
  };
};

const generateAccuracyReportingRateData = () => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) { // Last 7 days
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    data.push({
      date: formattedDate,
      ultraShortTermAccuracy: Math.round(75 + Math.random() * 15), // 75-90%
      shortTermAccuracy: Math.round(70 + Math.random() * 10), // 70-80%
      ultraShortTermReportingRate: Math.round(95 + Math.random() * 5), // 95-100%
      shortTermReportingRate: Math.round(90 + Math.random() * 8), // 90-98%
    });
  }
  return data;
};

const DashboardPage = () => {
  const [selectedStation, setSelectedStation] = useState('station-1');
  const [selectedWindTower, setSelectedWindTower] = useState('tower-1');
  const [selectedTurbineNumber, setSelectedTurbineNumber] = useState('turbine-a');

  const mockStations = [
    { id: 'station-1', name: 'Main Wind Farm' },
    { id: 'station-2', name: 'North Sector' },
    { id: 'station-3', name: 'South Sector' },
  ];

  const mockWindTowers = [
    { id: 'tower-1', name: 'Tower 1' },
    { id: 'tower-2', name: 'Tower 2' },
    { id: 'tower-3', name: 'Tower 3' },
  ];

  const mockTurbineNumbers = [
    { id: 'turbine-a', name: 'Turbine A' },
    { id: 'turbine-b', name: 'Turbine B' },
    { id: 'turbine-c', name: 'Turbine C' },
  ];

  const todayForecastData = generateTodayForecastData();
  const meteorologicalData = generateMeteorologicalData(selectedWindTower, selectedTurbineNumber);
  const accuracyReportingRateData = generateAccuracyReportingRateData();

  // Mock real-time power and today's power generation based on station
  const getStationData = (stationId: string) => {
    switch (stationId) {
      case 'station-1': return { realTimePower: '1250 MW', todayGeneration: '28,500 MWh' };
      case 'station-2': return { realTimePower: '890 MW', todayGeneration: '21,000 MWh' };
      case 'station-3': return { realTimePower: '620 MW', todayGeneration: '15,200 MWh' };
      default: return { realTimePower: 'N/A', todayGeneration: 'N/A' };
    }
  };
  const currentStationData = getStationData(selectedStation);

  return (
    <div className="p-8 flex flex-col h-full bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6 flex-1">
        {/* Upper Left: Station Data */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Station Overview</h2>
          <div className="mb-4">
            <label htmlFor="station-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Station:
            </label>
            <select
              id="station-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {mockStations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            <div className="text-center">
              <p className="text-gray-600 text-lg">Real-time Power:</p>
              <p className="text-5xl font-bold text-blue-600">{currentStationData.realTimePower}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-lg">Today's Generation:</p>
              <p className="text-5xl font-bold text-green-600">{currentStationData.todayGeneration}</p>
            </div>
          </div>
        </div>

        {/* Upper Right: Today's Forecast Curve Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:col-span-3 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Forecast</h2>
          <div className="flex-1 min-h-[200px]"> {/* Added min-h to ensure chart has space */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={todayForecastData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="power" stroke="#8884d8" name="Forecast Power" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lower Left: Today's Meteorological Data */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Meteorological Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="wind-tower-select" className="block text-sm font-medium text-gray-700 mb-2">
                Wind Tower:
              </label>
              <select
                id="wind-tower-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedWindTower}
                onChange={(e) => setSelectedWindTower(e.target.value)}
              >
                {mockWindTowers.map((tower) => (
                  <option key={tower.id} value={tower.id}>
                    {tower.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="turbine-number-select" className="block text-sm font-medium text-gray-700 mb-2">
                Wind Turbine No.:
              </label>
              <select
                id="turbine-number-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedTurbineNumber}
                onChange={(e) => setSelectedTurbineNumber(e.target.value)}
              >
                {mockTurbineNumbers.map((turbine) => (
                  <option key={turbine.id} value={turbine.id}>
                    {turbine.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-2xl font-bold text-blue-700">{meteorologicalData.windSpeed} m/s</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Wind Direction</p>
              <p className="text-2xl font-bold text-blue-700">{meteorologicalData.windDirection}°</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-blue-700">{meteorologicalData.temperature}°C</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-bold text-blue-700">{meteorologicalData.humidity}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md col-span-2">
              <p className="text-sm text-gray-600">Air Pressure</p>
              <p className="text-2xl font-bold text-blue-700">{meteorologicalData.airPressure} hPa</p>
            </div>
          </div>
        </div>

        {/* Lower Right: Accuracy and Reporting Rate Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:col-span-3 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Accuracy & Reporting Rate</h2>
          <div className="flex-1 min-h-[200px]"> {/* Added min-h to ensure chart has space */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={accuracyReportingRateData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Bar dataKey="ultraShortTermAccuracy" fill="#8884d8" name="Ultra-short-term Accuracy" />
                <Bar dataKey="shortTermAccuracy" fill="#82ca9d" name="Short-term Accuracy" />
                <Bar dataKey="ultraShortTermReportingRate" fill="#ffc658" name="Ultra-short-term Reporting Rate" />
                <Bar dataKey="shortTermReportingRate" fill="#ff7300" name="Short-term Reporting Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;