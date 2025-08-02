const LongTermEnergyForecastPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-blue-800 mb-4">Long-Term Energy Generated Forecast</h1>
    <p className="text-gray-700">
      This module provides long-term energy generation predictions, including monthly, quarterly, and annual forecasts, to assist energy planners and dispatchers with strategic decisions.
    </p>
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Projections</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Generation (MWh)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year-on-Year Growth</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">August 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+10%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">September 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72,500</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+8%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">October 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">80,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+11%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">November 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+14%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">December 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+16%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quarterly and Annual Projections</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Generation (MWh)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year-on-Year Growth</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q3 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">225,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+12%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q4 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">250,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+15%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual 2025</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">900,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+13%</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual 2026 (Projection)</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">980,000</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+9%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default LongTermEnergyForecastPage;