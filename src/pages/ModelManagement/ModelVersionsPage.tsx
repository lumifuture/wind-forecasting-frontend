const ModelVersionsPage = () => {
  // Generate mock data for model versions
  const mockVersions = [
    {
      id: 'v1.0.0',
      deploymentDate: '2024-07-01',
      accuracy: 0.95,
      mape: 0.05,
      rmse: 0.12,
      status: 'Deployed',
    },
    {
      id: 'v0.9.8',
      deploymentDate: '2024-06-15',
      accuracy: 0.93,
      mape: 0.07,
      rmse: 0.15,
      status: 'Archived',
    },
    {
      id: 'v1.0.1',
      deploymentDate: '2024-07-20',
      accuracy: 0.96,
      mape: 0.04,
      rmse: 0.10,
      status: 'Staging',
    },
    {
      id: 'v0.9.7',
      deploymentDate: '2024-06-01',
      accuracy: 0.92,
      mape: 0.08,
      rmse: 0.18,
      status: 'Archived',
    },
  ];

  // Function to simulate switching to a historical version
  const switchVersion = (versionId) => {
    console.log(`Switching to version: ${versionId}`);
    // In a real app, this would trigger an API call to activate the old version
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Model Versions</h2>
      <p className="text-gray-600 mb-8">
        Manage and compare different model versions, review their accuracy metrics, and easily switch to a stable historical version.
      </p>

      {/* Table to display model versions */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deployment Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accuracy (MAPE)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Accuracy (RMSE)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockVersions.map((version) => (
              <tr key={version.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {version.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {version.deploymentDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {(version.mape * 100).toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {version.rmse.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${version.status === 'Deployed' ? 'bg-green-100 text-green-800' :
                      version.status === 'Staging' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {version.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {version.status !== 'Deployed' && (
                    <button
                      onClick={() => switchVersion(version.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Switch to This Version
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelVersionsPage;