// src/pages/ModelManagement/ModelDetailsPage.tsx
const ModelDetailsPage = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const models = useModelStore((state) => state.models);
  const runTraining = useModelStore((state) => state.runTraining);
  const deployModelVersion = useModelStore((state) => state.deployModelVersion);
  const rollbackModel = useModelStore((state) => state.rollbackModel);

  const selectedModel = models.find((m) => m.id === modelId);
  const [messageBox, setMessageBox] = useState<{ title: string; message: string } | null>(null);

  const showMessage = (title: string, message: string) => {
    setMessageBox({ title, message });
  };

  const closeMessageBox = () => {
    setMessageBox(null);
  };

  if (!selectedModel) {
    return (
      <div className="p-8 text-center text-red-600 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Model Not Found</h1>
        <p>The model you are looking for does not exist.</p>
      </div>
    );
  }

  const handleRunTraining = () => {
    runTraining(selectedModel.id);
    showMessage('Success', 'Model training initiated and new version created.');
  };

  const handleSwitchVersion = (versionId: string) => {
    deployModelVersion(selectedModel.id, versionId);
    showMessage('Success', `Switched to version ${versionId} for model ${selectedModel.name}.`);
  };

  const handleRollback = (targetVersionId: string) => {
    rollbackModel(selectedModel.id, targetVersionId);
    showMessage('Success', `Model ${selectedModel.name} rolled back to version ${targetVersionId}.`);
  };

  return (
    <div className="p-8 flex flex-col bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Model Details: <span className="text-gray-700">{selectedModel.name}</span></h1>
      <p className="text-gray-700 mb-6">
        View detailed information, manage versions, and initiate training for this model.
      </p>

      {messageBox && (
        <MessageBox
          title={messageBox.title}
          message={messageBox.message}
          onClose={closeMessageBox}
        />
      )}

      {/* Automatic Recording of Training Parameters, Feature Versions, and Training Logs */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Training Details
        </h2>
        <div className="mb-4">
          <button
            onClick={handleRunTraining}
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition-colors"
          >
            Run New Training
          </button>
        </div>
        {selectedModel.versions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Latest Training Parameters</h3>
              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-800">
                {Object.entries(selectedModel.versions[0].trainingParams).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {String(value)}</p>
                ))}
                <p><strong>Feature Version:</strong> {selectedModel.versions[0].featureVersion}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Training Logs (Latest Version)</h3>
              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-800 h-32 overflow-y-auto">
                {selectedModel.versions[0].trainingLogs.map((log, index) => (
                  <p key={index} className="mb-1">{log}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Model Version Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Model Version Management
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RMSE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedModel.versions.map((version) => (
                <tr key={version.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{version.version}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{version.accuracy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{version.rmse}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{version.mae}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{version.trainingDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      version.deployed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    )}>
                      {version.deployed ? 'Deployed' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleSwitchVersion(version.id)}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={version.deployed}
                    >
                      Switch to This Version
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Rollback Mechanism */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Model Rollback
        </h2>
        <p className="text-gray-700 mb-4">Quickly restore to a previously stable version to minimize business impact.</p>
        <div className="flex gap-4 items-center">
          <label htmlFor="rollback-version" className="text-sm font-medium text-gray-700">
            Rollback to Version:
          </label>
          <select
            id="rollback-version"
            className="flex-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            onChange={(e) => handleRollback(e.target.value)}
            value={selectedModel.activeVersionId} // Default to active version
          >
            {selectedModel.versions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.version} ({version.trainingDate})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsPage;