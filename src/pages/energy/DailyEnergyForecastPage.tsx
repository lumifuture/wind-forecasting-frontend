const DailyEnergyForecastPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-blue-800 mb-4">Daily Energy Generated Forecast</h1>
    <p className="text-gray-700">
      This module predicts **daily energy generation** by analyzing historical data, weather conditions, and market trends. This is crucial for operators to adjust O&M strategies and optimize efficiency.
    </p>
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming 7-Day Forecast</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Generation (MWh)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Weather Factors</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-08-01</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,500</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High wind speeds</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-08-02</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,450</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate wind, some clouds</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-08-03</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,100</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lighter winds, clear skies</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-08-04</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,600</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">96%</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Strong gusts, storm front</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default DailyEnergyForecastPage;