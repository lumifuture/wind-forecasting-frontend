const TrainingHistoryPage = () => {
  // Generate mock data for training history
  const mockTrainingData = [
    {
      id: 'TRN001',
      modelName: 'SalesForecaster v1.2',
      date: '2024-07-28 10:30 AM',
      status: 'Completed',
      parameters: { learningRate: 0.01, epochs: 100, batchSize: 32 },
      featureVersion: 'FE_v2.1',
      logs: 'Training completed successfully. Loss: 0.05, Accuracy: 0.92',
    },
    {
      id: 'TRN002',
      modelName: 'ChurnPredictor v3.0',
      date: '2024-07-27 03:15 PM',
      status: 'Failed',
      parameters: { regularization: 0.001, hiddenLayers: 3 },
      featureVersion: 'FE_v1.5',
      logs: 'Error: Data preprocessing failed. Missing values detected.',
    },
    {
      id: 'TRN003',
      modelName: 'ImageClassifier v4.1',
      date: '2024-07-26 09:00 AM',
      status: 'Completed',
      parameters: { optimizer: 'Adam', dropoutRate: 0.2 },
      featureVersion: 'FE_v3.0',
      logs: 'Training finished. Validation accuracy: 0.88',
    },
    {
      id: 'TRN004',
      modelName: 'FraudDetector v2.5',
      date: '2024-07-25 01:45 PM',
      status: 'Running',
      parameters: { treeDepth: 10, minSamplesLeaf: 5 },
      featureVersion: 'FE_v2.0',
      logs: 'Epoch 50/100 completed. Current loss: 0.12',
    },
  ];

  // Function to view training parameters
  const viewParameters = (params) => {
    console.log('Training Parameters:', params);
    // In a real app, this would open a modal or navigate to a detail page
  };

  // Function to view training logs
  const viewLogs = (logs) => {
    console.log('Training Logs:', logs);
    // In a real app, this would open a modal or navigate to a detail page
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Training History</h2>
      <p className="text-gray-600 mb-8">
        This page provides a detailed log of all past model training sessions, including parameters, feature versions, and detailed logs.
      </p>

      {/* Table to display training history */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Training ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
            {mockTrainingData.map((training) => (
              <tr key={training.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {training.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {training.modelName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {training.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${training.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      training.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {training.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => viewParameters(training.parameters)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View Parameters
                  </button>
                  <button
                    onClick={() => viewLogs(training.logs)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Logs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingHistoryPage;