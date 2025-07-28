const ReportsAnalyticsPage = () => <div className="p-8">
  <h1 className="text-3xl font-bold text-blue-800 mb-4">Reports & Analytics</h1>
  <p className="text-gray-700">Generate and view comprehensive reports on wind power performance and forecasting accuracy.</p>
  <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Available Reports</h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>Daily Performance Summary</li>
      <li>Monthly Forecast Accuracy</li>
      <li>Turbine Uptime Report</li>
      <li>Environmental Impact Analysis</li>
    </ul>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
      Generate New Report
    </button>
  </div>
</div>;

export default ReportsAnalyticsPage;