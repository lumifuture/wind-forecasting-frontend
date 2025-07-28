// src/pages/WeatherInfo.tsx
export default function WeatherInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Weather Information</h1>
      <p className="text-gray-600">
        Access current and historical weather data relevant to the wind farm location. This might include wind speed, temperature, pressure, etc.
      </p>
      {/* Weather maps, current conditions, and forecasts */}
    </div>
  );
}