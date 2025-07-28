const ModelManagementPage = () => <div className="p-8">
  <h1 className="text-3xl font-bold text-blue-800 mb-4">Model Management</h1>
  <p className="text-gray-700">Manage and configure your wind power forecasting models.</p>
  <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Models</h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>**Model A:** LSTM-based, Version 3.1 (Last trained: 2025-07-20)</li>
      <li>**Model B:** Ensemble Forecast, Version 1.2 (Last trained: 2025-07-22)</li>
      <li>**Model C:** Physics-informed NN, Version 2.0 (Last trained: 2025-07-18)</li>
    </ul>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
      Train New Model
    </button>
  </div>
</div>;

export default ModelManagementPage;